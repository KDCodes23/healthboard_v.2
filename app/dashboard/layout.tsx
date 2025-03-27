"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { PatientSidebar } from "@/components/patient-sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDoctor = pathname.includes("/dashboard/doctor")

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen">
        {isDoctor ? <DoctorSidebar /> : <PatientSidebar />}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </ThemeProvider>
  )
}

