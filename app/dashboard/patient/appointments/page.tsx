"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { PatientAppointments } from "@/components/patient-appointments"
import { PageWrapper } from "@/components/page-wrapper"


/**
 * PatientAppointmentsPage Component
 *
 * This page displays the patient's appointments.
 * It uses the PatientAppointments component to show appointment details.
 */
export default function PatientAppointmentsPage() {
  return (
    <SidebarProvider>
      {/* Patient Sidebar Navigation */}
      <PatientSidebar />

      {/* Main Content Area */}
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <h1 className="mb-6 text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                Appointments
              </h1>
              <PatientAppointments />
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

