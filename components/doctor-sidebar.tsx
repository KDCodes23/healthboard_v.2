"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Calendar, FileText, Home, MessageSquare, Settings, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * DoctorSidebar Component
 *
 * This component renders the sidebar navigation for the doctor view.
 * It includes links to different sections of the doctor dashboard.
 */
export function DoctorSidebar() {
  const pathname = usePathname()

  // Navigation items for the doctor sidebar
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard/doctor",
      icon: Home,
      exact: true,
    },
    {
      title: "Patients",
      href: "/dashboard/doctor/patients",
      icon: Users,
    },
    {
      title: "Appointments",
      href: "/dashboard/doctor/appointments",
      icon: Calendar,
    },
    {
      title: "Medical Records",
      href: "/dashboard/doctor/records",
      icon: FileText,
    },
    {
      title: "Messages",
      href: "/dashboard/doctor/messages",
      icon: MessageSquare,
    },
  ]

  // Check if a navigation item is active
  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <Sidebar>
      {/* Sidebar Header with Logo and Title */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-2">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-2xl font-semibold">Health Horizon</div>
        </div>
      </SidebarHeader>

      {/* Main Navigation Menu */}
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
                    className="text-lg" // Increased text size
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with Doctor Profile */}
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Doctor" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-lg font-medium">Dr. Sarah Johnson</p>
            <p className="text-base text-muted-foreground">Physician</p>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

