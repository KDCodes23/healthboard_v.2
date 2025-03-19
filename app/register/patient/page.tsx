"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, User, Phone, Calendar, HeartPulse } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registerPatient } from "@/lib/actions"
import { AnimatedBackground } from "@/components/animated-background"
import { ParticleEffect } from "@/components/particle-effect"

export default function PatientRegistrationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setFormError("")

    const formData = new FormData(event.currentTarget)

    try {
      const result = await registerPatient(formData)

      if (result.success) {
        router.push("/login?registered=true")
      } else {
        setFormError(result.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-y-auto bg-gradient-custom flex items-center justify-center p-4">
      <AnimatedBackground />
      <ParticleEffect />
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Crescent shape */}
        <div className="absolute -left-40 top-1/4 w-80 h-80 rounded-full bg-[#1a2b34] opacity-70 blur-md"></div>

        {/* Wave pattern */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              fill="none"
              stroke="rgba(167, 232, 208, 0.5)"
              strokeWidth="0.5"
            ></path>
            <path
              d="M0,125 C150,225 350,25 500,125 L500,00 L0,0 Z"
              fill="none"
              stroke="rgba(167, 232, 208, 0.5)"
              strokeWidth="0.5"
            ></path>
            <path
              d="M0,150 C150,250 350,50 500,150 L500,00 L0,0 Z"
              fill="none"
              stroke="rgba(167, 232, 208, 0.5)"
              strokeWidth="0.5"
            ></path>
            <path
              d="M0,175 C150,275 350,75 500,175 L500,00 L0,0 Z"
              fill="none"
              stroke="rgba(167, 232, 208, 0.5)"
              strokeWidth="0.5"
            ></path>
            <path
              d="M0,200 C150,300 350,100 500,200 L500,00 L0,0 Z"
              fill="none"
              stroke="rgba(167, 232, 208, 0.5)"
              strokeWidth="0.5"
            ></path>
          </svg>
        </div>
      </div>

      {/* Registration form */}
      <div className="w-full max-w-md relative z-10 my-16">
        <div className="glass-card rounded-3xl p-8 backdrop-blur-xl floating-slow">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="text-[#4dff7c] text-4xl font-bold glow-text">
                H
                <span className="inline-block">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline"
                  >
                    <path d="M12 4L12 20" stroke="#4dff7c" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 12L20 12" stroke="#4dff7c" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 9L7 15" stroke="#4dff7c" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 9L17 15" stroke="#4dff7c" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                H
              </div>
            </div>
          </div>

          <h1 className="text-[#a7e8d0] text-3xl font-light text-center mb-6 glow-text">Patient Registration</h1>

          {formError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-6">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#a7e8d0] text-sm font-light">
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#a7e8d0] text-sm font-light">
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#a7e8d0] text-sm font-light">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="patient@example.com"
                  required
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#a7e8d0] text-sm font-light">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  required
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-[#a7e8d0] text-sm font-light">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#a7e8d0] text-sm font-light">
                  Gender
                </Label>
                <Select name="gender" required>
                  <SelectTrigger className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2d4f5c] border-[#a7e8d0]/20 text-[#a7e8d0]">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions" className="text-[#a7e8d0] text-sm font-light">
                Medical Conditions (if any)
              </Label>
              <div className="relative">
                <Input
                  id="medicalConditions"
                  name="medicalConditions"
                  placeholder="E.g., Diabetes, Hypertension"
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <HeartPulse className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
              </div>
            </div>




            <div className="space-y-2">
              <Label htmlFor="street" className="text-[#a7e8d0] text-sm font-light">
                Street
              </Label>
              <div className="relative">
                <Input
                  id="street"
                  name="Address.Street"
                  placeholder="123 Health St"
                  required
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-[#a7e8d0] text-sm font-light">
                  City
                </Label>
                <div className="relative">
                  <Input
                    id="city"
                    name="Address.City"
                    placeholder="Springfield"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="province" className="text-[#a7e8d0] text-sm font-light">
                  Province/State
                </Label>
                <div className="relative">
                  <Input
                    id="province"
                    name="Address.ProvinceOrState"
                    placeholder="IL"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-[#a7e8d0] text-sm font-light">
                  Country
                </Label>
                <div className="relative">
                  <Input
                    id="country"
                    name="Address.Country" 
                    placeholder="USA"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-[#a7e8d0] text-sm font-light">
                  Postal Code
                </Label>
                <div className="relative">
                  <Input
                    id="postalCode"
                    name="Address.PostalCode" // Change from "address.postalCode" to "address[postalCode]"
                    placeholder="62704"
                    required
                    className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                  />
                </div>
              </div>
            </div>



            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#a7e8d0] text-sm font-light">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#a7e8d0] text-sm font-light">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-10 pl-10 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a7e8d0]" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-6 rounded-full bg-[rgba(45,79,92,0.4)] border border-[#4dff7c]/30 text-[#4dff7c] hover:bg-[rgba(45,79,92,0.6)] hover:border-[#4dff7c]/50 hover:text-[#4dff7c] hover:shadow-[0_0_15px_rgba(77,255,124,0.5)] transition-all duration-300 glow"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-[#4dff7c] border-t-transparent rounded-full" />
              ) : (
                "Register"
              )}
            </Button>

            <div className="text-center mt-4">
              <Link href="/login" className="text-[#a7e8d0]/80 hover:text-[#4dff7c] text-sm transition-colors">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

