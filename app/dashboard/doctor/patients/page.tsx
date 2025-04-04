"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { DoctorPatientList } from "@/components/doctor-patient-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"


/**
 * DoctorPatientsPage Component
 *
 * This page displays the doctor's patient list.
 * It uses the DoctorPatientList component to show patient details.
 */
export default function DoctorPatientsPage() {
  return (
    <SidebarProvider>
      {/* Doctor Sidebar Navigation */}
      <DoctorSidebar />

      {/* Main Content Area */}
      
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6 ">
            <div className="mx-auto max-w-7xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-mega bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                  Patient Management
                </h1>
                <ThemeToggle />
              </div>
              
              {/* Glass Card Wrapper */}
              <div className="glass-card rounded-lg p-6 floating-slow">
                <DoctorPatientList />
              </div>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}