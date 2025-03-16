"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface AnimatedBall {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const balls = useRef<AnimatedBall[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create initial balls with theme-appropriate colors
    const isDark = theme === "dark"

    // Clear existing balls when theme changes
    balls.current = []

    // Colors based on theme
    const colors = isDark
      ? ["#4dff7c", "#a7e8d0", "#2d4f5c"] // Dark mode colors
      : ["#4dff7c", "#a7e8d0", "#1a2b34"] // Light mode colors

    // Create more balls to cover the entire viewport
    const ballCount = Math.max(20, Math.floor((window.innerWidth * window.innerHeight) / 40000))

    for (let i = 0; i < ballCount; i++) {
      const size = Math.random() * 100 + 50
      balls.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.2 + 0.05,
      })
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw balls
      balls.current.forEach((ball) => {
        // Update position
        ball.x += ball.speedX
        ball.y += ball.speedY

        // Bounce off walls
        if (ball.x < -ball.size) ball.x = canvas.width + ball.size
        if (ball.x > canvas.width + ball.size) ball.x = -ball.size
        if (ball.y < -ball.size) ball.y = canvas.height + ball.size
        if (ball.y > canvas.height + ball.size) ball.y = -ball.size

        // Draw ball
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
        ctx.fillStyle = ball.color
        ctx.globalAlpha = ball.opacity
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [theme]) // Re-run when theme changes

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none w-full h-full" aria-hidden="true" />
}

