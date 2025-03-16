"use client"

import { FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { PageWrapper } from "@/components/page-wrapper"

/**
 * PatientRecordsPage Component
 *
 * This page displays the patient's medical records.
 * It shows a list of records that can be viewed or downloaded.
 */
export default function PatientRecordsPage() {
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
                Medical Records
              </h1>

              <Card className="dashboard-card floating">
                <CardHeader>
                  <CardTitle>Your Medical Records</CardTitle>
                  <CardDescription>Access and download your medical records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Annual Physical Results", date: "May 10, 2024", doctor: "Dr. Sarah Johnson" },
                      { title: "Blood Test Results", date: "April 15, 2024", doctor: "Dr. Michael Chen" },
                      { title: "Vaccination Record", date: "March 22, 2024", doctor: "Dr. Emily Rodriguez" },
                      { title: "Allergy Test Results", date: "February 8, 2024", doctor: "Dr. Sarah Johnson" },
                      { title: "X-Ray Results", date: "January 12, 2024", doctor: "Dr. Michael Chen" },
                      { title: "Cardiology Report", date: "December 5, 2023", doctor: "Dr. Robert Thompson" },
                    ].map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4 dashboard-card"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{record.title}</h4>
                            <div className="text-sm text-muted-foreground">
                              {record.date} • {record.doctor}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="dashboard-button">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="dashboard-button">
                            Download
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

