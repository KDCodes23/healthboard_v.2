"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"

/**
 * DoctorMessagesPage Component
 *
 * This page displays the doctor's messaging interface.
 * It allows communication with patients.
 */
export default function DoctorMessagesPage() {
  // State for the selected patient and message input
  const [selectedPatient, setSelectedPatient] = useState<string | null>("John Smith")
  const [messageInput, setMessageInput] = useState("")

  // Sample patient list
  const patients = [
    {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for the prescription, doctor.",
    },
    {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "When should I take the new medication?",
    },
    {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I've been feeling much better since our last appointment.",
    },
    {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can I schedule a follow-up appointment?",
    },
  ]

  // Sample messages for the selected patient
  const messages = [
    { sender: "doctor", content: "Hello, how are you feeling today?", time: "9:30 AM" },
    {
      sender: "patient",
      content: "I'm feeling much better, thank you. The new medication seems to be working.",
      time: "9:32 AM",
    },
    { sender: "doctor", content: "That's great to hear! Any side effects?", time: "9:35 AM" },
    {
      sender: "patient",
      content: "No side effects so far. When should I schedule my next appointment?",
      time: "9:40 AM",
    },
    {
      sender: "doctor",
      content: "Let's schedule a follow-up in two weeks. I'll have my assistant contact you with available times.",
      time: "9:42 AM",
    },
    { sender: "patient", content: "Thank you for the prescription, doctor.", time: "9:45 AM" },
  ]

  // Handle sending a new message
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log(`Sending message to ${selectedPatient}: ${messageInput}`)
      setMessageInput("")
    }
  }

  return (
    <SidebarProvider>
      {/* Doctor Sidebar Navigation */}
      <DoctorSidebar />

      {/* Main Content Area */}
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-mega bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                  Messages
                </h1>
                <ThemeToggle />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Patient List */}
                <Card className="dashboard-card md:col-span-1 floating-slow">
                  <CardHeader>
                    <CardTitle>Patients</CardTitle>
                    <CardDescription>Select a patient to view conversation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {patients.map((patient) => (
                        <div
                          key={patient.name}
                          className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                            selectedPatient === patient.name ? "bg-primary/10" : "hover:bg-muted"
                          }`}
                          onClick={() => setSelectedPatient(patient.name)}
                        >
                          <Avatar>
                            <AvatarImage src={patient.avatar} alt={patient.name} />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{patient.lastMessage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Message Thread */}
                <Card className="dashboard-card md:col-span-2 floating">
                  <CardHeader>
                    <CardTitle>{selectedPatient || "Select a patient"}</CardTitle>
                    <CardDescription>
                      {selectedPatient ? "Message history" : "Please select a patient to view messages"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedPatient ? (
                      <>
                        {/* Message Thread */}
                        <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.sender === "doctor" ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs mt-1 opacity-70">{message.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Message Input */}
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSendMessage()
                              }
                            }}
                          />
                          <Button size="icon" className="dashboard-button" onClick={handleSendMessage}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                        Select a patient to start messaging
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

