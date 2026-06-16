import { ArrowDown, FileDown, Github, Linkedin } from "lucide-react";
import { Reveal } from "./Reveal";
import { WordRotate } from "./WordRotate";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto px-6 pt-28 pb-20">
        <h1 className="mt-8 font-display text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          <Reveal as="span" className="block">Paulo Victor</Reveal>
          <Reveal as="span" delay={100} className="block italic text-muted-foreground">
            developer
          </Reveal>
          <Reveal as="span" delay={200} className="block">
            que constrói
          </Reveal>
          <Reveal as="span" delay={300} className="block">
            <span className="relative inline-flex items-baseline">
              <WordRotate
                words={["Front-end.", "Sites.", "Modernidade.", "Software."]}
                className="h-[1.05em]"
              />
              <span className="ml-1 inline-block h-[0.75em] w-[0.06em] translate-y-1 bg-accent align-middle animate-blink" />
            </span>
          </Reveal>
        </h1>

        <div className="mt-14 grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <Reveal delay={400} className="md:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <span className="text-foreground">Paulo Victor. </span> Sou um desenvolvedor front-end
              que gosta de contruir aplicações reais, complexas e desafiadoras - entregando soluções com Nextjs, React e Typescript.
            </p>
          </Reveal>

          <Reveal delay={500} className="md:col-span-6 md:col-start-7 flex flex-wrap gap-4 items-center md:justify-end">
            <a
              href="#projetos"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-all hover:gap-5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15">
                <ArrowDown className="h-3 w-3 transition-transform duration-500 group-hover:translate-y-0.5" />
              </span>
              Explorar trabalhos
            </a>

            <TooltipProvider delayDuration={120}>
              <div className="flex gap-2">
                {[
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/paulovictorcs" },
                  { icon: Github, label: "GitHub", href: "https://github.com/PauloVictoSantos" },
                  { icon: FileDown, label: "Currículo", href: "/curriculo.pdf" },
                ].map(({ icon: Icon, label, href }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="icon" className="h-11 w-11 rounded-full">
                        <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                          <Icon />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
