"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, MoreHorizontal, Pill } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

/**
 * MedicationCarousel Component
 *
 * This component displays a rotating gallery of medications for the patient.
 * It includes navigation controls and medication details.
 */
export function MedicationCarousel() {
  // Sample medication data
  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      purpose: "Blood Pressure",
      refillsLeft: 3,
      nextRefill: "July 15, 2024",
      instructions: "Take in the morning with food",
      progress: 65,
      color: "blue",
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      purpose: "Cholesterol",
      refillsLeft: 2,
      nextRefill: "June 30, 2024",
      instructions: "Take in the evening",
      progress: 40,
      color: "green",
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      purpose: "Blood Sugar",
      refillsLeft: 1,
      nextRefill: "June 20, 2024",
      instructions: "Take with meals",
      progress: 25,
      color: "purple",
    },
    {
      name: "Levothyroxine",
      dosage: "75mcg",
      frequency: "Once daily",
      purpose: "Thyroid",
      refillsLeft: 4,
      nextRefill: "August 5, 2024",
      instructions: "Take on empty stomach",
      progress: 80,
      color: "amber",
    },
  ]

  // State to track the current medication index
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === medications.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [medications.length])

  // Navigate to the previous medication
  const prevMedication = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? medications.length - 1 : prevIndex - 1))
  }

  // Navigate to the next medication
  const nextMedication = () => {
    setCurrentIndex((prevIndex) => (prevIndex === medications.length - 1 ? 0 : prevIndex + 1))
  }

  // Get the current medication
  const currentMedication = medications[currentIndex]

  // Get color class based on medication color
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    }
    return colorMap[color] || "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
  }

  return (
    <div className="relative">
      {/* Medication Card */}
      <Card className="dashboard-card overflow-hidden floating-slow">
        <CardContent className="p-6">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">
                    {currentMedication.name} {currentMedication.dosage}
                  </h3>
                  <div
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${getColorClass(currentMedication.color)}`}
                  >
                    {currentMedication.purpose}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="dashboard-button">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Request Refill</DropdownMenuItem>
                    <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {currentMedication.frequency} • {currentMedication.instructions}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Refill Status</span>
                <span className="font-medium">{currentMedication.refillsLeft} refills left</span>
              </div>
              <Progress value={currentMedication.progress} max={100} className="h-2" />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Next refill available: {currentMedication.nextRefill}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-sm dashboard-button"
          onClick={prevMedication}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous medication</span>
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 shadow-sm dashboard-button"
          onClick={nextMedication}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next medication</span>
        </Button>
      </div>

      {/* Pagination Indicators */}
      <div className="mt-2 flex justify-center gap-1">
        {medications.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-primary" : "w-2 bg-primary/20"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to medication ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

