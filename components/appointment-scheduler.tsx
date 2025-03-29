"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

const doctors = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    specialty: "Primary Care Physician",
    location: "Main Street Medical Center",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    location: "Heart Health Clinic",
  },
  {
    id: "dr-emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    location: "Skin Care Center",
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    location: "Brain & Spine Institute",
  },
]

export function AppointmentScheduler() {
  const [doctor, setDoctor] = useState<String>()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()

  return (
    
    
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-4">
      <label className="text-small font-medium">Select Doctor</label>
        <Select onValueChange={setDoctor}>
          <SelectTrigger className="dashboard-button">
            <SelectValue placeholder="Select doctor">
              {doctor ? (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{doctors.find((d) => d.id === doctor)?.name}</span>
                </div>
              ) : (
                "Select doctor"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
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

      <div className="flex flex-col gap-2">
        <label className="text-small font-medium">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal dashboard-button",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-small font-medium">Select Time</label>
        <Select onValueChange={setTime}>
          <SelectTrigger className="dashboard-button">
            <SelectValue placeholder="Select time">
              {time ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{time}</span>
                </div>
              ) : (
                "Select time"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{slot}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button className="mt-4 dashboard-button" disabled={!date || !time}>
        Schedule Appointment
      </Button>
    </div>
  )
}

