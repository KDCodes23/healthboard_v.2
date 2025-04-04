"use client"

import { Calendar, Clock, FileText, Search, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { DoctorAppointments } from "@/components/doctor-appointments"
import { DoctorPatientList } from "@/components/doctor-patient-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { MeetingButton } from "@/components/meeting-button"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

/**
 * DoctorDashboard Component
 *
 * This is the main dashboard page for doctors.
 * It displays patient information, appointment schedules, and medical records.
 */
export default function DoctorDashboard() {
  // Sample data for appointment statistics
  const appointmentStats = [
    { day: "Mon", appointments: 8 },
    { day: "Tue", appointments: 12 },
    { day: "Wed", appointments: 10 },
    { day: "Thu", appointments: 15 },
    { day: "Fri", appointments: 9 },
    { day: "Sat", appointments: 5 },
    { day: "Sun", appointments: 0 },
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
                <div>
                  <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                    Health Horizon
                  </h1>
                  <p className="text-muted-foreground">Manage your patients and appointments</p>
                </div>
                <div className="flex w-full items-center gap-2 md:w-auto">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search patients..."
                      className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                    />
                  </div>
                  <MeetingButton />
                  <ThemeToggle />
                </div>
              </div>

              {/* Dashboard Tabs */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="patients">Patients</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="records">Medical Records</TabsTrigger>
                </TabsList>

                {/* Overview Tab Content */}
                <TabsContent value="overview" className="space-y-4">
                  {/* Statistics Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Patients Card */}
                    <Card className="dashboard-card floating-slow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">248</div>
                        <p className="text-xs text-muted-foreground">+12 from last month</p>
                      </CardContent>
                    </Card>

                    {/* Today's Appointments Card */}
                    <Card className="dashboard-card floating">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">3 remaining</p>
                      </CardContent>
                    </Card>

                    {/* Pending Reports Card */}
                    <Card className="dashboard-card floating-slow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                        <FileText className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">2 urgent</p>
                      </CardContent>
                    </Card>

                    {/* Next Appointment Card */}
                    <Card className="dashboard-card floating">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                        <Clock className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">10:30 AM</div>
                        <p className="text-xs text-muted-foreground">John Smith • Annual Check-up</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts and Recent Patients */}
                  <div className="grid gap-4 md:grid-cols-7">
                    {/* Weekly Appointment Load Chart */}
                    <Card className="dashboard-card col-span-7 md:col-span-4 floating-slow">
                      <CardHeader>
                        <CardTitle>Weekly Appointment Load</CardTitle>
                        <CardDescription>Number of appointments scheduled per day this week</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer
                          config={{
                            appointments: {
                              label: "Appointments",
                              color: "hsl(var(--primary))",
                            },
                          }}
                          className="aspect-[16/9]"
                        >
                          <BarChart data={appointmentStats} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={4} />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    {/* Recent Patients Card */}
                    <Card className="dashboard-card col-span-7 md:col-span-3 floating">
                      <CardHeader>
                        <CardTitle>Recent Patients</CardTitle>
                        <CardDescription>Patients with recent appointments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              name: "John Smith",
                              avatar: "/placeholder.svg?height=40&width=40",
                              date: "Today, 9:00 AM",
                              reason: "Annual Check-up",
                            },
                            {
                              name: "Emily Johnson",
                              avatar: "/placeholder.svg?height=40&width=40",
                              date: "Today, 11:30 AM",
                              reason: "Follow-up",
                            },
                            {
                              name: "Michael Chen",
                              avatar: "/placeholder.svg?height=40&width=40",
                              date: "Today, 2:15 PM",
                              reason: "Consultation",
                            },
                            {
                              name: "Sarah Williams",
                              avatar: "/placeholder.svg?height=40&width=40",
                              date: "Tomorrow, 10:00 AM",
                              reason: "Lab Results",
                            },
                          ].map((patient, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={patient.avatar} alt={patient.name} />
                                <AvatarFallback>
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{patient.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {patient.date} • {patient.reason}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon" className="dashboard-button">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View record</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Patients Tab Content */}
                <TabsContent value="patients">
                  <DoctorPatientList />
                </TabsContent>

                {/* Appointments Tab Content */}
                <TabsContent value="appointments">
                  <DoctorAppointments />
                </TabsContent>

                {/* Medical Records Tab Content */}
                <TabsContent value="records">
                  <Card className="dashboard-card floating">
                    <CardHeader>
                      <CardTitle>Medical Records</CardTitle>
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
                        ].map((record, index) => (
                          <div key={index} className="flex items-center justify-between rounded-lg border p-4">
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
                                    : "bg-amber-100 text-amber-800"
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
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </PageWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}

