"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMouseMoving = useRef(false)

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

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      isMouseMoving.current = true

      // Create particles on mouse move
      for (let i = 0; i < 2; i++) {
        createParticle(e.clientX, e.clientY)
      }

      // Reset mouse moving after a delay
      setTimeout(() => {
        isMouseMoving.current = false
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create a particle
    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 5 + 1
      const maxLife = Math.random() * 60 + 60 // frames

      particles.current.push({
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: "#4dff7c",
        opacity: Math.random() * 0.5 + 0.5,
        life: 0,
        maxLife,
      })
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update life
        particle.life++

        // Calculate opacity based on life
        particle.opacity = 1 - particle.life / particle.maxLife

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particles.current.splice(index, 1)
        }
      })

      // Create random particles occasionally
      if (Math.random() < 0.05) {
        createParticle(Math.random() * canvas.width, Math.random() * canvas.height)
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-5 pointer-events-none" aria-hidden="true" />
}

