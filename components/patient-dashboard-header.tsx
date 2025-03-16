"use client"

import Link from "next/link"
import { Bell, Menu, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function PatientDashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/dashboard/patient" className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">HealthTrack</span>
            </Link>
            <Link href="/dashboard/patient" className="flex items-center gap-2 text-muted-foreground">
              Dashboard
            </Link>
            <Link href="/dashboard/patient?tab=appointments" className="flex items-center gap-2 text-muted-foreground">
              Appointments
            </Link>
            <Link href="/dashboard/patient?tab=medications" className="flex items-center gap-2 text-muted-foreground">
              Medications
            </Link>
            <Link href="/dashboard/patient?tab=records" className="flex items-center gap-2 text-muted-foreground">
              Medical Records
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/dashboard/patient" className="flex items-center gap-2 font-semibold">
        <span className="hidden md:inline-block">HealthTrack</span>
      </Link>
      <nav className="hidden flex-1 items-center gap-6 md:flex">
        <Link
          href="/dashboard/patient"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/patient?tab=appointments"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Appointments
        </Link>
        <Link
          href="/dashboard/patient?tab=medications"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Medications
        </Link>
        <Link
          href="/dashboard/patient?tab=records"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Medical Records
        </Link>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Patient" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

