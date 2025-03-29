"use client"

import { useState } from "react"
import { Clock, MoreHorizontal, Calendar as CalendarIcon, Check, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { DoctorAvailabilityCard } from "@/components/doctor-availabilityCard"


const appointments = [
  {
    id: 1,
    patient: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "9:00 AM",
    duration: "30 min",
    type: "Annual Check-up",
    status: "Completed",
    date: new Date("2025-03-29"),
  },
  {
    id: 2,
    patient: "Emily Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "Completed",
    date: new Date("2025-03-29"),
  },
  {
    id: 3,
    patient: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1:00 PM",
    duration: "30 min",
    type: "Consultation",
    status: "In Progress",
    date: new Date("2025-03-29"),
  },
  {
    id: 4,
    patient: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2:15 PM",
    duration: "45 min",
    type: "New Patient",
    status: "Upcoming",
    date: new Date("2025-03-29"),
  },
  {
    id: 5,
    patient: "David Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "3:30 PM",
    duration: "30 min",
    type: "Lab Results",
    status: "Upcoming",
    date: new Date("2025-03-29"),
  },
]


export function DoctorAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

  function setShowFullCalendar(arg0: boolean): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Main schedule card */}
      <Card className="col-span-3 md:col-span-2 dashboard-card floating-slow">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                patient: "John Smith",
                avatar: "/placeholder.svg?height=40&width=40",
                time: "9:00 AM",
                duration: "30 min",
                type: "Annual Check-up",
                status: "Completed",
              },
              {
                patient: "Emily Johnson",
                avatar: "/placeholder.svg?height=40&width=40",
                time: "10:30 AM",
                duration: "45 min",
                type: "Follow-up",
                status: "Completed",
              },
              {
                patient: "Michael Chen",
                avatar: "/placeholder.svg?height=40&width=40",
                time: "1:00 PM",
                duration: "30 min",
                type: "Consultation",
                status: "In Progress",
              },
              {
                patient: "Sarah Williams",
                avatar: "/placeholder.svg?height=40&width=40",
                time: "2:15 PM",
                duration: "45 min",
                type: "New Patient",
                status: "Upcoming",
              },
              {
                patient: "David Rodriguez",
                avatar: "/placeholder.svg?height=40&width=40",
                time: "3:30 PM",
                duration: "30 min",
                type: "Lab Results",
                status: "Upcoming",
              },
            ].map((appointment, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between dashboard-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                    <AvatarFallback>
                      {appointment.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{appointment.patient}</h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {appointment.time} • {appointment.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium",
                      appointment.status === "Completed" &&
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                      appointment.status === "In Progress" &&
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                      appointment.status === "Upcoming" &&
                        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                    )}
                  >
                    {appointment.status}
                  </div>
                  <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800/50 dark:text-gray-300">
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
                      <DropdownMenuItem>View Patient Record</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar card */}
      <Card className="col-span-3 md:col-span-1 dashboard-card floating">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>View and manage your schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal dashboard-button",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Appointment Requests</h4>
              <div className="space-y-2">
                {[
                  { name: "Robert Thompson", reason: "Back Pain", date: "Jun 18", time: "2:00 PM" },
                  { name: "Lisa Garcia", reason: "Headaches", date: "Jun 20", time: "11:30 AM" },
                ].map((request, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-2 dashboard-card">
                    <div>
                      <p className="text-sm font-medium">{request.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.reason} • {request.date} at {request.time}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full dashboard-button">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="sr-only">Accept</span>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full dashboard-button">
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="sr-only">Decline</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="mt-2 dashboard-button" onClick={() => setShowFullCalendar(true)}>View Full Calendar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Doctor availability card in the right column */}
      <div className="col-span-3 md:col-span-1">
        
        <DoctorAvailabilityCard />
        
      </div>
    </div>
  )
}
