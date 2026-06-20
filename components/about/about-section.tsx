"use client"

import type React from "react"
import { Info, Star, MapPin, GraduationCap, FileText, Github, Linkedin } from "lucide-react"
import { TooltipCard } from "@/components/ui/tooltip-card"
import { LinkPreview } from "@/components/ui/link-preview"
import { motion, useInView, type Variants } from "motion/react"
import { useRef } from "react"
import { Reveal } from "../Reveal"
import PhoneMockup from './PhoneMockup'
import PhoneContent from './Phone'

function CTAButtons() {
  const buttons = [
    {
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4 text-accent" />,
      href: "https://www.linkedin.com/in/paulovictorcs",
      primary: true,
    },
    {
      label: "GitHub",
      icon: <Github className="h-4 w-4 text-accent" />,
      href: "https://github.com/PauloVictoSantos",
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
            ? "bg-foreground text-background shadow-lg shadow-foreground-600/25 hover:bg-foreground-700"
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

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-16 sm:py-20"
    >
      <div className="relative grid w-full max-w-8xl px-6 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          ref={ref}
          className="order-2 space-y-6 text-center lg:order-1 lg:text-left"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={item} className="relative inline-block">
            <Reveal delay={80}>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
                Um pouco sobre mim e minha trajetória na programação.
              </h2>
            </Reveal>
          </motion.div>

          <motion.h2 variants={item} className="text-semibold leading-snug text-foreground lg:text-lg">
            Desenvolvedor{" "}
            <LinkPreview url="https://en.wikipedia.org/wiki/Front-end_web_development" className="text-accent">
              Front-end
            </LinkPreview>
          </motion.h2>

          <motion.div variants={item} className="flex flex-col items-center gap-1.5 lg:items-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 shrink-0 text-foreground/70" />
              <span>
                Graduando em Engenharia da Computação  {" "}
                <LinkPreview url="https://fametro.edu.br/" className="text-foreground hover:text-accent">
                  Fametro
                </LinkPreview>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 shrink-0 text-foreground/70" />
              <span>
                Técnico em Desevolvimento de Sistema {" "}
                <LinkPreview url="https://www2.ifam.edu.br/campus/cprf" className="text-foreground hover:text-accent">
                  IFAM
                </LinkPreview>
              </span>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Tenho 21 anos, moro em manaus e minha trajetória começou no{" "}
              <LinkPreview url="https://www.ifam.edu.br" className="text-foreground">
                IFAM
              </LinkPreview>
              , onde me formei Técnico em Desenvolvimento de Sistemas. Foi lá, durante o programa Capacitação 4.0
              que estagiei no Polo Industrial de Manaus. Foi nesse ambiente que vivencie na prática metodologias ágeis.
            </p>
            <p>
              Hoje curso{" "}
              <LinkPreview
                url="https://pt.wikipedia.org/wiki/Engenharia_da_Computa%C3%A7%C3%A3o"
                className="text-foreground"
              >
                Engenharia da Computação
              </LinkPreview>{" "}
              na {" "}
              <LinkPreview url="https://fametro.edu.br/" className="text-foreground hover:text-accent">
                Fametro
              </LinkPreview>
              e dedico meus esforços para dominar o desenvolvimento Full Stack. Crio interfaces modernas e, ao mesmo tempo exploro a lógica e os banco de dados do back-end.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <CTAButtons />
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup>
              <PhoneContent />
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  )
}
