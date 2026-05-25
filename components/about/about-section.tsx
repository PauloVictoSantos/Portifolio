"use client";

import { Info, Star, MapPin, GraduationCap, FileText, Github, Linkedin } from "lucide-react";
import { TooltipCard } from "../ui/tooltip-card";
import { LinkPreview } from "../ui/link-preview";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

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
        <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Tech Stack</p>
        {stack.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[10px] text-gray-700 font-medium">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </FloatingCard>
  );
}

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
 
function CommitCard({ delay }: { delay: number }) {
  // bars[0..6] = Dom..Sáb, valor = nº de push events
  const [bars, setBars] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchCommits() {
      try {
        // Pega até 100 eventos públicos (cobertura ~30 dias)
        const res = await fetch(
          "https://api.github.com/users/PauloVictoSantos/events/public?per_page=100"
        );
        if (!res.ok) throw new Error("fetch failed");
        const events: any[] = await res.json();
 
        // Conta PushEvents agrupados por dia da semana
        const counts = [0, 0, 0, 0, 0, 0, 0];
        let pushTotal = 0;
 
        events.forEach((ev) => {
          if (ev.type === "PushEvent") {
            const dow = new Date(ev.created_at).getDay(); // 0=Dom … 6=Sáb
            const commits = ev.payload?.commits?.length ?? 1;
            counts[dow] += commits;
            pushTotal += commits;
          }
        });
 
        setBars(counts);
        setTotal(pushTotal);
      } catch {
        // fallback silencioso — bars ficam zerados
      } finally {
        setLoading(false);
      }
    }
    fetchCommits();
  }, []);
 
  const max = Math.max(...bars, 1); // evita divisão por zero
 
  // Dia da semana hoje
  const today = new Date().getDay();
 
  return (
    <FloatingCard delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl px-3.5 py-3 border border-white/60 w-44"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">
            Commits
          </p>
          {loading ? (
            <span className="text-[8px] text-gray-300 animate-pulse">carregando…</span>
          ) : (
            <span className="text-[8px] font-bold text-[#60519b]">
              {total} recentes
            </span>
          )}
        </div>
 
        {/* Barras */}
        <div className="flex items-end gap-0.75 h-10">
          {bars.map((val, i) => {
            const heightPct = loading ? 0 : Math.max((val / max) * 100, val > 0 ? 8 : 0);
            const isToday = i === today;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <motion.div
                  className="w-full rounded-t-[3px]"
                  style={{
                    background: isToday ? "#60519b" : "#ede9fe",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: loading ? 0 : `${heightPct}%` }}
                  transition={{ duration: 0.55, delay: delay + i * 0.06, ease: "easeOut" }}
                />
                <span
                  className={`text-[6px] ${isToday ? "text-[#60519b] font-bold" : "text-gray-300"}`}
                >
                  {DAYS[i].charAt(0)}
                </span>
              </div>
            );
          })}
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
      icon: <Linkedin className="w-4 h-4" />,
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
      icon: <FileText className="w-4 h-4" />,
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
            transition-colors duration-200 border
            ${btn.primary
              ? "bg-[#60519b] text-white border-[#60519b] hover:bg-[#4f4284] shadow-lg shadow-[#60519b]/25"
              : "bg-white text-gray-700 border-gray-200 hover:border-[#60519b] hover:text-[#60519b] shadow-sm"
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

          {/* Heading principal */}
          <motion.div variants={item} className="relative inline-block">
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-gray-900">
              Olá, eu sou<br />
              <span className="text-[#60519b]">Paulo</span>
            </h1>
            <TooltipCard
              containerClassName="absolute top-3 -right-7 cursor-pointer"
              content={
                <div className="max-w-xs text-sm">
                  <p className="font-semibold mb-1">Sobre esta seção:</p>
                  <p>Aqui apresento minha trajetória, formação e objetivos como desenvolvedor.</p>
                </div>
              }
            >
              <Info className="w-4 h-4 text-gray-300 hover:text-[#60519b] transition" />
            </TooltipCard>
          </motion.div>

          {/* Subtítulo / role */}
          <motion.h2 variants={item} className="text-xl lg:text-2xl font-semibold text-gray-700 leading-snug">
            Desenvolvedor{" "}
            <LinkPreview
              url="https://react.dev"
              className="text-[#60519b]"
            >
              Front-end
            </LinkPreview>
          </motion.h2>

          {/* Metadados: formação e localização */}
          <motion.div variants={item} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GraduationCap className="w-4 h-4 text-[#60519b] shrink-0" />
              <span>
                Engenharia da Computação · Técnico em{" "}
                <LinkPreview
                  url="https://www2.ifam.edu.br/campus/cprf"
                  className="font-medium text-gray-700 hover:text-[#60519b] transition"
                >
                  IFAM
                </LinkPreview>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-[#60519b] shrink-0" />
              <span>Manaus, AM · 21 anos</span>
            </div>
          </motion.div>

          {/* Parágrafos */}
          <motion.div variants={item} className="space-y-4 text-[1rem] leading-relaxed text-gray-500">
            <p>
              Minha trajetória começou no{" "}
              <LinkPreview
                url="https://www.ifam.edu.br"
                className="font-medium text-gray-800"
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
                className="font-medium text-gray-800"
              >
                Engenharia da Computação
              </LinkPreview>{" "}
              e já coloquei a mão em produção: estagiei na{" "}
              <LinkPreview
                url="https://www.embrapa.br"
                className="font-medium text-gray-800"
              >
                Embrapa
              </LinkPreview>
              {" "}no Polo Industrial de Manaus, onde entendi o que é entregar software em contexto real.
            </p>

          </motion.div>

          {/* CTA buttons */}
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

          <div className="absolute right-0 top-[38%] -translate-y-1/2 z-30">
            <CommitCard delay={1.0} />
          </div>

          <div className="absolute bottom-14 right-2 z-30">
            <ProfileCard
              name="Paulo Victor"
              role="Full-Stack Developer"
              rating={5}
              avatar="PV"
              delay={0.8}
              live
            />
          </div>

          <div className="absolute bottom-4 left-2 z-30">
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