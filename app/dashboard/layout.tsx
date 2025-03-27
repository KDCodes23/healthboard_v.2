import type React from "react"
import { UserProvider } from "@/contexts/user-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  )
}

