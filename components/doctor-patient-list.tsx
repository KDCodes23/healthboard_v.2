"use client"

import { useState } from "react"
import { MoreHorizontal, Search, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DoctorPatientList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample patient data
  const patients = [
    {
      id: "P-1001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      condition: "Hypertension",
      lastVisit: "May 10, 2024",
      nextVisit: "June 15, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1002",
      name: "Emily Johnson",
      age: 32,
      gender: "Female",
      condition: "Diabetes Type 2",
      lastVisit: "May 15, 2024",
      nextVisit: "July 3, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1003",
      name: "Michael Chen",
      age: 58,
      gender: "Male",
      condition: "Coronary Artery Disease",
      lastVisit: "May 22, 2024",
      nextVisit: "June 22, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1004",
      name: "Sarah Williams",
      age: 29,
      gender: "Female",
      condition: "Asthma",
      lastVisit: "April 30, 2024",
      nextVisit: "July 15, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1005",
      name: "David Rodriguez",
      age: 41,
      gender: "Male",
      condition: "Arthritis",
      lastVisit: "May 5, 2024",
      nextVisit: "August 5, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1006",
      name: "Jennifer Lee",
      age: 36,
      gender: "Female",
      condition: "Migraine",
      lastVisit: "May 18, 2024",
      nextVisit: "June 30, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1007",
      name: "Robert Thompson",
      age: 62,
      gender: "Male",
      condition: "COPD",
      lastVisit: "May 20, 2024",
      nextVisit: "June 18, 2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="dashboard-card floating-slow">
      <CardHeader>
        <CardTitle>Patient List</CardTitle>
        <CardDescription>View and manage your patients</CardDescription>
        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="dashboard-button">
            <User className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Next Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-muted-foreground">{patient.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>
                  <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 w-fit">
                    {patient.condition}
                  </div>
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.nextVisit}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="dashboard-button">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>View Medical Records</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

