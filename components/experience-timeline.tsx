"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion"
import { MdWork } from "react-icons/md"
import SectionBadge from "./ui/SectionBadge"

interface Experience {
  id: number
  role: string
  company: string
  period: string
  description: string
  tags?: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Trainee em Inovação",
    company: "IFAM / EMBRAPII – Capacitação 4.0",
    period: "Dez 2022 – Nov 2023",
    description:
      "Participação no projeto de inovação tecnológica Capacitação 4.0, atuando no apoio ao desenvolvimento de soluções tecnológicas e atividades de pesquisa aplicada. Colaboração no desenvolvimento de sistemas e ferramentas digitais, realização de testes, suporte técnico e participação em iniciativas educacionais voltadas à formação tecnológica e inovação.",
    tags: ["Inovação", "Pesquisa Aplicada", "Suporte Técnico"],
  },
  {
    id: 2,
    role: "Desenvolvedor Full Stack Jr.",
    company: "Agência Digital Criativa",
    period: "Jan 2024 – Dez 2024",
    description:
      "Desenvolvimento de aplicações web completas utilizando React, Next.js e Node.js. Responsável pela criação de interfaces responsivas, integração com APIs RESTful, implementação de autenticação e otimização de performance em projetos para clientes de médio e grande porte.",
    tags: ["React", "Next.js", "Node.js", "API REST"],
  },
  {
    id: 3,
    role: "Assistente Fiscal Tributário",
    company: "Prefeitura Municipal – Setor de Tributos",
    period: "2025 – Atual",
    description:
      "Atuação no suporte e desenvolvimento de soluções tecnológicas para o setor de tributos da prefeitura. Responsável por auxiliar na manutenção de sistemas administrativos, análise de dados e melhoria de processos digitais relacionados à gestão tributária.",
    tags: ["Gestão Tributária", "Análise de Dados", "Sistemas Admin"],
  },
]

function ExperienceItem({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0"
    >
      {/* LEFT SIDE */}
      <motion.div
        className="flex flex-col justify-center md:pr-14 md:text-right"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.75,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-balance leading-snug">
          {experience.role}
        </h3>
        <span className="text-sm font-medium mt-1.5 block opacity-60">
          {experience.company}
        </span>

        {/* Tags — desktop only, on the left */}
        <div className="hidden md:flex flex-wrap gap-2 mt-4 justify-end">
          {experience.tags?.map((tag) => (
            <motion.span
              key={tag}
              className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-current opacity-40"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 0.4, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* CENTER — period + animated dot */}
      <motion.div
        className="hidden md:flex flex-col items-center justify-center w-36 relative z-10"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.55,
          delay: index * 0.15 + 0.2,
          type: "spring",
          stiffness: 160,
          damping: 18,
        }}
      >
        {/* Static node on the line */}
        <div className="relative flex items-center justify-center mb-3">
          {/* Outer pulse ring */}
          <motion.div
            className="absolute rounded-full border border-blue-500/30"
            style={{ width: 32, height: 32 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          />
          {/* Mid ring */}
          <motion.div
            className="absolute rounded-full border border-blue-500/20"
            style={{ width: 22, height: 22 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.4 + 0.3,
            }}
          />
          {/* Core dot */}
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        </div>

        <span className="text-[11px] font-semibold tracking-wider uppercase text-center leading-tight whitespace-nowrap opacity-60">
          {experience.period}
        </span>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="flex items-start md:pl-14"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.75,
          delay: index * 0.15 + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div>
          {/* Mobile: period pill */}
          <div className="md:hidden inline-flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold tracking-widest uppercase opacity-60">
              {experience.period}
            </span>
          </div>

          <p className="text-sm md:text-[15px] leading-relaxed opacity-80">
            {experience.description}
          </p>

          {/* Tags — mobile only, below description */}
          <div className="flex md:hidden flex-wrap gap-2 mt-4">
            {experience.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-current opacity-40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Animated scroll ball ────────────────────────────────────────── */
function ScrollBall({
  ballTop,
  ballOpacity,
  scrollYProgress,
}: {
  ballTop: MotionValue<string>
  ballOpacity: MotionValue<number>
  scrollYProgress: MotionValue<number>
}) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ top: ballTop, opacity: ballOpacity }}
    >
      {/* Outermost trailing halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 52,
          height: 52,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          border: "1px solid rgba(59,130,246,0.18)",
        }}
        animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Second halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 38,
          height: 38,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          border: "1.5px solid rgba(59,130,246,0.3)",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.35,
        }}
      />

      {/* Inner soft glow ring */}
      <motion.div
        className="absolute rounded-full bg-blue-500/10"
        style={{
          width: 26,
          height: 26,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: 0.15 }}
      />

      {/* Core ball */}
      <div
        className="relative"
        style={{ width: 16, height: 16 }}
      >
        {/* Solid core */}
        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.8),0_0_28px_rgba(59,130,246,0.4)]" />

        {/* Bright centre highlight */}
        <div
          className="absolute rounded-full bg-white/60"
          style={{ width: 6, height: 6, top: 2, left: 2 }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Main component ──────────────────────────────────────────────── */
export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  })

  const progress = useTransform(smoothProgress, [0, 1], [0, 1])
  const ballTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"])
  const ballOpacity = useTransform(
    smoothProgress,
    [0, 0.04, 0.96, 1],
    [0, 1, 1, 0]
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-20 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-20 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-7xl mx-auto space-y-10">
            <SectionBadge
              icon={<MdWork className="h-10 w-10 text-[#60519b]" />}
              text="Experiência"
            />

            <div className="relative w-full max-w-4xl space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Trajetória Profissional
              </h1>

              <p className="text-lg leading-relaxed max-w-2xl opacity-70">
                Experiências que contribuíram para meu crescimento técnico e
                profissional, envolvendo desenvolvimento de aplicações web,
                organização de código, trabalho com diferentes tecnologias e
                foco contínuo em qualidade, performance e boas práticas de
                engenharia de software.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line + scroll ball */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-4"
              viewBox="0 0 16 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Background track */}
              <line
                x1="8"
                y1="0"
                x2="8"
                y2="1000"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.08"
              />
              {/* Animated fill */}
              <motion.line
                x1="8"
                y1="0"
                x2="8"
                y2="1000"
                stroke="rgb(59,130,246)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>

            <ScrollBall
              ballTop={ballTop}
              ballOpacity={ballOpacity}
              scrollYProgress={scrollYProgress}
            />
          </div>

          {/* Items */}
          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}