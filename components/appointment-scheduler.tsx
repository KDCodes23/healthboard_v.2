"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Doctor {
  id: string
  name: string
  specialty: string
  location: string
}

type Appointment = {
  id: string
  date: string
  status: string
  timeSlotId: string
  doctorId: string
  patientId: string
  specialty?: string
  type?: string
}

interface AppointmentSchedulerProps {
  onAppointmentScheduled: (appointment: Appointment) => void
  editingAppointment?: Appointment | null
}

const appointmentTypes = [
  "Annual Check-up",
  "Follow-up Consultation",
  "New Patient Visit",
  "Specialist Consultation",
  "Urgent Care",
]

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour <= 18; hour++) {
    const formattedHour = hour > 12 ? hour - 12 : hour
    const amPm = hour >= 12 ? "PM" : "AM"
    slots.push(`${formattedHour}:00 ${amPm}`)
  }
  return slots
}

const timeSlots = generateTimeSlots()

export function AppointmentScheduler({ onAppointmentScheduled }: AppointmentSchedulerProps) {
  const [doctorId, setDoctorId] = useState("")
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("Annual Check-up")
  const [availableSlots, setAvailableSlots] = useState<Record<string, { isAvailable: boolean, timeSlotId: string }>>({});
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeSlotId, setTimeSlotId] = useState<string | null>(null)
  const [patientId, setPatientId] = useState<string | null>(null)
  const [doctors, setDoctors] = useState<{ id: string; firstName: string; lastName: string; specialization: string; hospitalName: string }[]>([])


  // Fetch list of doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor`) // <- make sure this matches your actual route
        if (!res.ok) 
          throw new Error("Failed to fetch doctors")

        const data = await res.json()
        setDoctors(data)
      } catch (err) {
        console.error("Failed to load doctors:", err)
      }
    }
  
    fetchDoctors()
  }, [])

useEffect(() => {
  const storedPatientId = localStorage.getItem("userId");
  if (storedPatientId) {
    setPatientId(storedPatientId);
  }
}, []);

  // Fetch available slots when doctor and date are selected
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctorId || !date) {
        console.log("Missing doctorId or date. Skipping fetch.");
        setAvailableSlots({});
        return;
      }
    
      console.log("Fetching availability for:", {
        doctorId,
        formattedDate: format(date, "yyyy-MM-dd"),
      });
    
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/timeslot/schedule/doctor/${doctorId}?date=${format(date, "yyyy-MM-dd")}`
        );
    
        console.log("Raw fetch response:", res);
    
        if (!res.ok) {
          throw new Error("Failed to fetch availability");
        }
    
        const data = await res.json();
        console.log("Fetched data:", data);
    
        const availabilityMap: Record<string, { isAvailable: boolean, timeSlotId: string }> = {};
    
        data.forEach((slot: { start: string, timeSlotId: string, isAvailable: boolean }) => {
          console.log("Processing slot:", slot);
          if (slot.isAvailable) {
            const formattedTime = slot.start.slice(0, 5); // "HH:mm"
            availabilityMap[formattedTime] = {
              isAvailable: true,
              timeSlotId: slot.timeSlotId,
            };
          }
        });
    
        console.log("Final availabilityMap:", availabilityMap);
    
        setAvailableSlots(availabilityMap);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setAvailableSlots({});
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAvailability()
  }, [doctorId, date])


  const formatTimeString = (time: string) => {
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
  
    // Convert to 24-hour format
    if (period === 'PM' && parseInt(hours) !== 12) {
      hours = (parseInt(hours) + 12).toString();
    } else if (period === 'AM' && parseInt(hours) === 12) {
      hours = '00';
    }

    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };


  const handleTimeSelect = (time: string) => {
    const selectedSlot = availableSlots[time];
    if (selectedSlot && selectedSlot.isAvailable) {
      setSelectedTime(time);
      setTimeSlotId(selectedSlot.timeSlotId); // Now timeSlotId will be available
    }
  };

  const handleScheduleAppointment = async () => {
    // Ensure we have all required data
    if (!doctorId || !date || !selectedTime || !timeSlotId || !patientId) 
      return  console.error("Missing required data for scheduling appointment")
  
    setIsSubmitting(true)
  
    try {
      const selectedDoctor = doctors.find((d) => d.id === doctorId)
      if (!selectedDoctor) throw new Error("Doctor not found")
  
      const newAppointment = {
        doctorId: doctorId,
        patientId: patientId,  // Use the state value here
        timeSlotId: timeSlotId,
        date: format(date, "yyyy-MM-dd"),
        status: "Booked",
      }
  
      // Make the API call to backend here to create the appointment
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      })
  
      if (!response.ok) {
        throw new Error("Failed to schedule appointment")
      }
  
      const scheduledAppointment = await response.json()
      onAppointmentScheduled(scheduledAppointment)
  
      // Reset form
      setDoctorId("")
      setDate(undefined)
      setSelectedTime("")
      setAppointmentType("Annual Check-up")
    } catch (error) {
      console.error("Error scheduling appointment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  

  return (
    <div className="bg-[#121225] rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Schedule Appointment</h2>
        <p className="text-gray-400 text-sm">Select a date and time for your appointment</p>
      </div>

      <div className="space-y-6">
        {/* Doctor Dropdown */}
        <div>
          <label className="block text-white mb-2">Select Doctor</label>
          <Select value={doctorId} onValueChange={setDoctorId}>
            <SelectTrigger className="bg-[#1a1a2e] border-[#2a2a3e] text-gray-300">
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-[#2a2a3e]">
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{doc.firstName + ' ' +  doc.lastName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-6">{doc.specialization}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Appointment Type */}
        {/* <div>
          <label className="block text-white mb-2">Appointment Type</label>
          <Select value={appointmentType} onValueChange={setAppointmentType}>
            <SelectTrigger className="bg-[#1a1a2e] border-[#2a2a3e] text-gray-300">
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-[#2a2a3e]">
              {appointmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        {/* Date Picker */}
        <div>
          <label className="block text-white mb-2">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-[#1a1a2e] border-[#2a2a3e] text-gray-300 hover:bg-[#252540]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1a1a2e] border-[#2a2a3e]" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="bg-[#1a1a2e]" />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-white mb-2">Select Time</label>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
            </div>
          ) : !doctorId || !date ? (
            <p className="text-gray-400 text-sm italic py-2">
              Please select a doctor and date to view available time slots
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {timeSlots.map((time) => {
                const formattedTime = formatTimeString(time); // Convert time to 'HH:mm'
                const isAvailable = availableSlots[formattedTime] || false;

                return (
                  <button
                    key={formattedTime}
                    onClick={() => handleTimeSelect(formattedTime)}
                    disabled={!isAvailable}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-md transition-colors",
                      selectedTime === formattedTime
                        ? "bg-indigo-600 text-white"
                        : isAvailable
                        ? "bg-[#252540] text-gray-200 hover:bg-[#303050]"
                        : "bg-[#1a1a2e] text-gray-500 cursor-not-allowed"
                    )}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {formattedTime}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={!doctorId || !date || !selectedTime || !timeSlotId || !patientId || isSubmitting}
          onClick={handleScheduleAppointment}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Scheduling...
            </>
          ) : (
            "Schedule Appointment"
          )}
        </Button>
      </div>
    </div>
  )
}
