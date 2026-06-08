"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Atraso em milissegundos antes da animação começar */
  delay?: number
  /** Direção de onde o elemento surge */
  direction?: "up" | "down" | "left" | "right"
  /** Adiciona um leve efeito de escala na entrada */
  scale?: boolean
  /** Adiciona um leve desfoque na entrada */
  blur?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = false,
  blur = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Respeita a preferência de redução de movimento do usuário
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const hiddenTransform = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  }[direction]

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isVisible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
          : cn(
              "opacity-0",
              hiddenTransform,
              scale && "scale-95",
              blur && "blur-sm",
            ),
        className,
      )}
    >
      {children}
    </div>
  )
}
