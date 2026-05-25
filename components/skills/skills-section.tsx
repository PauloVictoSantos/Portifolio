import { Code } from "lucide-react"
import PhoneMockup from './PhoneMockup'
import PhoneContent from './Phone'
import { FlipWords } from '../ui/flip-words'
import { LinkPreview } from "../ui/link-preview"
import { Button } from "../ui/button"

export default function SkillsSection() {
  const words = ["interfaces", "projetos", "sistemas", "aplicações"]

  return (
    <section id='skills' className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Texto */}
        <div className="space-y-6 z-10">

          {/* Badge minimalista */}
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-neutral-300 dark:bg-neutral-700" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-400">
              habilidades
            </span>
          </div>

          {/* Título */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-serif font-normal leading-[1.1] tracking-tight">
              Eu desenvolvo
            </h1>
            <h1 className="text-5xl lg:text-6xl font-serif font-normal leading-[1.1] tracking-tight text-neutral-500 dark:text-neutral-400">
              <FlipWords words={words} />
            </h1>
          </div>

          {/* Divisor */}
          <div className="w-8 h-px bg-neutral-200 dark:bg-neutral-800" />

          {/* Parágrafos */}
          <div className="space-y-4 max-w-md">
            <p className="text-[15px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
              Crio interfaces com{" "}
              <LinkPreview url="https://react.dev" className="font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700">
                React
              </LinkPreview>{" "}
              e{" "}
              <LinkPreview url="https://nextjs.org" className="font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700">
                Next.js
              </LinkPreview>,{" "}
              focando em organização de código e boa experiência visual.
            </p>

            <p className="text-[15px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
              Desenvolvo lógica em{" "}
              <LinkPreview url="https://en.wikipedia.org/wiki/C_(programming_language)" className="font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700">
                C
              </LinkPreview>{" "}
              — estruturas de dados, memória, funcionamento interno dos programas.
            </p>

            <p className="text-[15px] font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
              Construo projetos continuamente para aplicar o que aprendo e evoluir como desenvolvedor.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <Button className="rounded-full px-6 text-[13px]">
              Ver Projetos
            </Button>
            <Button variant="outline" className="rounded-full px-6 text-[13px] text-neutral-500">
              Fale Comigo
            </Button>
          </div>
        </div>

        <div className="flex  justify-center lg:justify-end">
          <PhoneMockup>
            <PhoneContent />
          </PhoneMockup>
        </div>
      </div>
    </section>
  )
}