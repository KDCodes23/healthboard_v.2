"use client"

import { Clock, MoreHorizontal, Pill } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export function PatientMedications() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
          <CardDescription>Track your prescribed medications and refill status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Lisinopril",
                dosage: "10mg",
                frequency: "Once daily",
                purpose: "Blood Pressure",
                refillsLeft: 3,
                nextRefill: "July 15, 2024",
                instructions: "Take in the morning with food",
                progress: 65,
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
              },
            ].map((medication, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Pill className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-medium">
                        {medication.name} {medication.dosage}
                      </h4>
                      <div className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        {medication.purpose}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {medication.frequency} • {medication.instructions}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
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

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Refill Status</span>
                    <span className="font-medium">{medication.refillsLeft} refills left</span>
                  </div>
                  <Progress value={medication.progress} max={100} className="h-2" />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Next refill available: {medication.nextRefill}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

