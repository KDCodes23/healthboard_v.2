"use client"

import type React from "react"

import { useState } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Save, User } from "lucide-react"

export default function PatientSettingsPage() {
  const { user, updateUserProfile, logout } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    medicalConditions: user?.medicalConditions || "",
    avatar: user?.avatar || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        medicalConditions: formData.medicalConditions,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    // Redirect will be handled by middleware
  }

  return (
    <SidebarProvider>
      <PatientSidebar />
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="animate-in">
                  <h1 className="text-mega bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                    Settings
                  </h1>
                  <p className="text-body text-muted-foreground">Manage your account and preferences</p>
                </div>
                <ThemeToggle />
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-background">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card className="dashboard-card floating-slow animate-in">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Profile Information</CardTitle>
                      <CardDescription>Update your personal information and medical details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage
                                src={formData.avatar || "/placeholder.svg?height=96&width=96"}
                                alt={formData.firstName}
                              />
                              <AvatarFallback className="text-xl">
                                {formData.firstName?.[0]}
                                {formData.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <Button
                              size="icon"
                              variant="outline"
                              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                            >
                              <User className="h-4 w-4" />
                              <span className="sr-only">Change avatar</span>
                            </Button>
                          </div>
                          <div className="space-y-2 text-center sm:text-left">
                            <h3 className="text-lg font-medium">
                              {formData.firstName} {formData.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">{formData.email}</p>
                            <p className="text-sm text-muted-foreground">Patient</p>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={formData.email} disabled />
                          <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medicalConditions">Medical Conditions</Label>
                          <Textarea
                            id="medicalConditions"
                            name="medicalConditions"
                            value={formData.medicalConditions}
                            onChange={handleChange}
                            placeholder="List any medical conditions, allergies, or important health information"
                            rows={4}
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button type="button" variant="outline" onClick={handleLogout} className="dashboard-button">
                            Log out
                          </Button>
                          <Button type="submit" className="dashboard-button" disabled={isLoading}>
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-6">
                  <Card className="dashboard-card floating animate-in">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Appearance</CardTitle>
                      <CardDescription>Customize how the dashboard looks and feels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <span className="text-sm text-muted-foreground">Switch between light and dark mode</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="dashboard-card floating-slow animate-in">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications and reminders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Configure how and when you receive notifications about appointments, medications, and updates.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Appointment Reminders</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about upcoming appointments
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="dashboard-button">
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button">
                              SMS
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button">
                              Push
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Medication Reminders</h4>
                            <p className="text-sm text-muted-foreground">
                              Get alerts when it's time to take your medication
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="dashboard-button">
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button">
                              SMS
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button">
                              Push
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Health Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about your health metrics and goals
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="dashboard-button">
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button">
                              SMS
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button">
                              Push
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="dashboard-card floating animate-in">
                    <CardHeader>
                      <CardTitle className="text-subtitle">Security Settings</CardTitle>
                      <CardDescription>Manage your password and account security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>

                        <Button className="dashboard-button">Update Password</Button>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Add an extra layer of security to your account
                          </p>
                          <Button variant="outline" className="dashboard-button">
                            Enable Two-Factor Authentication
                          </Button>
                        </div>
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

