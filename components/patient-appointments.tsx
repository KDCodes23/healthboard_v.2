"use client"

import { CalendarIcon, Clock, MapPin, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AppointmentScheduler } from "@/components/appointment-scheduler"

export function PatientAppointments() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 lg:col-span-2 dashboard-card floating-slow">
        <CardHeader>
          <CardTitle className="text-subtitle">Upcoming Appointments</CardTitle>
          <CardDescription>View and manage your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                doctor: "Dr. Sarah Johnson",
                specialty: "Primary Care Physician",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "June 15, 2024",
                time: "10:30 AM",
                location: "Main Street Medical Center",
                type: "Annual Check-up",
              },
              {
                doctor: "Dr. Michael Chen",
                specialty: "Cardiologist",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "July 3, 2024",
                time: "2:15 PM",
                location: "Heart Health Clinic",
                type: "Follow-up Consultation",
              },
            ].map((appointment, index) => (
              <div
                key={index}
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
                    <p className="text-small text-muted-foreground">{appointment.specialty}</p>
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
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                      <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card floating">
        <CardHeader>
          <CardTitle className="text-subtitle">Schedule Appointment</CardTitle>
          <CardDescription>Select a date and time for your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentScheduler />
        </CardContent>
      </Card>
    </div>
  )
}

