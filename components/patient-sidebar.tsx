"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Calendar, FileText, Home, MessageSquare, Pill, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useUser } from "@/contexts/user-context"
import { useEffect, useState } from "react"

export function PatientSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  const [userName, setUserName] = useState<{ firstName: string; lastName: string } | null>(null)

  useEffect(() => {
    //const userId = localStorage.getItem("userID")
    const patientId = localStorage.getItem('userId');
    if (patientId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/authorize/get-patient/${patientId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserName({
            firstName: data.firstName,
            lastName: data.lastName,
          })
        })
        .catch((error) => console.error("Error fetching user data:", error))
    }
  }, [])

  const navItems = [
    { title: "Dashboard", href: "/dashboard/patient", icon: Home, exact: true },
    { title: "Appointments", href: "/dashboard/patient/appointments", icon: Calendar },
    { title: "Medications", href: "/dashboard/patient/medications", icon: Pill },
    { title: "Health Metrics", href: "/dashboard/patient/metrics", icon: Activity },
    { title: "Medical Records", href: "/dashboard/patient/records", icon: FileText },
    { title: "Chat", href: "/dashboard/patient/doctorchat", icon: MessageSquare },
    { title: "AI Chat", href: "/dashboard/patient/chat", icon: MessageSquare },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2 hover-glow cursor-pointer">
          <div className="rounded-md bg-primary p-2">
            <Activity className="h-6 w-6 text-primary-foreground pulse" />
          </div>
          <div className="text-2xl font-semibold shimmer">Health Horizon</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href, item.exact)}
                    className={`text-lg transition-all duration-300 ${isActive(item.href, item.exact) ? "glow-text" : "hover:translate-x-1"}`}
                  >
                    <Link href={item.href}>
                      <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive(item.href, item.exact) ? "text-primary" : "group-hover:scale-110"}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/patient/settings">
            <Avatar className="hover-glow cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/50">
              <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.firstName || "Patient"} />
              <AvatarFallback>
                {user?.firstName?.[0]}{user?.lastName?.[0] || "JS"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            {/* Render Loading Spinner if userName is not yet fetched */}
            <p className="text-lg font-medium shimmer">
              {userName ? `${userName.firstName} ${userName.lastName}` : "Loading..."}
            </p>
            <p className="text-base text-muted-foreground">Patient</p>
          </div>
          <Link href="/dashboard/patient/settings">
            <Button variant="ghost" size="icon" className="hover-glow hover:bg-primary/10 transition-all duration-300">
              <Settings className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}