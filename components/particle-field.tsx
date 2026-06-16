"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if (!ctx!) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let animationId = 0
    const pointer = { x: -9999, y: -9999 }

    function resize() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // densidade de partículas baseada na área
      const count = Math.min(70, Math.max(28, Math.floor((width * height) / 9000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    // tom claro, legível sobre o painel escuro
    const color = "#e2e8f0"

    function draw() {
      ctx!!.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // atração suave em direção ao ponteiro
        const dxp = pointer.x - p.x
        const dyp = pointer.y - p.y
        const distP = Math.hypot(dxp, dyp)
        if (distP < 140 && distP > 0) {
          p.vx += (dxp / distP) * 0.015
          p.vy += (dyp / distP) * 0.015
        }

        p.x += p.vx
        p.y += p.vy

        // limita velocidade
        p.vx = Math.max(-0.8, Math.min(0.8, p.vx))
        p.vy = Math.max(-0.8, Math.min(0.8, p.vy))

        // envolve nas bordas
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // desenha partícula
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx!.fillStyle = color
        ctx!.globalAlpha = 0.9
        ctx!.fill()
      }

      // conexões
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = color
            ctx!.globalAlpha = (1 - dist / 120) * 0.35
            ctx!.lineWidth = 1
            ctx!.stroke()
          }
        }
      }
      ctx!.globalAlpha = 1

      animationId = requestAnimationFrame(draw)
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    function handlePointerLeave() {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()

    if (prefersReducedMotion) {
      // desenha um quadro estático
      draw()
      cancelAnimationFrame(animationId)
    } else {
      draw()
    }

    window.addEventListener("resize", resize)
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full"
    />
  )
}
