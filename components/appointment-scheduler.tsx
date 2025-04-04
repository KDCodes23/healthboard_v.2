"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Appointment {
  id: string
  doctor: string
  specialty: string
  type: string
  date: string
  time: string
  location: string
  avatar: string
}

interface AppointmentSchedulerProps {
  onAppointmentScheduled: (appointment: Appointment) => void
  editingAppointment?: Appointment | null
}

const doctors = [
  { id: "dr-will-smith", name: "Dr. Will Smith", specialty: "Dermatologist", location: "Main Street Medical Center" },
  { id: "dr-michael-white", name: "Dr. Michael White", specialty: "Cardiologist", location: "Heart Health Clinic" },
  { id: "dr-emily-rodriguez", name: "Dr. Emily Rodriguez", specialty: "Dermatologist", location: "Skin Care Center" },
  { id: "dr-james-wilson", name: "Dr. James Wilson", specialty: "Neurologist", location: "Brain & Spine Institute" },
]

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
  const [availableSlots, setAvailableSlots] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctorId || !date) {
        setAvailableSlots({})
        return
      }

      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockAvailability: Record<string, boolean> = {}
        timeSlots.forEach((slot) => {
          mockAvailability[slot] = Math.random() > 0.3
        })

        setAvailableSlots(mockAvailability)
      } catch (error) {
        console.error("Error fetching availability:", error)
        const errorState: Record<string, boolean> = {}
        timeSlots.forEach((slot) => {
          errorState[slot] = false
        })
        setAvailableSlots(errorState)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [doctorId, date])

  const handleTimeSelect = (time: string) => {
    if (availableSlots[time]) {
      setSelectedTime(time)
    }
  }

  const handleScheduleAppointment = async () => {
    if (!doctorId || !date || !selectedTime) return

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const selectedDoctor = doctors.find((d) => d.id === doctorId)
      if (!selectedDoctor) throw new Error("Doctor not found")

      const newAppointment: Appointment = {
        id: `appt-${Date.now()}`,
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        type: appointmentType,
        date: format(date, "MMMM d, yyyy"),
        time: selectedTime,
        location: selectedDoctor.location,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      onAppointmentScheduled(newAppointment)

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
        {/* Doctor Select */}
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
                      <span>{doc.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-6">{doc.specialty}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Appointment Type */}
        <div>
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
        </div>

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
                const isAvailable = availableSlots[time] || false
                return (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    disabled={!isAvailable}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-md transition-colors",
                      selectedTime === time
                        ? "bg-indigo-600 text-white"
                        : isAvailable
                        ? "bg-[#252540] text-gray-200 hover:bg-[#303050]"
                        : "bg-[#1a1a2e] text-gray-500 cursor-not-allowed"
                    )}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {time}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={!doctorId || !date || !selectedTime || isSubmitting}
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
