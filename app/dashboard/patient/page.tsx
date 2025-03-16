"use client"

import { Activity, Calendar, Clock, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { PatientAppointments } from "@/components/patient-appointments"
import { MedicationCarousel } from "@/components/medication-carousel"
import { HealthTips } from "@/components/health-tips"
import { MedicationShop } from "@/components/medication-shop"
import { FeaturedProducts } from "@/components/featured-products"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"

export default function PatientDashboard() {
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
                    Health Horizon
                  </h1>
                  <p className="text-body text-muted-foreground">Monitor your health metrics and manage your care</p>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button className="dashboard-button">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Doctor
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-background">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="shop">Shop</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Health Metrics Cards */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Steps Today Card */}
                    <Card className="dashboard-card floating-slow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-heading">Steps Today</CardTitle>
                        <Activity className="h-5 w-5 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-display">8,942</div>
                        <p className="text-small text-muted-foreground">89% of daily goal</p>
                        <Progress value={89} max={100} className="mt-2 h-2" />
                      </CardContent>
                    </Card>

                    {/* Next Appointment Card */}
                    <Card className="dashboard-card floating">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-heading">Next Appointment</CardTitle>
                        <Calendar className="h-5 w-5 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-display">Jun 15</div>
                        <p className="text-small text-muted-foreground">Dr. Sarah Johnson</p>
                        <div className="mt-2 flex items-center text-small text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>10:30 AM</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Health Tips Section */}
                  <HealthTips />

                  {/* Featured Products Section */}
                  <Card className="dashboard-card floating-slow">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Featured Products</CardTitle>
                      <CardDescription>Recommended supplements and medications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FeaturedProducts />
                    </CardContent>
                  </Card>

                  {/* Medication Carousel Section */}
                  <Card className="dashboard-card floating">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Your Medications</CardTitle>
                      <CardDescription>Track your current medications and refill status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MedicationCarousel />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="appointments">
                  <PatientAppointments />
                </TabsContent>

                <TabsContent value="medications">
                  <Card className="dashboard-card floating">
                    <CardHeader>
                      <CardTitle className="text-subtitle">All Medications</CardTitle>
                      <CardDescription>Manage your prescribed medications and refill status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MedicationCarousel />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="shop">
                  <Card className="dashboard-card floating-slow">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Medication Shop</CardTitle>
                      <CardDescription>Purchase your prescribed medications online</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MedicationShop />
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

