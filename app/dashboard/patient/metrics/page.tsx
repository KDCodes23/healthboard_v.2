"use client"

import { Activity, Heart, Thermometer, Weight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"
import { PageWrapper } from "@/components/page-wrapper"

const metrics = [
  {
    title: "Heart Rate",
    value: "72",
    unit: "BPM",
    change: "+2",
    target: "60-100",
    progress: 72,
    icon: Heart,
  },
  {
    title: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    change: "-5",
    target: "120/80",
    progress: 80,
    icon: Activity,
  },
  {
    title: "Body Temperature",
    value: "98.6",
    unit: "°F",
    change: "0",
    target: "97.8-99.1",
    progress: 85,
    icon: Thermometer,
  },
  {
    title: "Weight",
    value: "165",
    unit: "lbs",
    change: "-2",
    target: "160-170",
    progress: 75,
    icon: Weight,
  },
]

const weeklyData = [
  { day: "Mon", steps: 8000, calories: 2100, sleep: 7.5 },
  { day: "Tue", steps: 10000, calories: 2300, sleep: 8 },
  { day: "Wed", steps: 7500, calories: 2000, sleep: 6.5 },
  { day: "Thu", steps: 9000, calories: 2200, sleep: 7 },
  { day: "Fri", steps: 11000, calories: 2400, sleep: 8.5 },
  { day: "Sat", steps: 6000, calories: 1900, sleep: 9 },
  { day: "Sun", steps: 7000, calories: 2000, sleep: 8 },
]

export default function HealthMetricsPage() {
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
                    Health Metrics
                  </h1>
                  <p className="text-body text-muted-foreground">Track your vital signs and health indicators</p>
                </div>
                <ThemeToggle />
              </div>

              {/* Metrics Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                  <Card key={metric.title} className="dashboard-card floating">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-heading font-medium">{metric.title}</CardTitle>
                      <metric.icon className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-display">{metric.value}</div>
                        <div className="text-small text-muted-foreground">{metric.unit}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div
                          className={`text-sm ${
                            Number(metric.change) > 0
                              ? "text-green-500"
                              : Number(metric.change) < 0
                                ? "text-red-500"
                                : "text-muted-foreground"
                          }`}
                        >
                          {metric.change}
                        </div>
                        <div className="text-sm text-muted-foreground">from last check • Target: {metric.target}</div>
                      </div>
                      <Progress value={metric.progress} className="mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Weekly Summary */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Card className="dashboard-card col-span-2 floating-slow">
                  <CardHeader>
                    <CardTitle className="text-subtitle">Weekly Activity</CardTitle>
                    <CardDescription>Your activity trends over the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {/* Add a chart here using your preferred charting library */}
                      <div className="grid grid-cols-7 gap-4">
                        {weeklyData.map((day) => (
                          <div key={day.day} className="text-center">
                            <div className="text-sm font-medium">{day.day}</div>
                            <div className="mt-2 h-32 w-full rounded-full bg-primary/20">
                              <div
                                className="rounded-full bg-primary transition-all"
                                style={{
                                  height: `${(day.steps / 12000) * 100}%`,
                                  width: "100%",
                                }}
                              />
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">{day.steps.toLocaleString()} steps</div>
                          </div>
                        ))}
                      </div>
                    </div>
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

