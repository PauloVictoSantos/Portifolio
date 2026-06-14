import { ArrowDown, Download, FileDown, Github, Linkedin, SaveIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { WordRotate } from "./WordRotate";
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-8xl p-6">
        <h1 className="mt-8 font-display text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          <Reveal as="span" className="block">Frontend</Reveal>
          <Reveal as="span" delay={100} className="block italic text-muted-foreground">
            developer
          </Reveal>
          <Reveal as="span" delay={200} className="block">
            que constrói com
          </Reveal>
          <Reveal as="span" delay={300} className="block">
            <span className="relative inline-block">
              <WordRotate
                words={["cuidado.", "ritmo.", "precisão.", "alma."]}
                className="h-[1.05em]"
              />
              <span className="ml-2 inline-block h-[0.8em] w-[0.08em] translate-y-1 bg-primary animate-blink align-middle" />
            </span>
          </Reveal>
        </h1>

        <div className="mt-14 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <Reveal delay={400} className="md:col-span-5">
            <p className="text-lg text-muted-foreground">
              Léo Martins — seis anos transformando produtos digitais em
              experiências cuidadosas. Disponível para projetos selecionados em 2025.
            </p>
          </Reveal>

          <Reveal delay={500} className="md:col-span-4 md:col-start-9 flex gap-5 items-center ">
            <a
              href="#work"
              data-cursor-hover
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-all hover:gap-5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15">
                <ArrowDown className="h-3 w-3 transition-transform duration-500 group-hover:translate-y-0.5" />
              </span>
              Explorar trabalhos
            </a>

            <div className="flex gap-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon-lg">
                    <Linkedin />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Linkedin
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon-lg">
                    <Github />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                Github
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon-lg">
                    <FileDown />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Curriculo
                </TooltipContent>
              </Tooltip>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
