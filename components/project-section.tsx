"use client"

import { useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { projects, techMap } from "@/data/project"

type TechKey = keyof typeof techMap

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
}

const TECHS = ["Next.js","React","TypeScript","Tailwind","Framer Motion","Prisma","C lang","PostgreSQL","Node.js"]
const LABELS = ["Web App", "Algoritmos", "Full Stack"]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const iframeVariants: Variants = {
  hidden: { scale: 1.04 },
  visible: {
    scale: 1,
    transition: { duration: 7, ease: "easeOut" as const },
  },
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-12%" })
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl border border-[#161616] overflow-hidden ${
        isReversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative overflow-hidden  min-h-130 lg:min-h-150">
          <iframe
            src={project.site}
            className="w-full h-full border-none"
            loading="lazy"
            title={project.title}
            // pointer-events ativo = scroll funciona dentro do iframe
          />
+
        {/* Overlay leve só nas bordas, sem bloquear cliques */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 15%, transparent 80%, rgba(8,8,8,0.6) 100%)",
          }}
        />

        {/* Ghost number */}
        <span
          className="absolute bottom-4 left-5 text-[6rem] font-extrabold leading-none select-none pointer-events-none z-10"
          style={{ color: "rgba(74,222,128,0.07)", letterSpacing: "-0.06em" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Category badge */}
        <Badge
          variant="outline"
          className="absolute top-4 left-4 z-10 pointer-events-none text-green-400 border-green-400/25 bg-green-400/10 text-[10px] tracking-widest uppercase font-medium"
        >
          {LABELS[index] ?? "Projeto"}
        </Badge>
      </div>

      {/* Info */}
      <div
        className={`flex flex-col justify-center gap-5 px-8 py-14 border-[#161616] ${
          isReversed ? "lg:border-r" : "lg:border-l"
        }`}
      >
        <span className="text-[11px] tracking-widest uppercase text-[#272727] font-medium">
          Projeto {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>

        <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold tracking-tight leading-[1.08]">
          {project.title}
        </h2>

        <span className="text-[11px] tracking-wider text-gray-600">
          {formatDate(project.createdAt)}
        </span>

        <Separator className="bg-green-400/30 w-8" />

        <p className="text-[13px] leading-[1.85] text-gray-500 font-light max-w-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((key: string) => (
            <Badge
              key={key}
              variant="outline"
              className="text-[10px] tracking-wider uppercase text-gray-600 border-[#1e1e1e] bg-[#0a0a0a] rounded-md"
            >
              {(techMap as Record<string, { name: string }>)[key]?.name ?? key}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 items-center pt-1">
          <Button
            asChild
            className="bg-green-400 text-[#080808] hover:bg-green-300 text-[11px] font-bold tracking-widest uppercase rounded-xl h-10 px-5 transition-all hover:-translate-y-0.5"
          >
            <a href={project.site} target="_blank" rel="noopener noreferrer">
              Ver projeto <ArrowUpRight size={13} className="ml-1" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-[#1e1e1e] bg-transparent text-gray-500 hover:border-green-400/50 hover:text-green-400 hover:bg-transparent text-[11px] font-bold tracking-widest uppercase rounded-xl h-10 px-5 transition-all hover:-translate-y-0.5"
          >
            <a href={project.code} target="_blank" rel="noopener noreferrer">
              <Github size={14} className="mr-1.5" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectSection() {
  return (
    <section id="projetos" className="w-full pb-20">
      <div className="w-full">

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="px-8 md:px-14 pt-20 pb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse" />
            <span className="text-[11px] tracking-[.18em] uppercase text-green-400 font-medium">
              projetos selecionados
            </span>
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,3.4rem)] font-extrabold leading-[.95] tracking-tight mb-4">
            Experiência em<br />
            <span className="text-green-400">desenvolvimento</span>
          </h1>
          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
            Cada projeto resolveu um problema real — arquitetura limpa,
            código que escala e interfaces que impressionam.
          </p>
        </motion.header>

        <div className="flex flex-col gap-24 px-8 md:px-14 py-16">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <div className="px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="grid grid-cols-3 border border-[#161616] rounded-2xl overflow-hidden"
          >
            {[
              { n: projects.length, label: "projetos" },
              { n: 9, label: "tecnologias" },
              { n: "142+", label: "commits" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0d0d0d] py-8 px-7 border-r last:border-r-0 border-[#161616]">
                <div className="text-[2.6rem] font-extrabold tracking-[-0.04em] leading-none">
                  {s.n}{i === 2 && <span className="text-green-400"></span>}
                </div>
                <div className="text-[10px] tracking-widest uppercase text-gray-700 mt-2">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}