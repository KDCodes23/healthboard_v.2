"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
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

// Emotion and intent detection
function detectEmotionAndIntent(message: string) {
  const lower = message.toLowerCase()
  const emotionKeywords = {
    sadness: ["sad", "depressed", "empty", "hopeless", "worthless"],
    anxiety: ["anxious", "worried", "panic", "nervous", "overwhelmed"],
    anger: ["angry", "mad", "frustrated", "irritated", "pissed"],
    exhaustion: ["tired", "exhausted", "drained", "burned out", "fatigued"],
    loneliness: ["lonely", "alone", "isolated", "ignored", "left out"],
    gratitude: ["thankful", "grateful", "appreciate", "blessed", "happy"],
  }

  const intentKeywords = {
    askingForHelp: ["what should i do", "how can i", "can you help", "need advice"],
    venting: ["i just", "i feel like", "i hate", "i can’t", "i don’t know why"],
    reflective: ["i think", "i’ve been", "lately", "recently", "i’ve noticed"],
  }

  let detectedEmotion = null
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detectedEmotion = emotion
      break
    }
  }

  let detectedIntent = null
  for (const [intent, phrases] of Object.entries(intentKeywords)) {
    if (phrases.some((kw) => lower.includes(kw))) {
      detectedIntent = intent
      break
    }
  }

  return { detectedEmotion, detectedIntent }
}

// Knowledge base with helpful links
const knowledgeBase: Record<string, { response: string; link: string }> = {
  sadness: {
    response:
      "It sounds like you're going through a tough time. You might find this resource helpful for managing sadness and depression.",
    link: "https://www.helpguide.org/articles/depression/coping-with-depression.htm",
  },
  anxiety: {
    response:
      "Anxiety can be really overwhelming. Here's a calming technique and more information on how to manage it.",
    link: "https://www.verywellmind.com/top-relaxation-techniques-for-anxiety-2584113",
  },
  anger: {
    response:
      "Managing anger in healthy ways is really important. Check this out for practical tips.",
    link: "https://www.apa.org/topics/anger/control",
  },
  exhaustion: {
    response:
      "Feeling drained could be a sign of burnout. Here's a helpful guide on recognizing and coping with it.",
    link: "https://www.mindtools.com/pages/article/recovering-from-burnout.htm",
  },
  loneliness: {
    response:
      "You're not alone, even if it feels that way. These tips might help you feel more connected.",
    link: "https://www.headspace.com/articles/how-to-deal-with-loneliness",
  },
  gratitude: {
    response:
      "That's lovely to hear. Practicing gratitude has great benefits. Here's more on how to keep that going.",
    link: "https://greatergood.berkeley.edu/topic/gratitude",
  },
}

// Default smart answers for common questions
const defaultAnswers: Record<string, string> = {
  "what should i do":
    "It depends on your situation, but taking small, manageable steps is a good start. Would you like help making a plan?",
  "how can i feel better":
    "Sometimes, a short walk, deep breathing, or talking to someone you trust can make a big difference.",
  "can you help":
    "Of course! I'm here to support you. Just tell me a little more about what you're going through.",
  "i feel like giving up":
    "I'm really sorry you're feeling this way. You're not alone. Would you like me to share some support resources?",
  "how can i manage anxiety":
    "Try this breathing exercise: Inhale for 4 seconds, hold for 4, exhale for 4. Here's a guide: https://www.headspace.com/articles/how-to-deal-with-anxiety",
  "i can't sleep":
    "Struggling to sleep is tough. You could try a calming bedtime routine, or check this out: https://www.sleepfoundation.org/sleep-hygiene",
  "i need advice":
    "Sure—I'm all ears. What specifically would you like advice on?",
  "i’ve been feeling down lately":
    "That’s really tough. Do you know what’s been triggering those feelings, or do they come out of nowhere?",
}

export default function PatientChatPage() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Health Horizon AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const { detectedEmotion, detectedIntent } = detectEmotionAndIntent(input)

    let response =
      "I'm here for you. Can you tell me more about what's been going on?"
    let link = ""

    // Check for default answer match
    const questionMatch = Object.entries(defaultAnswers).find(([key]) =>
      input.toLowerCase().includes(key)
    )
    if (questionMatch) {
      response = questionMatch[1]
    } else if (detectedEmotion && knowledgeBase[detectedEmotion]) {
      response = knowledgeBase[detectedEmotion].response
      link = knowledgeBase[detectedEmotion].link
    }

    if (detectedIntent === "askingForHelp") {
      response += " I'm here to support you with whatever you're facing."
    } else if (detectedIntent === "venting") {
      response += " I'm listening—feel free to let it all out."
    } else if (detectedIntent === "reflective") {
      response += " It's great that you're noticing patterns. Want to unpack that together?"
    }

    if (link) {
      response += `\n\nYou can read more here: ${link}`
    }

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500 + Math.random() * 1000)
  }

  return (
    <SidebarProvider>
      <PatientSidebar />
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="animate-in">
                  <h1 className="text-mega bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                    AI Health Assistant
                  </h1>
                  <p className="text-body text-muted-foreground">
                    Ask questions about your health, medications, or treatment plan
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <Card className="dashboard-card floating-slow animate-in">
                <CardHeader>
                  <CardTitle className="text-subtitle">Health Horizon AI</CardTitle>
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
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p>
                              {message.content.split("\n").map((line, index) => (
                                <span key={index}>
                                  {line.includes("http") ? (
                                    <a
                                      href={line}
                                      className="text-blue-500 underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {line}
                                    </a>
                                  ) : (
                                    line
                                  )}
                                  <br />
                                </span>
                              ))}
                            </p>
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
