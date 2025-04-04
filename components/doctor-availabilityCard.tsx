"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  CalendarIcon,
  Check,
  Clock,
  MoreHorizontal,
  Plus,
  Save,
  X,
} from "lucide-react";
import axios from "axios";

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
  // const addTimeSlot = () => {
  //   if (!selectedDay && selectedDay !== 0) return;

  //   const newSlot: TimeSlot = {
  //     id: Date.now().toString(),
  //     startTime,
  //     endTime,
  //     day: selectedDay,
  //   };

  //   setTimeSlots([...timeSlots, newSlot]);
  // };

  // Remove a time slot
  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  // Save availability
  const saveAvailability = async () => {
    const doctorId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!doctorId) {
      console.error("Doctor ID not found. Please log in again.");
      return;
    }

    try {
      // Make the API request to create time slots
      const createSlotsResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/TimeSlot/schedule/doctor/${doctorId}/all`,
        null, // Assuming no body is needed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Time slots created:", createSlotsResponse.data);
      toast.success("Time Slots were successfully added!");
      // Optionally handle the successful response, like updating state or notifying the user
    } catch (error) {
      toast.error("Failed to save availability. Please try again.");
      console.error("Error saving availability:", error);
    }
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

  // Adjust time before sending to backend
  const adjustTimeToLocal = (time: string) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute), 0, 0);

    date.setHours(date.getHours() - 4); // Adjust for UTC-4
    return date.toISOString().split('T')[1].substring(0, 5); // return 'HH:mm' format
  };


  const formatTime = (hour: number) => {
    const isAM = hour < 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${isAM ? 'AM' : 'PM'}`;
  };
    

  const generateTimeOptions = (startHour: number, endHour: number) => {
    const hours = Array.from({ length: endHour - startHour }, (_, i) => i + startHour);
    return hours.map((hour) => {
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 12-hour format
      const ampm = hour < 12 ? 'AM' : 'PM';
      return {
        label: `${formattedHour} ${ampm}`,
        value: `${hour < 10 ? '0' : ''}${hour}:00`, // store time in 24-hour format
      };
    });
  };

  
  const addAvailability = async () => {
    if (!selectedDay && selectedDay !== 0) return;

    const doctorId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    console.log('doctorId from localStorage:', doctorId); // Check if the ID is retrieved correctly
    
    if (!doctorId) {
      console.error("Make sure you're logged in!");
      return;
    }

    if (!date) {
      console.error("Date is not selected!");
      return;
    }

    const adjustedStartTime = adjustTimeToLocal(startTime);
    const adjustedEndTime = adjustTimeToLocal(endTime);
    
    const scheduleData = {
      date: date.toISOString().split('T')[0],
      start: adjustedStartTime,
      end: adjustedEndTime,
      doctorId,
    };

    try {
        // POST request to add the availability
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/schedule/doctor/${doctorId}`,
          scheduleData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Availability added:", response.data);
        toast.success(`Schedule for ${scheduleData.date} was successfully added!`);
      } catch (error) {
        toast.error("Failed to add schedule. Please try again.");
        console.error("Error adding schedule:", error);
      }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
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
                  {selectedDay !== null ? daysOfWeek[selectedDay] : "Select a day"}
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
                          {generateTimeOptions(8, 18).map(({ label, value }) => ( // 8 AM to 6 PM range
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
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
                          {generateTimeOptions(8, 18).map(({ label, value }) => ( // 8 AM to 6 PM range
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={addAvailability}
                    disabled={selectedDay === null}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Availability
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
    </>
  );
}
