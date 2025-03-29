"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Check,
  Clock,
  MoreHorizontal,
  Plus,
  Save,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  day: number;
};

export function DoctorAvailabilityCard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isRecurring, setIsRecurring] = useState(false);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Handle day selection from calendar
  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDay(selectedDate.getDay());
    }
  };

  // Add a new time slot
  const addTimeSlot = () => {
    if (!selectedDay && selectedDay !== 0) return;

    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime,
      endTime,
      day: selectedDay,
    };

    setTimeSlots([...timeSlots, newSlot]);
  };

  // Remove a time slot
  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  // Save availability
  const saveAvailability = () => {
    // Here you would typically save to your backend
    console.log("Saving availability:", timeSlots);
    // Show success message or notification
  };

  // Group time slots by day for display
  const timeSlotsByDay = timeSlots.reduce<Record<number, TimeSlot[]>>(
    (acc, slot) => {
      if (!acc[slot.day]) {
        acc[slot.day] = [];
      }
      acc[slot.day].push(slot);
      return acc;
    },
    {}
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set Your Availability</CardTitle>
        <CardDescription>
          Define when you're available to see patients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              className="rounded-md border"
            />
            <div className="mt-4 flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
              <Label htmlFor="recurring">
                Set as recurring weekly schedule
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">
                {selectedDay !== null
                  ? daysOfWeek[selectedDay]
                  : "Select a day"}
              </h3>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger id="start-time">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 11 }, (_, i) => {
                          const hour = i + 8;
                          const timeValue = `${hour
                            .toString()
                            .padStart(2, "0")}:00`;
                          return (
                            <SelectItem key={timeValue} value={timeValue}>
                              {timeValue}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger id="end-time">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 11 }, (_, i) => {
                          const hour = i + 8;
                          const timeValue = `${hour
                            .toString()
                            .padStart(2, "0")}:00`;
                          return (
                            <SelectItem key={timeValue} value={timeValue}>
                              {timeValue}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={addTimeSlot}
                  disabled={selectedDay === null}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Time Slot
                </Button>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Your Availability</h3>
              <div className="space-y-2">
                {Object.entries(timeSlotsByDay).map(([day, slots]) => (
                  <div key={day} className="space-y-1">
                    <h4 className="text-sm font-medium">
                      {daysOfWeek[Number.parseInt(day)]}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => (
                        <Badge
                          key={slot.id}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          {slot.startTime} - {slot.endTime}
                          <button
                            onClick={() => removeTimeSlot(slot.id)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                          >
                            <span className="sr-only">Remove</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}

                {Object.keys(timeSlotsByDay).length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No availability set yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveAvailability} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Availability
        </Button>
      </CardFooter>
    </Card>
  );
}
