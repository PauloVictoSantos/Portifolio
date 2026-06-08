"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, MapPin, ArrowUpRight, Sparkles } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

type Experience = {
  role: string
  company: string
  period: string
  location: string
  description: string
  skills: string[]
  highlight: string
}

const experiences: Experience[] = [
  {
    role: "Desenvolvedor Front-end Sênior",
    company: "Acme Tecnologia",
    period: "2023 — Presente",
    location: "São Paulo, Brasil · Remoto",
    description:
      "Liderança técnica no desenvolvimento de produtos web com React e Next.js, criando interfaces acessíveis e performáticas para mais de 100 mil usuários.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    highlight: "+100k usuários impactados",
  },
  {
    role: "Desenvolvedor Front-end Pleno",
    company: "Studio Digital",
    period: "2021 — 2023",
    location: "Rio de Janeiro, Brasil",
    description:
      "Desenvolvimento de aplicações SaaS do zero, colaborando com designers e back-end para entregar features de alto impacto em ciclos ágeis.",
    skills: ["React", "JavaScript", "Node.js", "Figma"],
    highlight: "12 produtos entregues",
  },
  {
    role: "Desenvolvedor Web Júnior",
    company: "Agência Criativa",
    period: "2019 — 2021",
    location: "Belo Horizonte, Brasil",
    description:
      "Construção de sites institucionais e landing pages responsivas, com foco em SEO, performance e boas práticas de código.",
    skills: ["HTML", "CSS", "JavaScript", "WordPress"],
    highlight: "40+ sites publicados",
  },
]

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    function handleScroll() {
      const el = timelineRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const start = viewportH * 0.8
      const total = rect.height + start - viewportH * 0.2
      const scrolled = start - rect.top
      const ratio = Math.min(Math.max(scrolled / total, 0), 1)
      setProgress(ratio)
    }

    if (prefersReducedMotion) {
      setProgress(1)
      return
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <section
      id="experiencia"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto w-full px-6">
        <ScrollReveal
          blur
          className="mb-16 flex flex-col items-start gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            Trajetória
          </span>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Experiência profissional
          </h2>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Uma linha do tempo das posições que ocupei e dos projetos em que
            deixei minha marca ao longo da carreira.
          </p>
        </ScrollReveal>

        <div ref={timelineRef} className="relative">
          {/* Trilho da timeline */}
          <div className="absolute left-0 top-2 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {/* Progresso preenchido */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 w-px origin-top bg-foreground transition-[height] duration-150 ease-out md:left-1/2 md:-translate-x-1/2"
            style={{ height: `${progress * 100}%` }}
          />

          <ol className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              return (
                <li
                  key={index}
                  className={cn(
                    "relative pl-10 md:w-1/2 md:pl-0",
                    isLeft
                      ? "md:self-start md:pr-12 md:text-right"
                      : "md:self-end md:pl-12",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-2 z-10 flex size-7 items-center justify-center rounded-full border-2 border-background bg-foreground text-background shadow-lg",
                      "-left-0.75 md:left-auto",
                      isLeft
                        ? "md:right-[-13.5px]"
                        : "md:left-[-13.5px]",
                    )}
                  >
                    <Briefcase className="size-3.5" aria-hidden="true" />
                  </span>

                  <ScrollReveal
                    scale
                    blur
                    direction={isLeft ? "right" : "left"}
                    delay={index * 80}
                  >
                    <article className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl">
                      <div
                        className={cn(
                          "flex flex-wrap items-center gap-2",
                          isLeft && "md:justify-end",
                        )}
                      >
                        <span className="rounded-full bg-foreground px-2.5 py-0.5 font-mono text-xs font-medium text-background">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <time className="text-sm font-medium text-muted-foreground">
                          {exp.period}
                        </time>
                      </div>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                        {exp.role}
                      </h3>

                      <p className="mt-1 text-base font-medium text-foreground">
                        {exp.company}
                      </p>

                      <p
                        className={cn(
                          "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
                          isLeft && "md:justify-end",
                        )}
                      >
                        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                        {exp.location}
                      </p>

                      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>

                      <div
                        className={cn(
                          "mt-4 inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground",
                        )}
                      >
                        <ArrowUpRight
                          className="size-4 text-foreground"
                          aria-hidden="true"
                        />
                        {exp.highlight}
                      </div>

                      <ul
                        className={cn(
                          "mt-4 flex flex-wrap gap-2",
                          isLeft && "md:justify-end",
                        )}
                      >
                        {exp.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors group-hover:border-foreground/20"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </ScrollReveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
