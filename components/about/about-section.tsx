"use client"

import type React from "react"
import { Info, Star, MapPin, GraduationCap, FileText, Github, Linkedin } from "lucide-react"
import { TooltipCard } from "@/components/ui/tooltip-card"
import { LinkPreview } from "@/components/ui/link-preview"
import { motion, useInView } from "motion/react"
import { useRef} from "react"

function FloatingCard({
  children,
  delay = 0,
  className,
  float = true,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  float?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {float ? (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

function ProfileCard({
  name,
  role,
  rating,
  delay,
  live = false,
}: {
  name: string
  role: string
  rating: number
  delay: number
  live?: boolean
}) {
  return (
    <FloatingCard delay={delay} className="w-full">
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-card/80 px-3.5 py-2.5 shadow-lg backdrop-blur-md"
      >
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-violet-300/50">
          <img src="/image/Paulo.png" className="h-full w-full object-cover" alt={`Avatar de ${name}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-1.5">
            <p className="truncate text-[11px] font-semibold text-foreground">{name}</p>
            {live && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-600 dark:bg-emerald-500/20">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                LIVE
              </span>
            )}
          </div>
          <p className="mb-1 truncate text-[9px] text-muted-foreground">{role}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-2 w-2 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </FloatingCard>
  )
}

function StackCard({ delay }: { delay: number }) {
  const stack = [
    { color: "#7c3aed", label: "React & Next.js" },
    { color: "#3b82f6", label: "TypeScript" },
    { color: "#10b981", label: "Node.js" },
  ]
  return (
    <FloatingCard delay={delay} className="w-full">
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="space-y-2 rounded-2xl border border-border/60 bg-card/80 px-3.5 py-3 shadow-lg backdrop-blur-md"
      >
        <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Tech Stack</p>
        {stack.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
            <span className="text-[10px] font-medium text-foreground">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </FloatingCard>
  )
}

function CTAButtons() {
  const buttons = [
    {
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/paulo-victor-8b05133a0",
      primary: true,
    },
    {
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/PauloVictoSantos",
      primary: false,
    },
    {
      label: "Currículo",
      icon: <FileText className="h-4 w-4" />,
      href: "/curriculo.pdf",
      primary: false,
    },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((btn, i) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target={btn.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${btn.primary
              ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-700"
              : "border border-border bg-card text-foreground shadow-sm hover:bg-accent"
            }`}
        >
          {btn.icon}
          {btn.label}
        </motion.a>
      ))}
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-16 sm:py-20"
    >
      <div className="relative grid w-full max-w-8xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <motion.div
          ref={ref}
          className="order-2 space-y-6 text-center lg:order-1 lg:text-left"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={item} className="relative inline-block">
            <h1 className="text-balance text-4xl font-black leading-tight text-foreground md:text-5xl ">
              Olá, meu nome é Paulo Victor
            </h1>
            <TooltipCard
              containerClassName="absolute -right-6 top-1 cursor-pointer hidden sm:inline-flex"
              content={
                <div className="text-sm">
                  <p className="mb-1 font-semibold">Sobre esta seção:</p>
                  <p>Aqui apresento minha trajetória, formação e objetivos como desenvolvedor.</p>
                </div>
              }
            >
              <Info className="h-4 w-4 text-accent transition" />
            </TooltipCard>
          </motion.div>

          <motion.h2 variants={item} className="text-semibold leading-snug text-foreground lg:text-lg">
            Desenvolvedor{" "}
            <LinkPreview url="https://react.dev" className="text-accent">
              Front-end
            </LinkPreview>
          </motion.h2>

          <motion.div variants={item} className="flex flex-col items-center gap-1.5 lg:items-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 shrink-0 text-foreground/70" />
              <span>
                Engenharia da Computação · Técnico em{" "}
                <LinkPreview url="https://www2.ifam.edu.br/campus/cprf" className="text-foreground hover:text-accent">
                  IFAM
                </LinkPreview>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-red-500" />
              <span>Manaus, AM · 21 anos</span>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Minha trajetória começou no{" "}
              <LinkPreview url="https://www.ifam.edu.br" className="text-foreground">
                IFAM
              </LinkPreview>
              , onde me formei Técnico em Desenvolvimento de Sistemas — foi lá que aprendi que programar é resolver
              problemas reais, não só escrever código que compila.
            </p>
            <p>
              Hoje curso{" "}
              <LinkPreview
                url="https://pt.wikipedia.org/wiki/Engenharia_da_Computa%C3%A7%C3%A3o"
                className="text-foreground"
              >
                Engenharia da Computação
              </LinkPreview>{" "}
              e já coloquei a mão em produção: estagiei na{" "}
              <LinkPreview url="https://www.embrapa.br" className="text-foreground">
                Embrapa
              </LinkPreview>{" "}
              no Polo Industrial de Manaus, onde entendi o que é entregar software em contexto real.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <CTAButtons />
          </motion.div>
        </motion.div>

        {/* ---------------------------- IMAGE COLUMN --------------------------- */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto hidden max-w-md items-center justify-center lg:flex lg:max-w-none">
            <img
              src="/image/about.png"
              alt="Ilustração de Paulo Victor, desenvolvedor front-end"
              className="w-full max-w-sm select-none lg:max-w-md"
            />
            <div className="absolute left-0 top-1/2 z-30 hidden w-40 -translate-y-1/2 lg:block">
              <StackCard delay={0.7} />
            </div>
            <div className="absolute bottom-24 right-0 z-30 hidden w-44 lg:block">
              <ProfileCard name="Paulo Victor" role="Full-Stack Developer" rating={5} delay={0.8} live />
            </div>
            <div className="absolute bottom-4 left-0 z-30 hidden w-44 lg:block">
              <ProfileCard name="Open to Work" role="Software Engineer" rating={5} delay={0.9} />
            </div>

            {/* decorative dots */}
            {[
              { top: "11%", left: "14%", size: 9, color: "#7c3aed" },
              { top: "72%", right: "6%", size: 7, color: "#3b82f6" },
              { top: "58%", left: "2%", size: 5, color: "#fbbf24" },
              { top: "28%", right: "20%", size: 5, color: "#10b981" },
            ].map((dot, i) => (
              <motion.div
                key={i}
                aria-hidden
                className="pointer-events-none absolute hidden rounded-full lg:block"
                style={{
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  top: dot.top,
                  left: (dot as any).left,
                  right: (dot as any).right,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.05 + i * 0.08 }}
              />
            ))}
          </div>

          {/* floating cards — mobile / tablet grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:hidden">
            <StackCard delay={0.2} />
            <ProfileCard name="Paulo Victor" role="Full-Stack Developer" rating={5} delay={0.4} live />
            <ProfileCard name="Open to Work" role="Software Engineer" rating={5} delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  )
}
