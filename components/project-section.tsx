"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion"
import {
  ArrowUpRight, Github, ArrowRight, X,
  ExternalLink, ChevronDown, ChevronLeft, ChevronRight,
  Projector
} from "lucide-react"
import { projects, techMap, type TechKey } from "@/data/project"
import { Button } from "./ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"


const FULL_VISIBLE = 4
const PEEK_HEIGHT = 300

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

function TechBadge({
  techKey,
  size = "md",
}: {
  techKey: TechKey
  size?: "sm" | "md"
}) {
  const tech = techMap[techKey]
  if (!tech) return null
  const Icon = tech.icon
  const colors = tech.color.match(/#([A-Fa-f0-9]{6})/g) || []

  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-foreground transition-colors hover:border-foreground/20 hover:text-foreground">
      <svg width="0" height="0">
        <linearGradient
          id={`gradient-${techKey}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {colors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </svg>

      <Icon
        className="w-3 h-3 shrink-0"
        style={{
          fill: `url(#gradient-${techKey})`,
        }}
      />

      {tech.name}
    </span>
  )
}

function Carousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const total = images.length

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])

  if (!total) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-[10px] uppercase tracking-widest text-foreground">sem preview</span>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden select-none group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`preview ${current + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {total > 1 && (
        <>
          <Button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <Button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-accent" : "w-1.5 bg-accent/40"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function getImages(project: any): string[] {
  if (project.images?.length) return project.images
  if (project.image) return [project.image]
  return []
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  const isReversed = index % 2 !== 0
  const images = getImages(project)

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border bg-card"
    >
      <div className={`relative min-h-72 lg:min-h-110 ${isReversed ? "lg:order-2" : ""}`}>
        <Carousel images={images} />

        <span
          className="absolute bottom-4 left-5 z-10 font-black text-[5rem] leading-none tracking-tighter text-foreground select-none pointer-events-none"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div
        className={`flex flex-col justify-between gap-6 p-8 lg:p-10 ${isReversed ? "lg:border-r border-border" : "lg:border-l border-border"
          }`}
      >
        <div className="flex flex-col gap-5">
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground/50">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>

          <div>
            <h2 className="text-[clamp(1.6rem,2.4vw,2.1rem)] font-black leading-[1.06] tracking-tight text-foreground">
              {project.title}
              <span className="text-primary">.</span>
            </h2>
            <time className="mt-1.5 block text-[11px] tracking-widest text-foreground/50 uppercase">
              {formatDate(project.createdAt)}
            </time>
          </div>

          <div className="h-px w-10 bg-border" />

          <p className="leading-[1.9] text-foreground font-light ">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((key: TechKey) => (
              <TechBadge key={key} techKey={key} size="md" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-5 border-t border-border">
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase text-foreground transition-all duration-200 hover:opacity-80 hover:-translate-y-px"
            >
              Ver projeto <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
            </a>
          )}
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground hover:text-primary underline underline-offset-4 transition-opacity"
          >
            <Github className="w-3.5 h-3.5 text-foreground" /> Código
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectCardCompact({ project, index }: { project: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  const images = getImages(project)

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-2xl overflow-hidden border border-border bg-card group flex flex-col"
    >
      <div className="relative overflow-hidden h-52 shrink-0">
        <Carousel images={images} />
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-base font-black tracking-tight leading-tight text-foreground">
          {project.title}
          <span className="text-primary">.</span>
        </h3>

        <p className="text-[12px] leading-[1.7] text-foreground font-light line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((key: TechKey) => (
            <TechBadge key={key} techKey={key} size="sm" />
          ))}
          {project.tech.length > 5 && (
            <span className="inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border">
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-background bg-primary rounded-full px-3 py-1.5 transition-opacity hover:opacity-70"
            >
              Ver <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            <Github className="w-3 h-3" /> GitHub
          </a>
          <time className="ml-auto text-[10px] tracking-wider text-foreground/40 uppercase">
            {formatDate(project.createdAt)}
          </time>
        </div>
      </div>
    </motion.article>
  )
}



function AllProjectsPage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-8 py-4 backdrop-blur-md md:px-14">
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="inline-block h-2 w-2 rounded-full bg-chart-2"
          />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-foreground">
            todos os projetos
          </span>
          <span className="text-[11px] tracking-widest text-foreground">
            ({projects.length})
          </span>
        </div>
        <Button
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-semibold tracking-wider uppercase text-foreground transition-opacity hover:opacity-70"
        >
          <X className="h-3.5 w-3.5" /> Fechar
        </Button>
      </div>

      <div className="px-8 pb-24 pt-14 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-[1.03] tracking-tight text-foreground">
            Todos os<br />
            <span className="text-primary">projetos.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm font-light leading-[1.8] text-foreground">
            Arquitetura limpa, código que escala e interfaces que impressionam — do conceito ao deploy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCardCompact key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectSection() {
  const [showAll, setShowAll] = useState(false)
  const hasMore = projects.length > FULL_VISIBLE
  const peekIndex = FULL_VISIBLE

  return (
    <>
      <AnimatePresence>
        {showAll && <AllProjectsPage onClose={() => setShowAll(false)} />}
      </AnimatePresence>

      <section id="projetos" className="w-full bg-background pb-16">
          <ScrollReveal
            blur
            className="mb-16 flex flex-col items-start gap-4 px-6"
          >
            <h2 className="text-balance text-7xl font-semibold tracking-tight text-foreground ">
            Meus Projetos
            </h2>
          </ScrollReveal>

        <div className="flex flex-col gap-16 px-8 py-10 md:px-14">
          {projects.map((project, i) => {
            const isPeek = hasMore && i === peekIndex
            const isHidden = hasMore && i > peekIndex
            if (isHidden) return null

            if (isPeek) {
              return (
                <div key={i} className="relative">
                  <div className="overflow-hidden rounded-2xl" style={{ maxHeight: PEEK_HEIGHT }}>
                    <ProjectCard project={project} index={i} />
                  </div>

                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl"
                    style={{
                      height: PEEK_HEIGHT,
                      background: "linear-gradient(to bottom, transparent 0%, var(--background) 78%)",
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end gap-3 pb-8">
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground">
                      +{projects.length - FULL_VISIBLE} projetos restantes
                    </p>
                    <motion.button
                      onClick={() => setShowAll(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[11px] font-bold tracking-wider uppercase text-foreground transition-opacity hover:opacity-80"
                    >
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                      Ver todos os projetos
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              )
            }

            return <ProjectCard key={i} project={project} index={i} />
          })}
        </div>
      </section>
    </>
  )
}