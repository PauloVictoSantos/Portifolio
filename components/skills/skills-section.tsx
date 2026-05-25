import PhoneMockup from './PhoneMockup'
import PhoneContent from './Phone'
import { FlipWords } from '../ui/flip-words'
import { LinkPreview } from "../ui/link-preview"
import { Button } from "../ui/button"
import { Spotlight } from "../ui/spotlight"
import { Highlight } from "../ui/hero-highlight"
import { CheckCircle2 } from "lucide-react"

export default function SkillsSection() {
  const words = ["interfaces", "projetos", "sistemas", "aplicações", "produtos"]

  return (
    <section
      id='skills'
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-background"
    >
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col" style={{ gap: 0 }}>
          <div className="mb-5">
            <h1
              className="text-7xl font-black leading-[1.05] tracking-tight"
            >
              Skills
            </h1>
            <h1 className="text-7xl font-black leading-[1.05] tracking-tight">
              <FlipWords words={words} />
            </h1>
            <p className='mt-10'>
              Estudante de desenvolvimento focado em frontend. Trabalho com React, Next.js e TypeScript para construir interfaces que fazem sentido — visuais, acessíveis e bem estruturadas.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Button className="rounded-full px-7 font-bold text-[14px] shadow-md">
              Ver Projetos
            </Button>
            <a
              href="#contact"
              className="font-semibold text-[14px] underline underline-offset-4"
            >
              Fale Comigo
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneMockup>
            <PhoneContent />
          </PhoneMockup>
        </div>
      </div>
    </section>
  )
}