"use client";

import { Info, Star, MapPin, GraduationCap, FileText, Github, Linkedin } from "lucide-react";
import { TooltipCard } from "../ui/tooltip-card";
import { LinkPreview } from "../ui/link-preview";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

function FloatingCard({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProfileCard({
  name,
  role,
  rating,
  avatar,
  delay,
  live = false,
}: {
  name: string;
  role: string;
  rating: number;
  avatar: string;
  delay: number;
  live?: boolean;
}) {
  return (
    <FloatingCard delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="flex items-center gap-2.5 backdrop-blur-md rounded-2xl px-3.5 py-2.5 border w-42.5"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
        >
          <img src="image/Paulo.png" className="rounded-full" alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="text-[11px] font-semibold text-gray-800 truncate">{name}</p>
            {live && (
              <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-semibold">
                LIVE
              </span>
            )}
          </div>
          <p className="text-[9px] text-gray-400 truncate mb-1">{role}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-2 h-2 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </FloatingCard>
  );
}

function StackCard({ delay }: { delay: number }) {
  const stack = [
    { color: "#60519b", label: "React & Next.js" },
    { color: "#3b82f6", label: "TypeScript" },
    { color: "#10b981", label: "Node.js" },
  ];
  return (
    <FloatingCard delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="backdrop-blur-md rounded-2xl shadow-xl px-3.5 py-3 border w-37 space-y-2"
      >
        <p className="text-[9px] font-semibold text-foreground uppercase tracking-widest">Tech Stack</p>
        {stack.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[10px] text-foreground font-medium">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </FloatingCard>
  );
}


function CommitCard({ delay }: { delay: number }) {
  const [data, setData] = useState<
    { date: string; commits: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch(
          "https://api.github.com/users/PauloVictoSantos/events/public?per_page=100"
        );

        if (!res.ok) throw new Error("fetch failed");

        const events = await res.json();

        const commitsPerDay: Record<string, number> = {};

        let totalCommits = 0;

        events.forEach((ev: any) => {
          if (ev.type === "PushEvent") {
            const commits = ev.payload?.commits?.length ?? 1;

            const date = new Date(ev.created_at)
              .toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              });

            commitsPerDay[date] =
              (commitsPerDay[date] || 0) + commits;

            totalCommits += commits;
          }
        });

        const formattedData = Object.entries(commitsPerDay)
          .map(([date, commits]) => ({
            date,
            commits,
          }))
          .reverse();

        setData(formattedData);
        setTotal(totalCommits);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, []);

  return (
    <FloatingCard delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="backdrop-blur-md rounded-2xl shadow-xl px-3.5 py-3 border w-40"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest">
            Commits
          </p>

          {loading ? (
            <span className="text-[8px] animate-pulse">
              carregando…
            </span>
          ) : (
            <span className="text-[8px] font-bold text-accent">
              {total} commits
            </span>
          )}
        </div>

        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="colorCommits"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#7c3aed"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#7c3aed"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "10px",
                  fontSize: "10px",
                }}
              />

              <Area
                type="monotone"
                dataKey="commits"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#colorCommits)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </FloatingCard>
  );
}

const skills = [
  { label: "React", icon: "⚛️" },
  { label: "Next.js", icon: "▲" },
  { label: "TypeScript", icon: "TS" },
  { label: "C", icon: "C" },
  { label: "Tailwind", icon: "🌊" },
];

function CTAButtons() {
  const buttons = [
    {
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4 text-blue-500" />,
      href: "https://www.linkedin.com/in/paulo-victor-8b05133a0",
      primary: true,
    },
    {
      label: "GitHub",
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/PauloVictoSantos",
      primary: false,
    },
    {
      label: "Currículo",
      icon: <FileText className="w-4 h-4 text-amber-500" />,
      href: "/curriculo.pdf",
      primary: false,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((btn) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target={btn.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`
            inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
            transition-colors duration-200 border border-card 
            ${btn.primary
              ? "bg-text-accent text-foreground border-card shadow-lg shadow-text-accent/25"
              : "text-foreground shadow-sm"
            }
          `}
        >
          {btn.icon}
          {btn.label}
        </motion.a>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" className="flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-8xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-20">
        <motion.div
          ref={ref}
          className="space-y-7"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >

          <motion.div variants={item} className="relative inline-block">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-relaxed lg:leading-snug text-center mx-auto "
            >
              Olá, eu sou
              <Highlight className="text-accent">
                Paulo Victor
              </Highlight>
            </motion.h1>
            <TooltipCard
              containerClassName="absolute top-3 -right-7 cursor-pointer"
              content={
                <div className="max-w-xs text-sm">
                  <p className="font-semibold mb-1">Sobre esta seção:</p>
                  <p>Aqui apresento minha trajetória, formação e objetivos como desenvolvedor.</p>
                </div>
              }
            >
              <Info className="w-4 h-4 text-accent hover:text-accent/50 transition" />
            </TooltipCard>
          </motion.div>

          {/* Subtítulo / role */}
          <motion.h2 variants={item} className="text-xl lg:text-2xl font-semibold text-foreground leading-snug">
            Desenvolvedor 
            <LinkPreview
              url="https://react.dev"
              className="text-accent"
            >
             Front-end
            </LinkPreview>
          </motion.h2>

          {/* Metadados: formação e localização */}
          <motion.div variants={item} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <GraduationCap className="w-4 h-4 text-gray-700 shrink-0" />
              <span>
                Engenharia da Computação · Técnico em{" "}
                <LinkPreview
                  url="https://www2.ifam.edu.br/campus/cprf"
                  className="font-medium text-foreground hover:text-accent transition"
                >
                  IFAM
                </LinkPreview>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Manaus, AM · 21 anos</span>
            </div>
          </motion.div>

          {/* Parágrafos */}
          <motion.div variants={item} className="space-y-4 text-[1rem] leading-relaxed text-foreground">
            <p>
              Minha trajetória começou no{" "}
              <LinkPreview
                url="https://www.ifam.edu.br"
                className="font-medium text-foreground"
              >
                IFAM
              </LinkPreview>
              , onde me formei Técnico em Desenvolvimento de Sistemas — foi lá que aprendi que
              programar é resolver problemas reais, não só escrever código que compila.
            </p>
            <p>
              Hoje curso{" "}
              <LinkPreview
                url="https://pt.wikipedia.org/wiki/Engenharia_da_Computa%C3%A7%C3%A3o"
                className="font-medium text-foreground"
              >
                Engenharia da Computação
              </LinkPreview>{" "}
              e já coloquei a mão em produção: estagiei na{" "}
              <LinkPreview
                url="https://www.embrapa.br"
                className="font-medium text-foreground"
              >
                Embrapa
              </LinkPreview>
              {" "}no Polo Industrial de Manaus, onde entendi o que é entregar software em contexto real.
            </p>

          </motion.div>

          <motion.div variants={item}>
            <CTAButtons />
          </motion.div>
        </motion.div>


        <div className="relative flex items-center justify-center">
          <motion.div
            className="pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          <div>
            <img
              src="/image/about.png"
              alt="Paulo"
              className="relative z-10"
            />
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
            <StackCard delay={0.7} />
          </div>

          <div className="absolute right-0 top-[25%] -translate-y-1/2 z-30">
            <CommitCard delay={1.0} />
          </div>

          <div className="absolute bottom-72 right-2 z-30">
            <ProfileCard
              name="Paulo Victor"
              role="Full-Stack Developer"
              rating={5}
              avatar="PV"
              delay={0.8}
              live
            />
          </div>

          <div className="absolute bottom-48 left-2 z-30">
            <ProfileCard
              name="Open to Work"
              role="Software Engineer"
              rating={5}
              avatar="✓"
              delay={0.9}
            />
          </div>

          {[
            { top: "11%", left: "14%", size: 9, color: "#60519b" },
            { top: "72%", right: "6%", size: 7, color: "#3b82f6" },
            { top: "58%", left: "2%", size: 5, color: "#fbbf24" },
            { top: "28%", right: "20%", size: 5, color: "#10b981" },
          ].map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: dot.size,
                height: dot.size,
                background: dot.color,
                top: dot.top,
                left: (dot as any).left,
                right: (dot as any).right,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.05 + i * 0.08 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}