
"use client"
import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { skills, SkillsKey } from "@/data/project";
import { useTheme } from "next-themes";

const SKILLS_KEYS = Object.keys(skills) as SkillsKey[];

interface OrbitProps {
  radius: number;
  centerX: number;
  centerY: number;
  count: number;
  iconSize: number;
  startIndex: number;
}

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex }: OrbitProps) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const techKey = SKILLS_KEYS[(startIndex + index) % SKILLS_KEYS.length];
        const tech = skills[techKey];
        const tooltipAbove = angle > 90;
        const iconColor = resolvedTheme === "dark"
          ? (tech.darkColor ?? tech.color)
          : tech.color;
        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: iconSize, height: iconSize }}
            >
              <tech.icon size={iconSize * 0.55} color={iconColor} />
            </div>
            <div
              className={`absolute ${tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"} hidden group-hover:block whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[10px] tracking-wider uppercase text-background shadow-lg`}
            >
              {tech.name}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function TechMapSection() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const baseWidth = Math.min(width * 0.85, 760);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.55;
  const iconSize = width < 480 ? 40 : width < 768 ? 50 : 60;

  return (
    <section id="skills" className="relative py-44 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-150 w-150 -translate-x-1/2 -translate-y-1/4 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
        <Reveal delay={80}>
          <h2 className="mt-6 font-display text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
            Tecnologias Ferramentas
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Tecnologias que uso diariamente em produção.
          </p>
        </Reveal>

        {baseWidth > 0 && (
          <div
            className="relative mt-16"
            style={{ width: baseWidth, height: baseWidth * 0.55 }}
          >
            {/* <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={5} iconSize={iconSize} startIndex={0} /> */}
            <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={7} iconSize={iconSize} startIndex={5} />
            <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} count={9} iconSize={iconSize} startIndex={12} />
          </div>
        )}
      </div>
    </section>
  );
}