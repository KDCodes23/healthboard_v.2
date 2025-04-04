"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageWrapper } from "@/components/page-wrapper"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExpandableMedicalRecords } from "@/components/expandable-medical-record"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

/**
 * PatientRecordsPage Component
 *
 * This page displays the patient's medical records.
 * It shows a list of records that can be viewed or downloaded.
 */
export default function PatientRecordsPage() {
  // Sample medical records data
  const medicalRecords = [
    {
      title: "Annual Physical Results",
      description: "Dr. Will Smith • January 10, 2025",
      date: "January 10, 2025",
      doctor: "Dr. Will Smith",
      type: "Dermatology Examination",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "View Report",
      ctaLink: "https://example.com/records/physical-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Annual Physical Examination</h4>
          <p className="mb-2">
            Patient demonstrated good overall health with normal vital signs. Blood pressure: 120/80 mmHg, Heart rate:
            72 bpm, Temperature: 98.6°F.
          </p>
          <p className="mb-2">
            Recommendations include maintaining current exercise regimen and continuing with prescribed medications.
            Follow-up appointment scheduled for next year.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="dashboard-button">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Blood Test Results",
      description: "Dr. John Chen • November 12, 2024",
      date: "Nov 12, 2024",
      doctor: "Dr. John Chen",
      type: "Laboratory",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "View Results",
      ctaLink: "https://example.com/records/blood-test-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Complete Blood Count (CBC)</h4>
          <p className="mb-2">
            All values within normal range. Hemoglobin: 14.2 g/dL, White blood cells: 7.5 x10^9/L, Platelets: 250
            x10^9/L.
          </p>
          <p className="mb-2">
            Cholesterol levels slightly elevated. LDL: 130 mg/dL (target: &lt;100 mg/dL). Recommendation to improve diet
            and increase exercise.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="dashboard-button">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Vaccination Record",
      description: "Dr. Emily Rodriguez • October 22, 2024",
      date: "October 22, 2024",
      doctor: "Dr. Emily Rodriguez",
      type: "Immunization",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "View Record",
      ctaLink: "https://example.com/records/vaccination-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Vaccination Record</h4>
          <p className="mb-2">
            Patient received annual influenza vaccine (Lot #FL29384) and COVID-19 booster (Lot #CV98765).
          </p>
          <p className="mb-2">
            No adverse reactions observed during the 15-minute monitoring period. Next recommended vaccines: Tdap
            booster due in 2027.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="dashboard-button">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Allergy Test Results",
      description: "Dr. Sarah Johnson • May 8, 2024",
      date: "May 8, 2024",
      doctor: "Dr. Sarah Johnson",
      type: "Laboratory",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "View Results",
      ctaLink: "https://example.com/records/allergy-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Allergy Panel Results</h4>
          <p className="mb-2">
            Patient tested positive for mild allergies to dust mites and cat dander. No food allergies detected.
          </p>
          <p className="mb-2">
            Recommended treatment includes over-the-counter antihistamines as needed and environmental modifications
            such as HEPA filters and weekly bedding washing.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="dashboard-button">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "X-Ray Results",
      description: "Dr. Ruby Singh • January 12, 2023",
      date: "January 12, 2023",
      doctor: "Dr. Ruby Singh",
      type: "Radiology",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "View Images",
      ctaLink: "https://example.com/records/xray-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Chest X-Ray Report</h4>
          <p className="mb-2">
            Chest X-ray shows clear lung fields with no evidence of pneumonia, effusion, or masses. Heart size appears
            normal.
          </p>
          <p className="mb-2">
            No further imaging studies recommended at this time. Follow-up only if symptoms develop or worsen.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="dashboard-button">
              <Download className="mr-2 h-4 w-4" />
              Download Images
            </Button>
          </div>
        </div>
      ),
    },
    // {
    //   title: "Cardiology Report",
    //   description: "Dr. Robert Thompson • December 5, 2023",
    //   date: "December 5, 2023",
    //   doctor: "Dr. Robert Thompson",
    //   type: "Cardiology",
    //   src: "/placeholder.svg?height=300&width=500",
    //   ctaText: "View Report",
    //   ctaLink: "https://example.com/records/cardiology-2023",
    //   content: () => (
    //     <div>
    //       <h4 className="text-lg font-semibold mb-2">Cardiology Consultation</h4>
    //       <p className="mb-2">
    //         ECG shows normal sinus rhythm with no significant ST-T wave changes. Echocardiogram reveals normal left
    //         ventricular function with ejection fraction of 60%.
    //       </p>
    //       <p className="mb-2">
    //         Stress test results within normal limits. No evidence of ischemia or arrhythmia during exercise. Continue
    //         current medication regimen.
    //       </p>
    //       <div className="flex gap-2 mt-4">
    //         <Button variant="outline" size="sm" className="dashboard-button">
    //           <Download className="mr-2 h-4 w-4" />
    //           Download Report
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
  ]

  return (
    <SidebarProvider>
      {/* Patient Sidebar Navigation */}
      <PatientSidebar />

      {/* Main Content Area */}
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                  Medical Records
                </h1>
                <ThemeToggle />
              </div>

              <Card className="dashboard-card floating">
                <CardHeader>
                  <CardTitle>Your Medical Records</CardTitle>
                  <CardDescription>Access and download your medical records</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpandableMedicalRecords records={medicalRecords} />
                </CardContent>
              </Card>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

