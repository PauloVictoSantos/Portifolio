"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Folder, BarChart3, Mail, Star } from "lucide-react"
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiC, SiGithub,
} from "react-icons/si"
import { useGithub } from "@/hooks/useGithub"

const PAGES = ["home", "projects", "stats", "contact"] as const
type Page = typeof PAGES[number]

const TECHS = [
  { name: "React", icon: <SiReact size={20} color="#61DAFB" />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs size={20} color="#aaa" />, color: "#aaa" },
  { name: "TypeScript", icon: <SiTypescript size={20} color="#3178C6" />, color: "#3178C6" },
  { name: "JavaScript", icon: <SiJavascript size={20} color="#F7DF1E" />, color: "#F7DF1E" },
  { name: "Tailwind", icon: <SiTailwindcss size={20} color="#38BDF8" />, color: "#38BDF8" },
  { name: "Node.js", icon: <SiNodedotjs size={20} color="#68A063" />, color: "#68A063" },
  { name: "C", icon: <SiC size={20} color="#A8B9CC" />, color: "#A8B9CC" },
  { name: "GitHub", icon: <SiGithub size={20} color="#ccc" />, color: "#ccc" },
]

const SKILLS = [
  { name: "React / Next.js", pct: 80, color: "#61DAFB" },
  { name: "TypeScript", pct: 70, color: "#3178C6" },
  { name: "Tailwind CSS", pct: 85, color: "#38BDF8" },
  { name: "Node.js", pct: 60, color: "#68A063" },
  { name: "C / C++", pct: 65, color: "#A8B9CC" },
]

/* ── utils ── */
function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(`${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/* ── sub-components ── */

function StatusBar({ time }: { time: string }) {
  const [battery, setBattery] = useState<number | null>(null)
  const [charging, setCharging] = useState(false)

  useEffect(() => {
    if (!("getBattery" in navigator)) return
    ;(navigator as any).getBattery().then((b: any) => {
      const update = () => { setBattery(Math.round(b.level * 100)); setCharging(b.charging) }
      update()
      b.addEventListener("levelchange", update)
      b.addEventListener("chargingchange", update)
    }).catch(() => {})
  }, [])

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 22px 0", fontSize: 11, fontWeight: 500,
      color: "rgba(255,255,255,0.65)", flexShrink: 0,
    }}>
      <span>{time}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10 }}>4G</span>
        <div style={{
          width: 20, height: 10, border: "1.5px solid rgba(255,255,255,0.4)",
          borderRadius: 3, position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: "1.5px", right: 2,
            background: (battery ?? 75) < 20 ? "#f87171" : "#4ade80",
            borderRadius: 1, width: `${(battery ?? 75)}%`,
          }} />
        </div>
        <span style={{ fontSize: 10 }}>{battery ?? 75}%{charging ? "⚡" : ""}</span>
      </div>
    </div>
  )
}

function PageDots({ current }: { current: Page }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: "7px 0 4px", flexShrink: 0 }}>
      {PAGES.map(p => (
        <div key={p} style={{
          height: 5, width: current === p ? 14 : 5, borderRadius: 999,
          background: current === p ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)",
          transition: "width 0.3s ease, background 0.3s ease",
        }} />
      ))}
    </div>
  )
}

function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "0.5px solid rgba(255,255,255,0.1)",
      borderRadius: 20, padding: 16,
      position: "relative", overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = Math.ceil(target / 25)
    const id = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(cur)
      if (cur >= target) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [target])
  return <>{val}{suffix}</>
}

function SkillBar({ name, pct, color, animate }: { name: string; pct: number; color: string; animate: boolean }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>{name}</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 999,
          background: color,
          width: animate ? `${pct}%` : "0%",
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  )
}

function RadarChart() {
  const labels = ["React", "TS", "CSS", "Node", "C"]
  const vals = [0.80, 0.70, 0.85, 0.60, 0.65]
  const n = labels.length
  const cx = 100, cy = 90, r = 68

  const polygon = (scale: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2
      return `${cx + r * scale * Math.cos(a)},${cy + r * scale * Math.sin(a)}`
    }).join(" ")

  const dataPts = vals.map((v, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2
    return { x: cx + r * v * Math.cos(a), y: cy + r * v * Math.sin(a) }
  })

  return (
    <svg width="200" height="180" viewBox="0 0 200 180" style={{ display: "block", margin: "0 auto" }}>
      {[0.25, 0.5, 0.75, 1].map(s => (
        <polygon key={s} points={polygon(s)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      })}
      <polygon points={dataPts.map(p => `${p.x},${p.y}`).join(" ")} fill="rgba(96,81,155,0.22)" stroke="#8b6fcf" strokeWidth="1.5" />
      {dataPts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill="#8b6fcf" />)}
      {labels.map((l, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2
        return (
          <text key={l} x={cx + (r + 17) * Math.cos(a)} y={cy + (r + 17) * Math.sin(a)}
            fill="rgba(255,255,255,0.4)" fontSize={9} textAnchor="middle" dominantBaseline="middle"
            fontFamily="inherit"
          >{l}</text>
        )
      })}
    </svg>
  )
}

/* ── pages ── */

function HomeScreen({ github }: { github: ReturnType<typeof useGithub> }) {
  return (
    <div style={{ padding: "10px 14px 76px", marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Hero card */}
      <GlassCard style={{ border: "0.5px solid rgba(96,81,155,0.35)", background: "rgba(96,81,155,0.08)" }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 120, height: 120,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(96,81,155,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, #60519b, #8b6fcf)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10,
          border: "2px solid rgba(96,81,155,0.5)",
        }}>P</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10, marginTop: 10 }}>Paulo Santos</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>
          Engenharia da Computação
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "rgba(29,158,117,0.1)", border: "0.5px solid rgba(29,158,117,0.3)",
          borderRadius: 999, padding: "4px 10px", fontSize: 10, color: "#1D9E75", fontWeight: 500,
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D9E75" }}
          />
          Disponível
        </div>
      </GlassCard>

      {/* Tech grid */}
      <div style={{ fontSize: 10, fontWeight: 600, marginTop: 20, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
        Stack
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {TECHS.map((t, i) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.08, y: -3 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "default" }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 13,
              background: `${t.color}0e`, border: `0.5px solid ${t.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {t.icon}
            </div>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{t.name}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",  marginTop: 20, gap: 8 }}>
        {[
          { id: "repos", label: "Repos", val: github?.publicRepos ?? 12, suffix: "+" },
          { id: "proj", label: "Projetos", val: 20, suffix: "+" },
          { id: "tecs", label: "Techs", val: 8, suffix: "" },
        ].map(s => (
          <div key={s.id} style={{
            background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: 14, padding: "11px 8px", textAlign: "center",
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
              <AnimatedCounter target={s.val} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsScreen({ github }: { github: ReturnType<typeof useGithub> }) {
  const repos = github?.topRepos ?? [
    { id: 1, name: "portfolio", description: "Portfólio pessoal com Next.js", stargazers_count: 4, language: "TypeScript", html_url: "#" },
    { id: 2, name: "ds-algorithms", description: "Estruturas de dados em C", stargazers_count: 7, language: "C", html_url: "#" },
    { id: 3, name: "ui-components", description: "Biblioteca React customizada", stargazers_count: 2, language: "TypeScript", html_url: "#" },
  ]

  const langColor: Record<string, string> = {
    TypeScript: "#3178C6", JavaScript: "#F7DF1E", C: "#A8B9CC", Python: "#3B82F6",
  }

  return (
    <div style={{ padding: "10px 14px 76px" }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
        Projetos
      </div>
      {repos.map((r: any, i: number) => (
        <motion.a key={r.id} href={r.html_url} target="_blank"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ x: 3 }}
          style={{
            display: "block", marginBottom: 8, padding: "12px 14px",
            background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: 14, textDecoration: "none",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"
            ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(96,81,155,0.35)"
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"
            ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{r.name}</span>
            <span style={{ fontSize: 11, color: "#fbbf24", display: "flex", alignItems: "center", gap: 3 }}>
              <Star size={10} />
              {r.stargazers_count}
            </span>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, margin: 0 }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: langColor[r.language] ?? "#888", marginRight: 4, verticalAlign: "middle" }} />
            {r.language} · {r.description ?? "Sem descrição"}
          </p>
        </motion.a>
      ))}
    </div>
  )
}

function StatsScreen() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const id = setTimeout(() => setReady(true), 120); return () => clearTimeout(id) }, [])

  return (
    <div style={{ padding: "10px 14px 76px" }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
        Proficiência
      </div>
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "14px 16px", marginBottom: 12,
      }}>
        {SKILLS.map(s => <SkillBar key={s.name} {...s} animate={ready} />)}
      </div>
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: 14,
      }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.35)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Perfil de habilidades
        </div>
        {ready && <RadarChart />}
      </div>
    </div>
  )
}

function ContactScreen() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: "10px 14px 76px" }}>
      <GlassCard style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 5 }}>Tempo de resposta</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>~ 24h</div>
      </GlassCard>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>
        Mensagem
      </div>
      {["Seu nome", "Seu email"].map(ph => (
        <input key={ph} placeholder={ph} style={{
          width: "100%", padding: "11px 14px", marginBottom: 8,
          background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: 12, fontSize: 12, color: "rgba(255,255,255,0.7)",
          fontFamily: "inherit", outline: "none",
        }} />
      ))}
      <textarea placeholder="Mensagem..." rows={3} style={{
        width: "100%", padding: "11px 14px", marginBottom: 10, resize: "none",
        background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: 12, fontSize: 12, color: "rgba(255,255,255,0.7)",
        fontFamily: "inherit", outline: "none",
      }} />
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setSent(true)}
        style={{
          width: "100%", padding: 13,
          background: sent ? "rgba(29,158,117,0.25)" : "linear-gradient(135deg, #60519b, #7c6bb5)",
          border: sent ? "0.5px solid rgba(29,158,117,0.4)" : "none",
          borderRadius: 14, color: "#fff", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", transition: "background 0.3s",
        }}
      >
        {sent ? "✓ Mensagem enviada!" : "Enviar mensagem"}
      </motion.button>
    </div>
  )
}

/* ── main ── */

export default function PhoneContent() {
  const [active, setActive] = useState<Page>("home")
  const [prev, setPrev] = useState<Page | null>(null)
  const time = useClock()
  const github = useGithub()

  const navTo = (p: Page) => {
    if (p === active) return
    setPrev(active)
    setActive(p)
  }

  const dir = prev ? (PAGES.indexOf(active) > PAGES.indexOf(prev) ? 1 : -1) : 1

  const pageMap: Record<Page, React.ReactNode> = {
    home: <HomeScreen github={github} />,
    projects: <ProjectsScreen github={github} />,
    stats: <StatsScreen />,
    contact: <ContactScreen />,
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", color: "#fff", fontFamily: "inherit" }}>
      <StatusBar time={time} />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            initial={{ x: dir * "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -"100%" as any, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const i = PAGES.indexOf(active)
              if (info.offset.x < -80 && i < PAGES.length - 1) navTo(PAGES[i + 1])
              if (info.offset.x > 80 && i > 0) navTo(PAGES[i - 1])
            }}
          >
            {pageMap[active]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 14px 14px", zIndex: 10 }}>
        <div style={{
          background: "rgba(16,16,20,0.82)", backdropFilter: "blur(20px)",
          border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 999,
          padding: "10px 24px", display: "flex", justifyContent: "space-around",
        }}>
          {([
            { id: "home", icon: <Home size={18} /> },
            { id: "projects", icon: <Folder size={18} /> },
            { id: "stats", icon: <BarChart3 size={18} /> },
            { id: "contact", icon: <Mail size={18} /> },
          ] as { id: Page; icon: React.ReactNode }[]).map(n => (
            <motion.button
              key={n.id}
              onClick={() => navTo(n.id)}
              whileTap={{ scale: 0.88 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 10px", borderRadius: 10,
                color: active === n.id ? "#fff" : "rgba(255,255,255,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", transition: "color 0.2s",
              }}
            >
              {n.icon}
              {active === n.id && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute", bottom: -2, left: "50%",
                    transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "50%", background: "#8b6fcf",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}