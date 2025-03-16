"use client"

import { useEffect, useState } from "react"
import { Lightbulb } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const healthTips = [
  {
    title: "Stay Hydrated",
    quote: "Water is the driving force of all nature.",
    author: "Leonardo da Vinci",
    description: "Drink at least 8 glasses of water daily to maintain good health.",
    category: "Wellness",
  },
  {
    title: "Regular Exercise",
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    description: "Aim for 30 minutes of moderate exercise 5 times a week.",
    category: "Fitness",
  },
  {
    title: "Balanced Diet",
    quote: "Let food be thy medicine, and medicine be thy food.",
    author: "Hippocrates",
    description: "Include fruits, vegetables, whole grains, and lean proteins in your meals.",
    category: "Nutrition",
  },
  {
    title: "Quality Sleep",
    quote: "Sleep is the best meditation.",
    author: "Dalai Lama",
    description: "Get 7-9 hours of sleep each night for optimal health.",
    category: "Rest",
  },
  {
    title: "Stress Management",
    quote: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
    description: "Practice meditation or deep breathing exercises daily.",
    category: "Mental Health",
  },
]

export function HealthTips() {
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="dashboard-card floating-slow overflow-hidden">
      <div className="shape-dots absolute inset-0 opacity-10" />
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-heading">Daily Health Tip</CardTitle>
        </div>
        <CardDescription className="text-small">{healthTips[currentTip].category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-subtitle font-medium text-primary glow-text">{healthTips[currentTip].title}</h3>
          <div className="quote">
            <p className="text-body text-muted-foreground">{healthTips[currentTip].quote}</p>
            <p className="mt-2 text-small text-right text-muted-foreground">— {healthTips[currentTip].author}</p>
          </div>
          <p className="text-small text-muted-foreground">{healthTips[currentTip].description}</p>
        </div>

        {/* Pagination dots */}
        <div className="mt-4 flex justify-center gap-1">
          {healthTips.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentTip ? "w-6 bg-primary" : "w-2 bg-primary/20"
              }`}
              onClick={() => setCurrentTip(index)}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

