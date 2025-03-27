"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface CanvasRevealEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string
  revealClassName?: string
  children: React.ReactNode
  revealSize?: number
  revealColor?: string
  revealBlur?: number
  revealOpacity?: number
  revealEasing?: number
  disabled?: boolean
}

export const CanvasRevealEffect = ({
  containerClassName,
  revealClassName,
  children,
  revealSize = 80,
  revealColor = "255, 255, 255",
  revealBlur = 10,
  revealOpacity = 0.1,
  revealEasing = 0.2,
  disabled = false,
  className,
  ...props
}: CanvasRevealEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const animationFrame = useRef<number>(0)
  const currentPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (disabled) return

    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvasContext.current = ctx

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mousePosition.current = { x: -100, y: -100 }
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    const resizeCanvas = () => {
      if (canvas && container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      if (!canvasContext.current) return

      // Ease towards the mouse position
      currentPosition.current.x += (mousePosition.current.x - currentPosition.current.x) * revealEasing
      currentPosition.current.y += (mousePosition.current.y - currentPosition.current.y) * revealEasing

      // Clear the canvas
      canvasContext.current.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the reveal effect
      canvasContext.current.fillStyle = `rgba(${revealColor}, ${revealOpacity})`
      canvasContext.current.filter = `blur(${revealBlur}px)`
      canvasContext.current.beginPath()
      canvasContext.current.arc(currentPosition.current.x, currentPosition.current.y, revealSize, 0, Math.PI * 2)
      canvasContext.current.fill()

      animationFrame.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrame.current)
    }
  }, [revealSize, revealColor, revealBlur, revealOpacity, revealEasing, disabled])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)} {...props}>
      {!disabled && (
        <canvas ref={canvasRef} className={cn("pointer-events-none absolute inset-0 z-10", revealClassName)} />
      )}
      <div className={className}>{children}</div>
    </div>
  )
}

