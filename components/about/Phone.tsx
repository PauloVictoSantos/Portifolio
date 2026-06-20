import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Home,
  Palette,
  Share2,
  Sun,
  Moon,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiGit,
  SiPrisma,
  SiGithub,
} from "react-icons/si";
import { useAccent } from "@/contexts/AccentContext";

const PAGES = ["home", "style", "social"] as const;
type Page = (typeof PAGES)[number];

const TECHS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#888" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
  { name: "Python", Icon: SiPython, color: "#3B82F6" },
  { name: "Postgres", Icon: SiPostgresql, color: "#336791" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Prisma", Icon: SiPrisma, color: "#888" },
  { name: "GitHub", Icon: SiGithub, color: "#888" },
];

const ACCENTS = [
  { name: "Violeta", value: "#7c6fcf" },
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#22c55e" },
  { name: "Rosa", value: "#ec4899" },
  { name: "Laranja", value: "#f97316" },
];

const FONTS = [
  { name: "Padrão", value: "inherit" },
  { name: "Mono", value: "'JetBrains Mono', monospace" },
  { name: "Rounded", value: "'Poppins', sans-serif" },
];

const SOCIALS = [
  { name: "GitHub", Icon: Github, href: "https://github.com/PauloVictoSantos", color: "#fff" },
  { name: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/paulovictorcs", color: "#0A66C2" },
  { name: "Instagram", Icon: Instagram, href: "https://instagram.com/seuusuario", color: "#E1306C" },
  { name: "Email", Icon: Mail, href: "mailto:paulovictorsantosvc@gmail.com", color: "#EA4335" },
];

/* ── helpers ── */
function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ── theme tokens ── */
type Tokens = ReturnType<typeof makeTokens>;
function makeTokens(dark: boolean, accent: string, radius: number) {
  return {
    bg: dark ? "#0a0a0f" : "#f5f5f9",
    bgGradient: dark
      ? "radial-gradient(120% 80% at 50% 0%, #16121f 0%, #0a0a0f 60%)"
      : "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #ececf3 60%)",
    surface: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
    surfaceHover: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: dark ? "#f0f0f0" : "#0e0e14",
    muted: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
    label: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
    accent,
    accentDim: hexToRgba(accent, dark ? 0.18 : 0.12),
    green: "#22c55e",
    navBg: dark ? "rgba(14,14,20,0.75)" : "rgba(255,255,255,0.75)",
    radius,
    radiusLg: radius + 4,
    radiusMd: Math.round(radius * 0.78),
    radiusSm: Math.round(radius * 0.65),
  };
}

/* ── hooks ── */
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(`${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useBattery() {
  const [level, setLevel] = useState(87);
  const [charging, setCharging] = useState(false);
  useEffect(() => {
    if (typeof navigator === "undefined" || !("getBattery" in navigator)) return;
    let battery: any;
    const update = () => {
      if (!battery) return;
      setLevel(Math.round(battery.level * 100));
      setCharging(battery.charging);
    };
    (navigator as any).getBattery?.().then((b: any) => {
      battery = b;
      update();
      b.addEventListener("levelchange", update);
      b.addEventListener("chargingchange", update);
    });
    return () => {
      if (!battery) return;
      battery.removeEventListener("levelchange", update);
      battery.removeEventListener("chargingchange", update);
    };
  }, []);
  return { level, charging };
}

/* ── pieces ── */
function StatusBar({
  time,
  dark,
  onToggle,
  T,
}: {
  time: string;
  dark: boolean;
  onToggle: () => void;
  T: Tokens;
}) {
  const { level, charging } = useBattery();
  const low = level < 20;
  const batColor = low ? "#ef4444" : charging ? T.green : T.text;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px 6px",
        fontSize: 13,
        fontWeight: 600,
        color: T.text,
        marginTop: 30,
      }}
    >
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{time || "09:41"}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onToggle}
          aria-label="Toggle theme"
          style={{
            background: T.surface,
            border: `0.5px solid ${T.border}`,
            borderRadius: 999,
            width: 26,
            height: 26,
            display: "grid",
            placeItems: "center",
            color: T.text,
            cursor: "pointer",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={dark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {dark ? <Moon size={12} /> : <Sun size={12} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
        <span style={{ fontSize: 11, opacity: 0.7 }}>4G</span>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: 10, opacity: 0.7, fontVariantNumeric: "tabular-nums" }}>
            {level}
          </span>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={T.text} strokeOpacity="0.5" />
            <rect x="22" y="4" width="1.5" height="4" rx="0.5" fill={T.text} fillOpacity="0.5" />
            <motion.rect
              x="2"
              y="2"
              height="8"
              rx="1.5"
              fill={batColor}
              initial={{ width: 0 }}
              animate={{ width: Math.max(2, (level / 100) * 17) }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {charging && (
              <path d="M11 2 L8 7 L11 7 L10 10 L13 5 L10 5 Z" fill="#fff" stroke="#000" strokeWidth="0.3" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function GlassCard({
  children,
  style = {},
  T,
}: {
  children: ReactNode;
  style?: CSSProperties;
  T: Tokens;
}) {
  return (
    <div
      style={{
        background: T.surface,
        border: `0.5px solid ${T.border}`,
        borderRadius: T.radiusMd,
        backdropFilter: "blur(20px)",
        transition: "border-radius 0.3s, background 0.3s",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, T }: { children: ReactNode; T: Tokens }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 1.5,
        color: T.label,
        textTransform: "uppercase",
        margin: "16px 0 8px",
      }}
    >
      {children}
    </div>
  );
}

/* ── pages ── */
function HomeScreen({ T, dark }: { T: Tokens; dark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "0 16px 16px" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        style={{
          position: "relative",
          borderRadius: T.radiusLg,
          overflow: "hidden",
          aspectRatio: "1.4 / 1",
          marginBottom: 14,
          border: `0.5px solid ${T.border}`,
          transition: "border-radius 0.3s",
        }}
      >
        <img
          src="/paulo-post.jpeg"
          alt="Paulo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: dark ? "brightness(0.95)" : "brightness(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, color: "#fff" }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              opacity: 0.7,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Portfolio · 2026
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>Paulo Santos</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              marginTop: 4,
              opacity: 0.8,
            }}
          >
            <MapPin size={10} /> Engenharia da Computação
          </div>
        </div>
      </motion.div>

      <GlassCard T={T} style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: `2px solid ${T.accent}`,
            boxShadow: `0 0 0 3px ${T.accentDim}`,
          }}
        >
          <img
            src="/Paulo.jpeg"
            alt="Paulo avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>@paulosantos</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: T.muted,
              marginTop: 3,
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.green,
                display: "inline-block",
              }}
            />
            Disponível para projetos
          </div>
        </div>
      </GlassCard>

      <SectionLabel T={T}>Stack</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {TECHS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.03 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: T.surface,
              border: `0.5px solid ${T.border}`,
              borderRadius: T.radiusMd,
              padding: "10px 4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              transition: "border-radius 0.3s",
            }}
          >
            <t.Icon size={22} color={t.color} />
            <div style={{ fontSize: 9, color: T.muted, fontWeight: 500 }}>{t.name}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StyleScreen({
  T,
  accent,
  setAccent,
  radius,
  setRadius,
  font,
  setFont,
}: {
  T: Tokens;
  accent: string;
  setAccent: (v: string) => void;
  radius: number;
  setRadius: (v: number) => void;
  font: string;
  setFont: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: "0 16px 16px" }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: "8px 0 4px" }}>
        Estilo
      </h2>
      <p style={{ fontSize: 11, color: T.muted, margin: "0 0 4px" }}>
        A cor que você escolher aqui muda o site inteiro, ao vivo.
      </p>

      <SectionLabel T={T}>Cor primária</SectionLabel>
      <div style={{ display: "flex", gap: 10 }}>
        {ACCENTS.map((a) => (
          <motion.button
            key={a.name}
            onClick={() => setAccent(a.value)}
            whileTap={{ scale: 0.9 }}
            aria-label={a.name}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: a.value,
              border: accent === a.value ? `2px solid ${T.text}` : "2px solid transparent",
              boxShadow: accent === a.value ? `0 0 0 2px ${T.bg}` : "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <SectionLabel T={T}>Arredondamento (só no app)</SectionLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="range"
          min={4}
          max={28}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          style={{ flex: 1, accentColor: T.accent }}
        />
        <span style={{ fontSize: 11, color: T.muted, width: 32, textAlign: "right" }}>
          {radius}px
        </span>
      </div>

      <SectionLabel T={T}>Fonte (só no app)</SectionLabel>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {FONTS.map((f) => (
          <button
            key={f.name}
            onClick={() => setFont(f.value)}
            style={{
              padding: "8px 14px",
              borderRadius: T.radiusSm,
              border: `0.5px solid ${font === f.value ? T.accent : T.border}`,
              background: font === f.value ? T.accentDim : T.surface,
              color: T.text,
              fontSize: 12,
              fontFamily: f.value,
              cursor: "pointer",
            }}
          >
            {f.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function SocialScreen({ T }: { T: Tokens }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: "0 16px 16px" }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: "8px 0 4px" }}>
        Redes sociais
      </h2>
      <p style={{ fontSize: 11, color: T.muted, margin: "0 0 12px" }}>
        Vamos nos conectar?
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SOCIALS.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: T.surface,
              border: `0.5px solid ${T.border}`,
              borderRadius: T.radiusMd,
              padding: "12px 14px",
              textDecoration: "none",
              color: T.text,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: hexToRgba(s.color, 0.15),
                flexShrink: 0,
              }}
            >
              <s.Icon size={17} color={s.color} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

/* ── root ── */
export default function PhoneContent() {
  const [active, setActive] = useState<Page>("home");
  const [prev, setPrev] = useState<Page | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const time = useClock();

  const { accent, setAccent } = useAccent();
  const [radius, setRadius] = useState(18);
  const [font, setFont] = useState(FONTS[0].value);

  const T = makeTokens(dark, accent, radius);

  const navTo = (p: Page) => {
    if (p === active) return;
    setPrev(active);
    setActive(p);
  };
  const dir = prev ? (PAGES.indexOf(active) > PAGES.indexOf(prev) ? 1 : -1) : 1;

  const pageMap: Record<Page, ReactNode> = {
    home: <HomeScreen T={T} dark={dark} />,
    style: (
      <StyleScreen
        T={T}
        accent={accent}
        setAccent={setAccent}
        radius={radius}
        setRadius={setRadius}
        font={font}
        setFont={setFont}
      />
    ),
    social: <SocialScreen T={T} />,
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: T.bgGradient,
        color: T.text,
        fontFamily: font,
        transition: "background 0.4s, color 0.3s, font-family 0.3s",
      }}
    >
      <StatusBar time={time} dark={dark} onToggle={() => setTheme(dark ? "light" : "dark")} T={T} />

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            initial={{ x: `${dir * 100}%`, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: `${dir * -100}%`, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const i = PAGES.indexOf(active);
              if (info.offset.x < -80 && i < PAGES.length - 1) navTo(PAGES[i + 1]);
              if (info.offset.x > 80 && i > 0) navTo(PAGES[i - 1]);
            }}
          >
            {pageMap[active]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ padding: "0 14px 16px", flexShrink: 0 }}>
        <div
          style={{
            background: T.navBg,
            backdropFilter: "blur(20px)",
            border: `0.5px solid ${T.border}`,
            borderRadius: 999,
            padding: "10px 24px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {(
            [
              { id: "home", icon: <Home size={18} /> },
              { id: "style", icon: <Palette size={18} /> },
              { id: "social", icon: <Share2 size={18} /> },
            ] as { id: Page; icon: ReactNode }[]
          ).map((n) => (
            <motion.button
              key={n.id}
              onClick={() => navTo(n.id)}
              whileTap={{ scale: 0.88 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: 10,
                color: active === n.id ? T.accent : T.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "color 0.2s",
              }}
            >
              {n.icon}
              {active === n.id && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute",
                    bottom: -3,
                    left: "50%",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: T.accent,
                    marginLeft: -2.5,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}