"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, Clock, MapPin, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppointmentScheduler } from "@/components/appointment-scheduler"
//import { useToast } from "@/components/ui/use-toast"
import toast, { Toaster } from 'react-hot-toast';

export type Appointment = {
  id: string
  date: string
  status: string
  timeSlotId: string
  doctorId: string
  patientId: string
  specialty?: string
  type?: string
  startTime?: string
  location?: string
  avatar?: string
  doctor?: string
  timeSlot?: { start: string, end: string, isAvailable: boolean, doctorId: string }
}

export function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  //const { toast } = useToast()

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) return
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointment/patient-appointments?id=${userId}`)
        if (!res.ok) 
          throw new Error("Failed to fetch appointments")

        const data = await res.json()

        console.log("Fetched appointments:", data)

        const transformed = data.map((appointment: any) => ({
          ...appointment,
          doctor: appointment.doctor ? `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}` : '',
          avatar: appointment.doctor?.avatar || '/placeholder.svg?height=40&width=40', 
          timeSlot: appointment.timeSlot,
          time: appointment.timeSlot.time || appointment.startTime || '00:00',
        }))
        
        console.log("Transformed appointments data:", transformed)

        setAppointments(transformed)
        //setAppointments(data)
      } catch (error) {
        console.error("Failed to fetch appointments", error)
      }
    }

    fetchAppointments()
  }, [userId])

  const addAppointment = (newAppointment: Appointment) => {
    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editingAppointment.id ? newAppointment : a))
      )
      toast.success(`Your appointment with ${newAppointment.doctor} has been updated.!`);
      setEditingAppointment(null)
    } else {
      setAppointments((prev) => [newAppointment, ...prev])
      toast.success(`Your appointment with ${newAppointment.doctor} on ${newAppointment.date} at ${newAppointment.startTime} has been scheduled!`);
    }
  }

  const handleCancel = async (id: string) => {
    try {
      const appointmentToCancel = appointments.find((appt) => appt.id === id);
      if (!appointmentToCancel) {
        throw new Error("Appointment not found");
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointment/delete-appointment?id=${id}`, {
        method: "DELETE",
      })
  
      if (!res.ok) {
        throw new Error("Failed to cancel appointment")
      }
  
      // If the request was successful, update the state to remove the appointment from the UI
      setAppointments((prev) => prev.filter((appt) => appt.id !== id))
  
      // Show a success toast notification
      toast.success(`Appointment on ${appointmentToCancel.date} was cancelled!`);
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error("Error canceling appointment:", error)
    }
  }
  

  const addToGoogleCalendar = (appointment: Appointment) => {
    const title = encodeURIComponent(`Appointment with ${appointment.doctor}`)
    const location = encodeURIComponent(appointment.location ?? "")
    const details = encodeURIComponent(`Specialty: ${appointment.specialty ?? ""}`)
    const date = new Date(`${appointment.date}`)
    //const startTime = appointment.timeSlot?.start || appointment.startTime || "00:00"

    const start = date.toISOString().replace(/[-:]/g, "").split(".")[0]
    const end = new Date(date.getTime() + 30 * 60000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0]

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}&details=${details}`
    window.open(url, "_blank")
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 lg:col-span-2 dashboard-card floating-slow">
        <CardHeader>
          <CardTitle className="text-subtitle">Upcoming Appointments</CardTitle>
          <CardDescription>View and manage your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          {appointments.length > 0 ? (
          appointments.map((appointment) => {
            console.log("Appointment:", appointment); // Keep this log to verify the data
            console.log("Start Time:", appointment.timeSlot?.start); // Log the timeSlot for each appointment
            return (
              <div
                key={appointment.id}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between dashboard-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={appointment.avatar} alt={appointment.doctor} />
                    <AvatarFallback>
                      {appointment.doctor
                        ? `${appointment.doctor.split(" ")[0][0]}${appointment.doctor.split(" ")[1][0]}`
                        : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-body">{appointment.doctor}</h4>
                    <p className="text-small text-muted-foreground">
                      {appointment.specialty}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{appointment.date.split("T")[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {/* Display the start time from the timeSlot */}
                        <span>{appointment.timeSlot?.start || 'Time not available'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {appointment.type}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="dashboard-button">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingAppointment(appointment)}>
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => addToGoogleCalendar(appointment)}>
                        Add to Calendar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted-foreground text-sm">No upcoming appointments</p>
        )}

          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card floating">
        <CardHeader>
          <CardTitle className="text-subtitle">Schedule Appointment</CardTitle>
          <CardDescription>
            Select a date and time for your appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentScheduler
            onAppointmentScheduled={addAppointment}
            editingAppointment={editingAppointment}
          />
        </CardContent>
      </Card>
    </div>
  )
}
