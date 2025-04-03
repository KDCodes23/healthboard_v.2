import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/contexts/user-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Health Horizon",
  description: "Monitor your health metrics and manage your care",
  generator: "v0.dev",
  icons: {
    icon: "/Icon.ico",
  },
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <div className="relative min-h-screen">{children}</div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'