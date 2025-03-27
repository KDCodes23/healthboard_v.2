"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { MeetingButton } from "@/components/meeting-button"
import { ColorblindModeSelector } from "@/components/colorblind-mode-selector"

export default function DoctorSettingsPage() {
  const { user, updateUserProfile, logout } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [colorblindMode, setColorblindMode] = useState("normal")

  // Update the formData state to potentially include the avatar URL
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    specialty: user?.specialty || "",
    hospital: user?.hospital || "",
    bio: "",
    avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
  })

  // Apply colorblind mode CSS variables
  useEffect(() => {
    const root = document.documentElement

    switch (colorblindMode) {
      case "protanopia":
        root.style.setProperty("--primary", "60 100% 42%") // Yellow-green
        break
      case "deuteranopia":
        root.style.setProperty("--primary", "30 100% 50%") // Orange
        break
      case "tritanopia":
        root.style.setProperty("--primary", "0 100% 71%") // Red
        break
      case "achromatopsia":
        root.style.setProperty("--primary", "0 0% 100%") // White
        break
      default:
        root.style.setProperty("--primary", "144 100% 65%") // Default green
        break
    }
  }, [colorblindMode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Update the handleSubmit function to include avatar in the updateUserProfile call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Include avatar in the update
      await updateUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        specialty: formData.specialty,
        hospital: formData.hospital,
        avatar: formData.avatar,
      })

      // Save colorblind mode preference to localStorage
      localStorage.setItem("colorblindMode", colorblindMode)

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

  // Load colorblind mode from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem("colorblindMode")
    if (savedMode) {
      setColorblindMode(savedMode)
    }
  }, [])

  return (
    <SidebarProvider>
      <DoctorSidebar />
      <SidebarInset>
        <PageWrapper>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              {/* Page Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="animate-in">
                  <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                    Settings
                  </h1>
                  <p className="text-muted-foreground">Manage your account and preferences</p>
                </div>
                <ThemeToggle />
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-background">
                  <TabsTrigger
                    value="profile"
                    className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                  >
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card className="dashboard-card floating-slow animate-in scale-on-hover">
                    <CardHeader>
                      <CardTitle>Professional Profile</CardTitle>
                      <CardDescription>Update your professional information and credentials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Replace the static avatar in the form section with the ImageUpload component */}
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                          {/* Replace the static avatar with the ImageUpload component */}
                          <ImageUpload
                            value={formData.avatar}
                            onChange={(url) => setFormData((prev) => ({ ...prev, avatar: url }))}
                            disabled={isLoading}
                            initials={`${formData.firstName?.[0] || ""}${formData.lastName?.[0] || ""}`}
                          />
                          <div className="space-y-2 text-center sm:text-left">
                            <h3 className="text-lg font-medium shimmer">
                              Dr. {formData.firstName} {formData.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">{formData.email}</p>
                            <p className="text-sm text-muted-foreground">{formData.specialty || "Physician"}</p>

                            {/* Add the Meeting Button */}
                            <MeetingButton
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              //label="Start Virtual Consultation"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="hover:border-primary focus:border-primary transition-colors duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="hover:border-primary focus:border-primary transition-colors duration-300"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            disabled
                            className="opacity-70"
                          />
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
                            className="hover:border-primary focus:border-primary transition-colors duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialty">Specialty</Label>
                          <Select
                            value={formData.specialty}
                            onValueChange={(value) => handleSelectChange("specialty", value)}
                          >
                            <SelectTrigger className="hover:border-primary focus:border-primary transition-colors duration-300">
                              <SelectValue placeholder="Select specialty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiology">Cardiology</SelectItem>
                              <SelectItem value="dermatology">Dermatology</SelectItem>
                              <SelectItem value="endocrinology">Endocrinology</SelectItem>
                              <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                              <SelectItem value="neurology">Neurology</SelectItem>
                              <SelectItem value="oncology">Oncology</SelectItem>
                              <SelectItem value="pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="psychiatry">Psychiatry</SelectItem>
                              <SelectItem value="surgery">Surgery</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hospital">Hospital/Clinic</Label>
                          <Input
                            id="hospital"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleChange}
                            placeholder="Hospital or clinic name"
                            className="hover:border-primary focus:border-primary transition-colors duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Professional Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Brief professional background and expertise"
                            rows={4}
                            className="hover:border-primary focus:border-primary transition-colors duration-300"
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleLogout}
                            className="dashboard-button hover-glow"
                          >
                            Log out
                          </Button>
                          <Button
                            type="submit"
                            className="dashboard-button hover-glow glow-border"
                            disabled={isLoading}
                          >
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
                  <Card className="dashboard-card floating animate-in scale-on-hover">
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how the dashboard looks and feels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <span className="text-sm text-muted-foreground">Switch between light and dark mode</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label>Colorblind Mode</Label>
                          <p className="text-sm text-muted-foreground mb-4">
                            Select a color scheme optimized for your type of color vision
                          </p>
                          <ColorblindModeSelector value={colorblindMode} onChange={setColorblindMode} />

                          <div className="mt-4 flex justify-end">
                            <Button
                              onClick={() => {
                                localStorage.setItem("colorblindMode", colorblindMode)
                                toast({
                                  title: "Appearance updated",
                                  description: "Your color settings have been saved.",
                                })
                              }}
                              className="dashboard-button hover-glow"
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Save Appearance Settings
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="dashboard-card floating-slow animate-in scale-on-hover">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications and alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Configure how and when you receive notifications about patients, appointments, and updates.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Appointment Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about scheduled appointments
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              SMS
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              Push
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Patient Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Get notified when patients update their information
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              SMS
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              Push
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Medical Record Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive alerts when medical records are updated
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              Email
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              SMS
                            </Button>
                            <Button variant="outline" size="sm" className="dashboard-button hover-glow">
                              Push
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="dashboard-card floating animate-in scale-on-hover">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your password and account security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            className="hover:border-primary focus:border-primary transition-colors duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            className="hover:border-primary focus:border-primary transition-colors duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            className="hover:border-primary focus:border-primary transition-colors duration-300"
                          />
                        </div>

                        <Button className="dashboard-button hover-glow glow-border">Update Password</Button>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Add an extra layer of security to your account
                          </p>
                          <Button variant="outline" className="dashboard-button hover-glow">
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

