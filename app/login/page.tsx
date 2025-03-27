"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AnimatedBackground } from "@/components/animated-background"
import { ParticleEffect } from "@/components/particle-effect"
import { useUser, type UserRole } from "@/contexts/user-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useUser()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [role, setRole] = useState<UserRole>("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Check if user just registered
  const justRegistered =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("registered") === "true"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setFormError("")

    try {
      const result = await login(email, password, role)

      if (result.success) {
        router.push(`/dashboard/${role}`)
      } else {
        setFormError(result.error || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Login error:", error)
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

      {/* Login form */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-3xl p-8 backdrop-blur-xl floating">
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

          <h1 className="text-[#a7e8d0] text-3xl font-light text-center mb-6 glow-text">Log in</h1>

          {justRegistered && (
            <Alert className="mb-6 bg-[#4dff7c]/10 border-[#4dff7c]/30 text-[#4dff7c]">
              <AlertDescription>Registration successful! Please log in with your credentials.</AlertDescription>
            </Alert>
          )}

          {formError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-6">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-[#a7e8d0] text-lg font-light">
                Role
              </Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)} name="role" required>
                <SelectTrigger className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-12 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-[#2d4f5c] border-[#a7e8d0]/20 text-[#a7e8d0]">
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#a7e8d0] text-lg font-light">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-12 pl-12 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a7e8d0]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#a7e8d0] text-lg font-light">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-[rgba(45,79,92,0.2)] border-[#a7e8d0]/20 text-[#a7e8d0] h-12 pl-12 rounded-xl focus:border-[#4dff7c] focus:ring-[#4dff7c]/20"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a7e8d0]" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-8 rounded-full bg-[rgba(45,79,92,0.4)] border border-[#4dff7c]/30 text-[#4dff7c] hover:bg-[rgba(45,79,92,0.6)] hover:border-[#4dff7c]/50 hover:text-[#4dff7c] hover:shadow-[0_0_15px_rgba(77,255,124,0.5)] transition-all duration-300 glow hover-glow"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-[#4dff7c] border-t-transparent rounded-full" />
              ) : (
                "Log in"
              )}
            </Button>

            <div className="flex flex-col space-y-2 text-center mt-4">
              <Link
                href="/register/patient"
                className="text-[#a7e8d0]/80 hover:text-[#4dff7c] text-sm transition-colors"
              >
                Don't have an account? Register as a Patient
              </Link>
              <Link
                href="/register/doctor"
                className="text-[#a7e8d0]/80 hover:text-[#4dff7c] text-sm transition-colors"
              >
                Register as a Doctor
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

