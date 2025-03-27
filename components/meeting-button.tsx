"use client"

import type React from "react"

import { useState } from "react"
import { Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MeetingButtonProps extends React.ComponentProps<typeof Button> {
  meetingUrl?: string
}

/**
 * MeetingButton Component
 *
 * This component provides a button to join or create virtual meetings.
 * It can be used in two modes:
 * 1. With a meetingUrl prop: Direct join button for an existing meeting
 * 2. Without meetingUrl: Opens a dialog to create or join a meeting
 *
 * @param meetingUrl - Optional URL for direct joining
 * @param props - All standard Button props
 */
export function MeetingButton({ meetingUrl, ...props }: MeetingButtonProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(meetingUrl || "")
  const [meetingType, setMeetingType] = useState<"zoom" | "teams">("zoom")

  // Function to handle joining a meeting
  const handleJoinMeeting = () => {
    // If we have a direct URL, open it
    if (meetingUrl) {
      window.open(meetingUrl, "_blank")
      return
    }

    // Otherwise open the URL from the dialog
    if (url) {
      window.open(url, "_blank")
      setOpen(false)
    }
  }

  // If we have a direct meeting URL, render a simple join button
  if (meetingUrl) {
    return (
      <Button onClick={handleJoinMeeting} {...props}>
        <Video className="mr-2 h-4 w-4" />
        Join Meeting
      </Button>
    )
  }

  // Otherwise render a button that opens a dialog
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...props}>
          <Video className="mr-2 h-4 w-4" />
          Virtual Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join or Create Meeting</DialogTitle>
          <DialogDescription>Enter a meeting URL or create a new meeting.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meeting-type" className="text-right">
              Platform
            </Label>
            <div className="col-span-3 flex gap-2">
              <Button
                type="button"
                variant={meetingType === "zoom" ? "default" : "outline"}
                onClick={() => setMeetingType("zoom")}
                className="flex-1"
              >
                Zoom
              </Button>
              <Button
                type="button"
                variant={meetingType === "teams" ? "default" : "outline"}
                onClick={() => setMeetingType("teams")}
                className="flex-1"
              >
                Teams
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meeting-url" className="text-right">
              URL
            </Label>
            <Input
              id="meeting-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                meetingType === "zoom" ? "https://zoom.us/j/123456789" : "https://teams.microsoft.com/l/meetup-join/..."
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleJoinMeeting} disabled={!url}>
            Join Meeting
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Generate a new meeting URL based on the selected platform
              // This is a placeholder - in a real app, you would integrate with the Zoom/Teams API
              const newUrl =
                meetingType === "zoom"
                  ? `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`
                  : `https://teams.microsoft.com/l/meetup-join/${Math.floor(Math.random() * 1000000000)}`

              setUrl(newUrl)

              // In a real implementation, you would:
              // 1. Call your backend to create a meeting
              // 2. Store the meeting in your database
              // 3. Return the meeting URL and update the state
            }}
          >
            Create New Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

