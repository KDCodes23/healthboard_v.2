"use client"

import { useState } from "react"
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
import { useToast } from "@/components/ui/use-toast"

export interface Appointment {
  id: string
  doctor: string
  specialty: string
  type: string
  date: string
  time: string
  location: string
  avatar: string
}

export function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "appt-1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Primary Care Physician",
      type: "Annual Check-up",
      date: "June 15, 2024",
      time: "10:30 AM",
      location: "Main Street Medical Center",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "appt-2",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      type: "Follow-up Consultation",
      date: "July 3, 2024",
      time: "2:15 PM",
      location: "Heart Health Clinic",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  const { toast } = useToast()

  const addAppointment = (newAppointment: Appointment) => {
    // If editing, replace it
    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editingAppointment.id ? newAppointment : a))
      )
      toast({
        title: "Appointment Rescheduled",
        description: `Your appointment with ${newAppointment.doctor} has been updated.`,
      })
      setEditingAppointment(null)
    } else {
      setAppointments((prev) => [newAppointment, ...prev])
      toast({
        title: "Appointment Scheduled",
        description: `Your appointment with ${newAppointment.doctor} on ${newAppointment.date} at ${newAppointment.time} has been scheduled.`,
      })
    }
  }

  const handleCancel = (id: string) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id))
    toast({
      title: "Appointment Canceled",
      description: "The appointment has been removed from your schedule.",
      variant: "destructive",
    })
  }

  const addToGoogleCalendar = (appointment: Appointment) => {
    const title = encodeURIComponent(`${appointment.type} with ${appointment.doctor}`)
    const location = encodeURIComponent(appointment.location)
    const details = encodeURIComponent(`Specialty: ${appointment.specialty}`)
    const date = new Date(`${appointment.date} ${appointment.time}`)

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
      {/* Upcoming Appointments */}
      <Card className="col-span-1 lg:col-span-2 dashboard-card floating-slow">
        <CardHeader>
          <CardTitle className="text-subtitle">Upcoming Appointments</CardTitle>
          <CardDescription>View and manage your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between dashboard-card"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={appointment.avatar} alt={appointment.doctor} />
                      <AvatarFallback>
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
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
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{appointment.location}</span>
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
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No upcoming appointments
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Scheduler */}
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
