"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Activity, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Import the AnimatedBackground component at the top of the file
import { AnimatedBackground } from "@/components/animated-background"
// Import the ParticleEffect component at the top of the file
import { ParticleEffect } from "@/components/particle-effect"

/**
 * HomePage Component
 *
 * This is the landing page for Health Horizon.
 * It allows users to select their role (patient or doctor) before accessing the dashboard.
 */
export default function HomePage() {
  const router = useRouter()
  const [role, setRole] = useState<"patient" | "doctor" | null>(null)

  // Handle role selection
  const handleRoleSelect = (selectedRole: "patient" | "doctor") => {
    setRole(selectedRole)
  }

  // Navigate to the appropriate registration page based on role
  const handleContinue = () => {
    if (role) {
      router.push(`/register/${role}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-custom p-4">
      <AnimatedBackground />
      <ParticleEffect />
      <div className="mb-8 flex items-center gap-2">
        <div className="rounded-md bg-primary p-2">
          <Activity className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-[#a7e8d0] glow-text">Health Horizon</h1>
      </div>

      <Card className="w-full max-w-md glass-card floating">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#a7e8d0]">Welcome to Health Horizon</CardTitle>
          <CardDescription className="text-[#a7e8d0]/80">Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="patient"
            className="w-full"
            onValueChange={(value) => handleRoleSelect(value as "patient" | "doctor")}
          >
            <TabsList className="grid w-full grid-cols-2 bg-[rgba(45,79,92,0.2)]">
              <TabsTrigger
                value="patient"
                className="data-[state=active]:bg-[#4dff7c]/20 data-[state=active]:text-[#4dff7c]"
              >
                Patient
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="data-[state=active]:bg-[#4dff7c]/20 data-[state=active]:text-[#4dff7c]"
              >
                Doctor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient" className="mt-4 space-y-4">
              <div className="rounded-lg border border-[#a7e8d0]/20 p-4 bg-[rgba(45,79,92,0.2)]">
                <h3 className="font-medium text-[#a7e8d0]">Patient Dashboard Features:</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-[#a7e8d0]/80">
                  <li>View your health metrics and progress</li>
                  <li>Manage upcoming appointments</li>
                  <li>Access medical records and prescriptions</li>
                  <li>Communicate with your healthcare providers</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="doctor" className="mt-4 space-y-4">
              <div className="rounded-lg border border-[#a7e8d0]/20 p-4 bg-[rgba(45,79,92,0.2)]">
                <h3 className="font-medium text-[#a7e8d0]">Doctor Dashboard Features:</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-[#a7e8d0]/80">
                  <li>View patient list and detailed health information</li>
                  <li>Manage your schedule and appointments</li>
                  <li>Update medical records and prescriptions</li>
                  <li>Communicate with patients and other providers</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full bg-[rgba(45,79,92,0.4)] border border-[#4dff7c]/30 text-[#4dff7c] hover:bg-[rgba(45,79,92,0.6)] hover:border-[#4dff7c]/50 hover:text-[#4dff7c] hover:shadow-[0_0_15px_rgba(77,255,124,0.5)] transition-all duration-300 glow"
            onClick={handleContinue}
            disabled={!role}
          >
            Register <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="text-center w-full mt-2">
            <Link href="/login" className="text-[#a7e8d0]/80 hover:text-[#4dff7c] text-sm transition-colors">
              Already have an account? Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

