"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Folder, Mail, Star, AlertCircle, Sun, Moon } from "lucide-react"
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiC, SiGithub,
  SiPython, SiRust, SiDocker, SiPostgresql,
  SiGit, SiLinux, SiVite, SiPrisma,
} from "react-icons/si"
import { useGithub } from "@/hooks/useGithub"

const PAGES = ["home", "projects", "contact"] as const
type Page = typeof PAGES[number]

const TECHS = [
  { name: "React",      icon: (c: string) => <SiReact      size={18} color="#61DAFB" />, color: "#61DAFB" },
  { name: "Next.js",    icon: (c: string) => <SiNextdotjs  size={18} color={c}       />, color: "#888" },
  { name: "TypeScript", icon: (c: string) => <SiTypescript size={18} color="#3178C6" />, color: "#3178C6" },
  { name: "JavaScript", icon: (c: string) => <SiJavascript size={18} color="#F7DF1E" />, color: "#F7DF1E" },
  { name: "Tailwind",   icon: (c: string) => <SiTailwindcss size={18} color="#38BDF8"/>, color: "#38BDF8" },
  { name: "Node.js",    icon: (c: string) => <SiNodedotjs  size={18} color="#68A063" />, color: "#68A063" },
  { name: "Python",     icon: (c: string) => <SiPython     size={18} color="#3B82F6" />, color: "#3B82F6" },
  { name: "Postgres",   icon: (c: string) => <SiPostgresql size={18} color="#336791" />, color: "#336791" },
  { name: "Git",        icon: (c: string) => <SiGit        size={18} color="#F05032" />, color: "#F05032" },
  { name: "Prisma",     icon: (c: string) => <SiPrisma     size={18} color={c}       />, color: "#888" },
  { name: "GitHub",     icon: (c: string) => <SiGithub     size={18} color={c}       />, color: "#888" },
]

const SKILLS = [
  { name: "React / Next.js", pct: 80, color: "#61DAFB" },
  { name: "TypeScript",      pct: 70, color: "#3178C6" },
  { name: "Tailwind CSS",    pct: 85, color: "#38BDF8" },
  { name: "Node.js",         pct: 60, color: "#68A063" },
  { name: "C",               pct: 65, color: "#A8B9CC" },
  { name: "Python",          pct: 55, color: "#3B82F6" },
]

/* ── theme tokens ── */
function makeTokens(dark: boolean) {
  return {
    bg:        dark ? "#0e0e12"                   : "#f4f4f8",
    surface:   dark ? "rgba(255,255,255,0.04)"    : "rgba(0,0,0,0.04)",
    border:    dark ? "rgba(255,255,255,0.08)"    : "rgba(0,0,0,0.10)",
    text:      dark ? "#f0f0f0"                   : "#111118",
    muted:     dark ? "rgba(255,255,255,0.38)"    : "rgba(0,0,0,0.45)",
    accent:    "#7c6fcf",
    accentDim: dark ? "rgba(124,111,207,0.15)"    : "rgba(124,111,207,0.10)",
    green:     "#22c55e",
    label:     dark ? "rgba(255,255,255,0.28)"    : "rgba(0,0,0,0.32)",
    navBg:     dark ? "rgba(14,14,18,0.88)"       : "rgba(244,244,248,0.88)",
    nextDot:   dark ? "#aaa"                      : "#444",
    githubIco: dark ? "#ccc"                      : "#333",
    linuxIco:  dark ? "#eee"                      : "#333",
    prismaIco: dark ? "#eee"                      : "#333",
  }
}

/* ── utils ── */
function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function timeAgo(dateStr: string) {
  if (!dateStr) return ""
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m atrás`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h atrás`
  return `${Math.floor(h / 24)}d atrás`
}

/* ── battery hook (corrected) ── */
function useBattery() {
  const [level, setLevel]       = useState<number>(75)
  const [charging, setCharging] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    if (!("getBattery" in navigator)) return
    setSupported(true)
    ;(navigator as any).getBattery().then((b: any) => {
      const update = () => {
        setLevel(Math.round(b.level * 100))
        setCharging(b.charging)
      }
      update()
      b.addEventListener("levelchange",   update)
      b.addEventListener("chargingchange", update)
      return () => {
        b.removeEventListener("levelchange",   update)
        b.removeEventListener("chargingchange", update)
      }
    }).catch(() => {})
  }, [])

  return { level, charging, supported }
}

/* ── sub-components ── */
function StatusBar({ time, dark, onToggle, T }: { time: string; dark: boolean; onToggle(): void; T: ReturnType<typeof makeTokens> }) {
  const { level, charging } = useBattery()
  const low = level < 20

  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 22px 0", fontSize:11, fontWeight:500, color:T.muted, flexShrink:0 }}>
      <span>{time}</span>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {/* theme toggle */}
        <button
          onClick={onToggle}
          style={{ background:"none", border:"none", cursor:"pointer", color:T.muted, padding:0, display:"flex", alignItems:"center" }}
        >
          {dark ? <Sun size={13}/> : <Moon size={13}/>}
        </button>

        <span style={{ fontSize:10 }}>4G</span>

        {/* battery icon */}
        <div style={{ display:"flex", alignItems:"center", gap:3 }}>
          {/* body */}
          <div style={{ position:"relative", width:22, height:11, border:`1.5px solid ${T.border}`, borderRadius:3, overflow:"hidden" }}>
            <div style={{
              position:"absolute",
              top: 1.5,
              left: 1.5,
              bottom: 1.5,
              borderRadius: 1,
              background: low ? "#f87171" : T.green,
              /* key fix: width as percentage of the inner box */
              width: `calc(${level}% - 3px)`,
              maxWidth: "calc(100% - 3px)",
            }} />
          </div>
          {/* tip */}
          <div style={{ width:2, height:5, background:T.muted, borderRadius:"0 1px 1px 0" }} />
          <span style={{ fontSize:10 }}>{level}%{charging ? "⚡":""}</span>
        </div>
      </div>
    </div>
  )
}

function GlassCard({ children, style={}, T }: { children: React.ReactNode; style?: React.CSSProperties; T: ReturnType<typeof makeTokens> }) {
  return (
    <div style={{ background:T.surface, border:`0.5px solid ${T.border}`, borderRadius:18, padding:14, position:"relative", overflow:"hidden", ...style }}>
      {children}
    </div>
  )
}

function AnimatedCounter({ target, suffix="" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = Math.max(1, Math.ceil(target / 30))
    const id = setInterval(() => { cur = Math.min(cur + step, target); setVal(cur); if (cur >= target) clearInterval(id) }, 35)
    return () => clearInterval(id)
  }, [target])
  return <>{val}{suffix}</>
}

function SkillBar({ name, pct, color, animate, T }: { name:string; pct:number; color:string; animate:boolean; T: ReturnType<typeof makeTokens> }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:11, fontWeight:500, color:T.text }}>{name}</span>
        <span style={{ fontSize:10, color:T.muted }}>{pct}%</span>
      </div>
      <div style={{ height:3, background:"rgba(128,128,128,0.12)", borderRadius:999, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:999, background:color, width: animate ? `${pct}%`:"0%", transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  )
}

function LangBar({ name, count, total, color, T }: { name:string; count:number; total:number; color:string; T: ReturnType<typeof makeTokens> }) {
  const pct = Math.round((count / total) * 100)
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }} />
          <span style={{ fontSize:11, fontWeight:500, color:T.text }}>{name}</span>
        </div>
        <span style={{ fontSize:10, color:T.muted }}>{pct}%</span>
      </div>
      <div style={{ height:3, background:"rgba(128,128,128,0.12)", borderRadius:999, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:999, background:color, width:`${pct}%`, transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  )
}

function RadarChart({ T }: { T: ReturnType<typeof makeTokens> }) {
  const labels = ["React","TS","CSS","Node","C","Python"]
  const vals   = [0.80, 0.70, 0.85, 0.60, 0.65, 0.55]
  const n = labels.length, cx = 100, cy = 95, r = 68
  const polygon = (scale: number) =>
    Array.from({ length:n }, (_, i) => { const a = (i/n)*2*Math.PI - Math.PI/2; return `${cx + r*scale*Math.cos(a)},${cy + r*scale*Math.sin(a)}` }).join(" ")
  const dataPts = vals.map((v, i) => { const a = (i/n)*2*Math.PI - Math.PI/2; return { x: cx + r*v*Math.cos(a), y: cy + r*v*Math.sin(a) } })
  return (
    <svg width="200" height="190" viewBox="0 0 200 190" style={{ display:"block", margin:"0 auto" }}>
      {[0.25,0.5,0.75,1].map(s => <polygon key={s} points={polygon(s)} fill="none" stroke={T.border} strokeWidth="0.5" />)}
      {Array.from({ length:n }, (_, i) => { const a=(i/n)*2*Math.PI-Math.PI/2; return <line key={i} x1={cx} y1={cy} x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)} stroke={T.border} strokeWidth="0.5" /> })}
      <polygon points={dataPts.map(p=>`${p.x},${p.y}`).join(" ")} fill={T.accentDim} stroke={T.accent} strokeWidth="1.5" />
      {dataPts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={T.accent} />)}
      {labels.map((l,i) => { const a=(i/n)*2*Math.PI-Math.PI/2; return <text key={l} x={cx+(r+18)*Math.cos(a)} y={cy+(r+18)*Math.sin(a)} fill={T.muted} fontSize={9} textAnchor="middle" dominantBaseline="middle" fontFamily="inherit">{l}</text> })}
    </svg>
  )
}

function SectionLabel({ children, T }: { children: React.ReactNode; T: ReturnType<typeof makeTokens> }) {
  return (
    <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:T.label, marginBottom:10 }}>
      {children}
    </div>
  )
}

/* ── pages ── */
function HomeScreen({ github, T, dark }: { github: ReturnType<typeof useGithub>; T: ReturnType<typeof makeTokens>; dark: boolean }) {
  const iconColor = dark ? "#aaa" : "#444"

  return (
    <div style={{ padding:"10px 14px 76px", marginTop:16, display:"flex", flexDirection:"column", gap:12 }}>
      <GlassCard T={T} style={{ border:`0.5px solid rgba(124,111,207,0.3)`, background:T.accentDim }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:120, height:120, borderRadius:"50%", background:`radial-gradient(circle, ${T.accentDim} 0%, transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg, #60519b, ${T.accent})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:700, color:"#fff", marginBottom:10, border:`2px solid rgba(124,111,207,0.4)`, overflow:"hidden" }}>
          <img src="image/Paulo.png" style={{ width:"100%", height:"100%", objectFit:"cover" }} alt="" />
        </div>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:3 }}>Paulo Santos</div>
        <div style={{ fontSize:11, color:T.muted, marginBottom:10 }}>Engenharia da Computação</div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(34,197,94,0.1)", border:"0.5px solid rgba(34,197,94,0.3)", borderRadius:999, padding:"3px 10px", fontSize:10, color:T.green, fontWeight:500 }}>
          <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }} style={{ width:6, height:6, borderRadius:"50%", background:T.green }} />
          Disponível
        </div>
        {github.loading && <div style={{ fontSize:10, color:T.muted, marginTop:8 }}>Carregando GitHub...</div>}
        {github.error  && <div style={{ fontSize:10, color:"#f87171", marginTop:8, display:"flex", alignItems:"center", gap:4 }}><AlertCircle size={10}/> {github.error}</div>}
      </GlassCard>

      <SectionLabel T={T}>Stack</SectionLabel>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8 }}>
        {TECHS.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }} whileHover={{ scale:1.08, y:-3 }}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"default" }}>
            <div style={{ width:40, height:40, borderRadius:12, background:`${t.color}14`, border:`0.5px solid ${t.color}30`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {t.icon(iconColor)}
            </div>
            <span style={{ fontSize:9, color:T.muted, fontWeight:500 }}>{t.name}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:4 }}>
        {[
          { label:"Repos",   val: github.loading ? 0 : github.publicRepos,   suffix:"+" },
          { label:"Commits", val: github.loading ? 0 : github.totalCommits,  suffix:"+" },
          { label:"Techs",   val: TECHS.length, suffix:"" },
        ].map(s => (
          <div key={s.label} style={{ background:T.surface, border:`0.5px solid ${T.border}`, borderRadius:14, padding:"10px 8px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:700, color:T.text }}><AnimatedCounter target={s.val} suffix={s.suffix}/></div>
            <div style={{ fontSize:10, color:T.muted, marginTop:3, fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsScreen({ github, T }: { github: ReturnType<typeof useGithub>; T: ReturnType<typeof makeTokens> }) {
  const langColor: Record<string,string> = { TypeScript:"#3178C6", JavaScript:"#F7DF1E", C:"#A8B9CC", Python:"#3B82F6", "C++":"#f34b7d" }
  const repos = github.topRepos.length > 0 ? github.topRepos : [
    { id:1, name:"portfolio",   description:"Portfólio pessoal com Next.js",       stargazers_count:4, language:"TypeScript", html_url:"#", pushed_at:"" },
    { id:2, name:"ds-algorithms",description:"Estruturas de dados em C",           stargazers_count:7, language:"C",          html_url:"#", pushed_at:"" },
    { id:3, name:"ui-components",description:"Biblioteca React customizada",       stargazers_count:2, language:"TypeScript", html_url:"#", pushed_at:"" },
  ]

  return (
    <div style={{ padding:"10px 14px 76px" }}>
      <SectionLabel T={T}>Repositórios</SectionLabel>
      {github.loading && <div style={{ color:T.muted, fontSize:12, textAlign:"center", padding:"20px 0" }}>Carregando repos...</div>}
      {repos.map((r, i) => (
        <motion.a key={r.id} href={r.html_url} target="_blank" rel="noreferrer"
          initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
          whileHover={{ x:3 }}
          style={{ display:"block", marginBottom:8, padding:"12px 14px", background:T.surface, border:`0.5px solid ${T.border}`, borderRadius:14, textDecoration:"none", transition:"background 0.2s, border-color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(124,111,207,0.08)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(124,111,207,0.3)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background=T.surface; (e.currentTarget as HTMLElement).style.borderColor=T.border }}
        >
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <span style={{ fontSize:13, fontWeight:600, color:T.text }}>{r.name}</span>
            <span style={{ fontSize:11, color:"#fbbf24", display:"flex", alignItems:"center", gap:3 }}><Star size={10}/>{r.stargazers_count}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom: r.description ? 4 : 0 }}>
            {r.language && <><span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background: langColor[r.language] ?? "#888" }}/><span style={{ fontSize:10, color:T.muted }}>{r.language}</span></>}
            {r.pushed_at && <span style={{ fontSize:10, color:T.label }}>· {timeAgo(r.pushed_at)}</span>}
          </div>
          {r.description && <p style={{ fontSize:11, color:T.muted, lineHeight:1.5, margin:0 }}>{r.description}</p>}
        </motion.a>
      ))}
    </div>
  )
}


function ContactScreen({ T }: { T: ReturnType<typeof makeTokens> }) {
  const [sent, setSent] = useState(false)
  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"10px 13px", marginBottom:8,
    background:T.surface, border:`0.5px solid ${T.border}`,
    borderRadius:12, fontSize:12,
    color:T.text,
    fontFamily:"inherit", outline:"none", boxSizing:"border-box",
  }
  return (
    <div style={{ padding:"10px 14px 76px" }}>
      <GlassCard T={T} style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, color:T.muted, marginBottom:5 }}>Tempo de resposta</div>
        <div style={{ fontSize:24, fontWeight:700, color:T.text }}>~ 24h</div>
      </GlassCard>
      <SectionLabel T={T}>Mensagem</SectionLabel>
      {["Seu nome","Seu email"].map(ph => (
        <input key={ph} placeholder={ph} style={inputStyle}/>
      ))}
      <textarea placeholder="Mensagem..." rows={3} style={{ ...inputStyle, resize:"none" }}/>
      <motion.button whileTap={{ scale:0.97 }} onClick={() => setSent(true)}
        style={{ width:"100%", padding:12, background: sent ? "rgba(34,197,94,0.2)" : `linear-gradient(135deg, #60519b, ${T.accent})`, border: sent ? `0.5px solid rgba(34,197,94,0.4)` : "none", borderRadius:14, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"background 0.3s" }}>
        {sent ? "✓ Mensagem enviada!" : "Enviar mensagem"}
      </motion.button>
    </div>
  )
}

/* ── root ── */
export default function PhoneContent() {
  const [active, setActive] = useState<Page>("home")
  const [prev,   setPrev]   = useState<Page | null>(null)
  const [dark,   setDark]   = useState(true)
  const time   = useClock()
  const github = useGithub()
  const T      = makeTokens(dark)

  const navTo = (p: Page) => { if (p === active) return; setPrev(active); setActive(p) }
  const dir   = prev ? (PAGES.indexOf(active) > PAGES.indexOf(prev) ? 1 : -1) : 1

  const pageMap: Record<Page, React.ReactNode> = {
    home:     <HomeScreen    github={github} T={T} dark={dark}/>,
    projects: <ProjectsScreen github={github} T={T}/>,
    contact:  <ContactScreen T={T}/>,
  }

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:T.bg, color:T.text, fontFamily:"inherit", transition:"background 0.3s, color 0.3s" }}>
      <StatusBar time={time} dark={dark} onToggle={() => setDark(d => !d)} T={T}/>

      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={active}
            initial={{ x:`${dir*100}%`, opacity:0 }}
            animate={{ x:0,            opacity:1 }}
            exit={{   x:`${dir*-100}%`, opacity:0 }}
            transition={{ type:"spring", stiffness:300, damping:32 }}
            style={{ position:"absolute", inset:0, overflowY:"auto" }}
            drag="x" dragConstraints={{ left:0, right:0 }} dragElastic={0.15}
            onDragEnd={(_, info) => {
              const i = PAGES.indexOf(active)
              if (info.offset.x < -80 && i < PAGES.length-1) navTo(PAGES[i+1])
              if (info.offset.x > 80  && i > 0)              navTo(PAGES[i-1])
            }}
          >
            {pageMap[active]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <div style={{ padding:"0 14px 14px", flexShrink:0 }}>
        <div style={{ background:T.navBg, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:`0.5px solid ${T.border}`, borderRadius:999, padding:"10px 24px", display:"flex", justifyContent:"space-around" }}>
          {([
            { id:"home",     icon:<Home     size={18}/> },
            { id:"projects", icon:<Folder   size={18}/> },
            { id:"contact",  icon:<Mail     size={18}/> },
          ] as { id:Page; icon:React.ReactNode }[]).map(n => (
            <motion.button key={n.id} onClick={() => navTo(n.id)} whileTap={{ scale:0.88 }}
              style={{ background:"none", border:"none", cursor:"pointer", padding:"6px 10px", borderRadius:10, color: active===n.id ? T.text : T.muted, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", transition:"color 0.2s" }}>
              {n.icon}
              {active===n.id && (
                <motion.div layoutId="nav-indicator"
                  style={{ position:"absolute", bottom:-2, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:T.accent }}
                  transition={{ type:"spring", stiffness:400, damping:30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}