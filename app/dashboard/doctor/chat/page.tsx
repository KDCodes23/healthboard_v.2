"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { useUser } from "@/contexts/user-context"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function DoctorChatPage() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello, Dr. " +
        (user?.lastName || "Johnson") +
        "! I'm your Health Horizon AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiResponses = [
        "Based on the patient's symptoms and test results, I would recommend considering a change in medication. The current treatment doesn't seem to be addressing the underlying inflammation.",
        "The latest research suggests that this approach has shown promising results for similar cases. I can provide you with the relevant studies if you'd like to review them.",
        "For this particular condition, a combination therapy might be more effective. Consider adding physical therapy to the treatment plan.",
        "The patient's history indicates a potential drug interaction. It might be worth reviewing their current medication regimen.",
        "This presentation is consistent with early signs of the condition. Early intervention with the standard protocol would be advisable.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <SidebarProvider>
      <DoctorSidebar />
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="animate-in">
                  <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                    Medical AI Assistant
                  </h1>
                  <p className="text-muted-foreground">
                    Get insights on diagnoses, treatments, and the latest medical research
                  </p>
                </div>
                <ThemeToggle />
              </div>

              {/* Chat Interface */}
              <Card className="dashboard-card floating-slow animate-in">
                <CardHeader>
                  <CardTitle>Health Horizon AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[60vh] overflow-y-auto mb-4 space-y-4 p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] items-start gap-3 ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className={message.sender === "user" ? "bg-primary" : "bg-muted"}>
                            {message.sender === "user" ? (
                              <AvatarFallback>
                                {user?.firstName?.[0]}
                                {user?.lastName?.[0]}
                              </AvatarFallback>
                            ) : (
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
                            )}
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="mt-1 text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[80%] items-start gap-3">
                          <Avatar className="bg-muted">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="flex space-x-2">
                              <div className="h-3 w-3 animate-bounce rounded-full bg-primary/60"></div>
                              <div className="h-3 w-3 animate-bounce rounded-full bg-primary/60 delay-75"></div>
                              <div className="h-3 w-3 animate-bounce rounded-full bg-primary/60 delay-150"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" className="dashboard-button" disabled={isLoading}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

