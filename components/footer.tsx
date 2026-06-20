'use client'

import Link from 'next/link'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { TextHoverEffect } from './ui/text-hover-effect'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm md:hidden" />
      <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-8">
        <div className="grid gap-16 md:grid-cols-[1.2fr_1.8fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img src="image/Paulo.png" className="w-14 h-14 md:w-16 md:h-16 rounded-full" />
              <span className="font-bold text-2xl md:text-3xl text-foreground">
                Paulo<span className="text-accent">Victor</span>
              </span>
            </div>

            <p className="text-sm md:text-base text-foreground max-w-sm leading-relaxed">
              Desenvolvedor Front-end apaixonado por transformar ideias em interfaces
              modernas e funcionais. Sempre em busca de aprender e construir soluções
              que façam a diferença.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-sm md:text-base">
            <div className="flex flex-col gap-5">
              <span className="font-semibold text-foreground">
                Seções
              </span>

              <div className="flex gap-8">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Sobre mim", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Projetos", href: "#projetos" },
                  { label: "Experiencia", href: "#experiencia" },
                  { label: "Contato", href: "#contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground/80 hover:text-accent transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>


          </div>

          <div className="flex flex-col gap-6">
            <span className="font-semibold text-foreground">
              Conecte-se
            </span>

            <div className="flex gap-4">
              <a
                href="https://github.com/PauloVictoSantos"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/5 hover:bg-black/20 transition"
              >
                <Github size={18} className="text-foreground" />
              </a>

              <a
                href="https://www.linkedin.com/in/paulovictorcs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/5 hover:bg-[#0A66C2]/20 transition"
              >
                <Linkedin size={18} className="text-[#0A66C2]" />
              </a>

              <a
                href="mailto:seuemail@email.com"
                className="p-3 rounded-xl bg-black/5 hover:bg-[#EA4335]/20 transition"
              >
                <Mail size={18} className="text-[#EA4335]" />
              </a>
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-black/10 dark:bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/70">
          <p>© {new Date().getFullYear()}</p>
          <p>
            Desenvolvido por <span className="text-accent">Paulo Victor</span>
          </p>
        </div>

        <div className="flex items-center justify-center opacity-60">
          <TextHoverEffect text="Portfolio" />
        </div>
      </div>
    </footer>
  )
}