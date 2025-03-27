"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { ExpandableMedicalRecords } from "@/components/expandable-medical-record"

/**
 * DoctorRecordsPage Component
 *
 * This page displays the medical records that the doctor manages.
 * It shows a list of patient records that can be viewed or edited.
 */
export default function DoctorRecordsPage() {
  // Sample medical records data
  const medicalRecords = [
    {
      title: "Annual Physical Results",
      description: "John Smith • May 10, 2024",
      date: "May 10, 2024",
      patient: "John Smith",
      status: "Complete",
      type: "Physical Examination",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "Edit Report",
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
      description: "Emily Johnson • April 15, 2024",
      date: "April 15, 2024",
      patient: "Emily Johnson",
      status: "Pending Review",
      type: "Laboratory",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "Review Results",
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
      title: "Cardiology Consultation",
      description: "Michael Chen • March 22, 2024",
      date: "March 22, 2024",
      patient: "Michael Chen",
      status: "Complete",
      type: "Cardiology",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "Edit Report",
      ctaLink: "https://example.com/records/cardiology-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Cardiology Consultation</h4>
          <p className="mb-2">
            ECG shows normal sinus rhythm with no significant ST-T wave changes. Echocardiogram reveals normal left
            ventricular function with ejection fraction of 60%.
          </p>
          <p className="mb-2">
            Stress test results within normal limits. No evidence of ischemia or arrhythmia during exercise. Continue
            current medication regimen.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="dashboard-button">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Allergy Test Results",
      description: "Sarah Williams • February 8, 2024",
      date: "February 8, 2024",
      patient: "Sarah Williams",
      status: "Complete",
      type: "Laboratory",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "Edit Results",
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
      description: "David Rodriguez • January 20, 2024",
      date: "January 20, 2024",
      patient: "David Rodriguez",
      status: "Complete",
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
    {
      title: "MRI Scan",
      description: "Jennifer Lee • January 5, 2024",
      date: "January 5, 2024",
      patient: "Jennifer Lee",
      status: "Pending Review",
      type: "Radiology",
      src: "/placeholder.svg?height=300&width=500",
      ctaText: "Review Images",
      ctaLink: "https://example.com/records/mri-2024",
      content: () => (
        <div>
          <h4 className="text-lg font-semibold mb-2">Brain MRI Report</h4>
          <p className="mb-2">
            MRI of the brain was performed to evaluate persistent headaches. No evidence of mass, hemorrhage, or
            infarction. Ventricles and sulci are normal in size and configuration.
          </p>
          <p className="mb-2">
            Impression: Normal brain MRI. Clinical correlation recommended. Consider migraine management protocol.
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
  ]

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
                <div className="flex items-center gap-2">
                  <Button className="dashboard-button hover-glow">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Record
                  </Button>
                  <ThemeToggle />
                </div>
              </div>

              <Card className="dashboard-card floating">
                <CardHeader>
                  <CardTitle>Patient Medical Records</CardTitle>
                  <CardDescription>Manage and update patient medical records</CardDescription>
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

