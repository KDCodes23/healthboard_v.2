"use client"

import type { ReactNode } from "react"
import { AnimatedBackground } from "@/components/animated-background"

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />
      {/* Decorative shapes */}
      <div className="shape-blob shape-blob-1" />
      <div className="shape-blob shape-blob-2" />
      <div className="shape-blob shape-blob-3" />
      <div className="shape-blob shape-blob-4" />

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

