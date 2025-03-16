"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"

/**
 * DoctorRecordsPage Component
 *
 * This page displays the medical records that the doctor manages.
 * It shows a list of patient records that can be viewed or edited.
 */
export default function DoctorRecordsPage() {
  return (
    <SidebarProvider>
      {/* Doctor Sidebar Navigation */}
      <DoctorSidebar />

      {/* Main Content Area */}
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-mega bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                  Medical Records
                </h1>
                <ThemeToggle />
              </div>

              <Card className="dashboard-card floating">
                <CardHeader>
                  <CardTitle>Patient Medical Records</CardTitle>
                  <CardDescription>Manage and update patient medical records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        patient: "John Smith",
                        title: "Annual Physical Results",
                        date: "May 10, 2024",
                        status: "Complete",
                      },
                      {
                        patient: "Emily Johnson",
                        title: "Blood Test Results",
                        date: "April 15, 2024",
                        status: "Pending Review",
                      },
                      {
                        patient: "Michael Chen",
                        title: "Cardiology Consultation",
                        date: "March 22, 2024",
                        status: "Complete",
                      },
                      {
                        patient: "Sarah Williams",
                        title: "Allergy Test Results",
                        date: "February 8, 2024",
                        status: "Complete",
                      },
                      {
                        patient: "David Rodriguez",
                        title: "X-Ray Results",
                        date: "January 20, 2024",
                        status: "Complete",
                      },
                      { patient: "Jennifer Lee", title: "MRI Scan", date: "January 5, 2024", status: "Pending Review" },
                    ].map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4 dashboard-card"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={record.patient} />
                            <AvatarFallback>
                              {record.patient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{record.patient}</h4>
                            <div className="text-sm text-muted-foreground">
                              {record.title} • {record.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`rounded-full px-2 py-1 text-xs ${
                              record.status === "Complete"
                                ? "bg-primary/20 text-primary"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {record.status}
                          </div>
                          <Button variant="outline" size="sm" className="dashboard-button">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="dashboard-button">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

