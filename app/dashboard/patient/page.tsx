"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, Calendar, Clock, Download, FileText, Plus, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeetingButton } from "@/components/meeting-button"
import { CardSpotlight } from "@/components/ui/card-spotlight"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for the dashboard
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2023-11-15",
      time: "10:00 AM",
      status: "confirmed",
      meetingUrl: "https://zoom.us/j/123456789",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2023-11-18",
      time: "2:30 PM",
      status: "pending",
      meetingUrl: "https://teams.microsoft.com/l/meetup-join/123456789",
    },
  ]

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-10-01",
      endDate: "2023-12-01",
      instructions: "Take with food",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-09-15",
      endDate: "2024-03-15",
      instructions: "Take with meals",
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      startDate: "2023-10-10",
      endDate: "2024-04-10",
      instructions: "Take at night",
    },
  ]

  const recentRecords = [
    {
      id: 1,
      title: "Blood Test Results",
      date: "2023-10-25",
      doctor: "Dr. Sarah Johnson",
      type: "Lab Results",
    },
    {
      id: 2,
      title: "Cardiology Consultation",
      date: "2023-10-15",
      doctor: "Dr. Sarah Johnson",
      type: "Consultation Notes",
    },
  ]

  const healthMetrics = [
    {
      id: 1,
      metric: "Blood Pressure",
      value: "120/80 mmHg",
      date: "2023-11-01",
      status: "normal",
    },
    {
      id: 2,
      metric: "Heart Rate",
      value: "72 bpm",
      date: "2023-11-01",
      status: "normal",
    },
    {
      id: 3,
      metric: "Blood Glucose",
      value: "95 mg/dL",
      date: "2023-11-01",
      status: "normal",
    },
    {
      id: 4,
      metric: "Weight",
      value: "165 lbs",
      date: "2023-11-01",
      status: "normal",
    },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your health information.</p>
        </div>
        <MeetingButton className="hidden md:flex" />
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="overview" className="relative">
            Overview
            {activeTab === "overview" && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-primary" />}
          </TabsTrigger>
          <TabsTrigger value="appointments" className="relative">
            Appointments
            {activeTab === "appointments" && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-primary" />}
          </TabsTrigger>
          <TabsTrigger value="medications" className="relative">
            Medications
            {activeTab === "medications" && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-primary" />}
          </TabsTrigger>
          <TabsTrigger value="records" className="relative">
            Records
            {activeTab === "records" && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-primary" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardSpotlight className="h-full">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Next: {upcomingAppointments[0]?.doctor} on {upcomingAppointments[0]?.date}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/patient/appointments">
                    <Button variant="ghost" className="h-8 w-full">
                      View All
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CardSpotlight>

            <CardSpotlight className="h-full">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{medications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Including {medications[0]?.name} and {medications.length - 1} others
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/patient/medications">
                    <Button variant="ghost" className="h-8 w-full">
                      View All
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CardSpotlight>

            <CardSpotlight className="h-full">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentRecords.length}</div>
                  <p className="text-xs text-muted-foreground">Last updated: {recentRecords[0]?.date}</p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/patient/records">
                    <Button variant="ghost" className="h-8 w-full">
                      View All
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CardSpotlight>

            <CardSpotlight className="h-full">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Metrics</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.length}</div>
                  <p className="text-xs text-muted-foreground">
                    BP: {healthMetrics[0]?.value}, HR: {healthMetrics[1]?.value}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/patient/metrics">
                    <Button variant="ghost" className="h-8 w-full">
                      View All
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CardSpotlight>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>You have {upcomingAppointments.length} upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
                      </div>
                      <MeetingButton meetingUrl={appointment.meetingUrl} variant="outline" size="sm" />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/patient/appointments">
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Appointments
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Medical Records</CardTitle>
                <CardDescription>Your latest medical documents and test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{record.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.date} • {record.doctor}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/patient/records">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Records
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>View and manage your upcoming medical appointments</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.date}</span>
                          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline">Reschedule</Button>
                      <MeetingButton meetingUrl={appointment.meetingUrl} variant="default" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Medications</CardTitle>
              <CardDescription>Current prescriptions and medication schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication) => (
                  <div key={medication.id} className="flex flex-col rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} • {medication.frequency}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Set Reminder
                      </Button>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>
                        <span className="font-medium">Start:</span> {medication.startDate}
                      </p>
                      <p>
                        <span className="font-medium">End:</span> {medication.endDate}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">Instructions:</span> {medication.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Request Refill
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Access your medical history and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{record.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.date} • {record.doctor}
                      </p>
                      <p className="text-sm text-muted-foreground">{record.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/patient/records">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Records
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

