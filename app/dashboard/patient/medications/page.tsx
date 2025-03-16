"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { MedicationCarousel } from "@/components/medication-carousel"
import { MedicationShop } from "@/components/medication-shop"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"

export default function MedicationsPage() {
  return (
    <SidebarProvider>
      <PatientSidebar />

      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              {/* Page Header */}
              <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h1 className="text-mega bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                    Medications
                  </h1>
                  <p className="text-body text-muted-foreground">Manage your medications and purchase supplies</p>
                </div>
                <ThemeToggle />
              </div>

              <div className="space-y-6">
                {/* Current Medications */}
                <Card className="dashboard-card floating">
                  <CardHeader>
                    <CardTitle className="text-subtitle">Current Medications</CardTitle>
                    <CardDescription>Track your prescribed medications and refill status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MedicationCarousel />
                  </CardContent>
                </Card>

                {/* Shop Section */}
                <Card className="dashboard-card floating-slow">
                  <CardHeader>
                    <CardTitle className="text-subtitle">Medical Supplies Shop</CardTitle>
                    <CardDescription>Purchase medications and health supplies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MedicationShop />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

