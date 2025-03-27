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
import { useUser } from "@/contexts/user-context"

/**
 * DoctorSidebar Component
 *
 * This component renders the sidebar navigation for the doctor view.
 * It includes links to different sections of the doctor dashboard.
 */
export function DoctorSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

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
    {
      title: "AI Chat",
      href: "/dashboard/doctor/chat",
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
        <div className="flex items-center gap-2 hover-glow cursor-pointer">
          <div className="rounded-md bg-primary p-2">
            <Activity className="h-6 w-6 text-primary-foreground pulse" />
          </div>
          <div className="text-2xl font-semibold shimmer">Health Horizon</div>
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
                    className={`text-lg transition-all duration-300 ${isActive(item.href, item.exact) ? "glow-text" : "hover:translate-x-1"}`}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={`h-5 w-5 transition-transform duration-300 ${isActive(item.href, item.exact) ? "text-primary" : "group-hover:scale-110"}`}
                      />
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
          <Avatar className="hover-glow cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/50">
            <AvatarImage
              src={user?.avatar || "/placeholder.svg?height=32&width=32"}
              alt={user?.firstName || "Doctor"}
            />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0] || "DR"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-lg font-medium shimmer">
              Dr. {user?.firstName} {user?.lastName || "Sarah Johnson"}
            </p>
            <p className="text-base text-muted-foreground">{user?.specialty || "Physician"}</p>
          </div>
          <Link href="/dashboard/doctor/settings">
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

