"use client";

import React, { useState, useEffect, useRef, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spotlight } from "@/components/ui/spotlight-new";
import { cn } from "@/lib/utils";
import { sendMessage, type ContactState } from "@/app/actions/send-message";

const testimonials = [
  {
    quote: "Pedi um site simples pra minha loja e o resultado ficou muito acima do que eu esperava. Rápido, bonito e funciona perfeitamente no celular.",
    name: "Camila Duarte",
    title: "Dona da Camila Modas",
    avatar: "https://assets.aceternity.com/avatars/1.webp",
  },
  {
    quote: "Precisava de uma landing page pro lançamento do meu curso e recebi algo limpo, no prazo e sem complicação nenhuma. Comunicação muito clara do início ao fim.",
    name: "Rafael Tavares",
    title: "Criador de Conteúdo",
    avatar: "https://assets.aceternity.com/avatars/2.webp",
  },
  {
    quote: "Refez o site da minha pequena empresa e o resultado parece de empresa grande. Entendeu exatamente o que eu queria, mesmo eu não sabendo explicar direito.",
    name: "Juliana Martins",
    title: "Consultora de Marketing",
    avatar: "https://assets.aceternity.com/avatars/3.webp",
  },
];

function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.004;
      const w = canvas.width;
      const h = canvas.height;

      const grad = ctx.createRadialGradient(
        w * (0.3 + 0.2 * Math.sin(t)),
        h * (0.4 + 0.15 * Math.cos(t * 0.8)),
        0,
        w * 0.5, h * 0.5, w * 0.85
      );
      grad.addColorStop(0, `hsla(${340 + 20 * Math.sin(t)}, 80%, 38%, 1)`);
      grad.addColorStop(0.4, `hsla(${300 + 15 * Math.cos(t * 0.7)}, 65%, 28%, 1)`);
      grad.addColorStop(0.75, `hsla(${260 + 10 * Math.sin(t * 1.2)}, 50%, 18%, 1)`);
      grad.addColorStop(1, "hsla(220, 30%, 8%, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const grad2 = ctx.createRadialGradient(
        w * (0.7 + 0.15 * Math.cos(t * 1.1)),
        h * (0.6 + 0.2 * Math.sin(t * 0.9)),
        0,
        w * 0.6, h * 0.6, w * 0.5
      );
      grad2.addColorStop(0, `hsla(${320 + 25 * Math.cos(t)}, 85%, 45%, 0.6)`);
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/* ─── Painel esquerdo: shader + depoimentos ───────────────────────── */
function ShaderPanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[active];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-b-2xl lg:rounded-b-none lg:rounded-l-2xl">
      <ShaderCanvas />

      <svg className="pointer-events-none absolute inset-0 z-5 h-full w-full opacity-[0.22]">
        <filter id="shaderNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#shaderNoise)" />
      </svg>

      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="relative w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-md sm:p-6 md:p-8"
            >
              <svg className="mb-4 h-7 w-7 text-white/60 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-base font-medium leading-relaxed text-white sm:text-lg md:text-xl">{t.quote}</p>
              <div className="mt-6 flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/30" />
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/70">{t.title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === active ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Campo de input ──────────────────────────────────────────────── */
function Field({
  id,
  label,
  placeholder,
  type,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black shadow-sm ring-1 shadow-black/10 ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/5"
      />
    </div>
  );
}

/* ─── Formulário com server action ───────────────────────────────── */
function ContactForm() {
  const initialState: ContactState = { status: "idle", message: "" };
  const [state, formAction, isPending] = useActionState(sendMessage, initialState);

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        /* ── Estado de sucesso ── */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-4 py-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800"
          >
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-bold text-black dark:text-white">Mensagem enviada!</h3>
          <p className="max-w-xs text-sm text-neutral-600 dark:text-neutral-400">{state.message}</p>
        </motion.div>
      ) : (
        /* ── Formulário ── */
        <motion.form
          key="form"
          action={formAction}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 mt-6"
        >
          <Field id="name" label="Nome completo" placeholder="João Silva" type="text" required />
          <Field id="email" label="Email" placeholder="joao@email.com" type="email" required />
          <Field id="subject" label="Assunto" placeholder="Proposta de projeto" type="text" />

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="message" className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400">
              Mensagem <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Digite sua mensagem aqui..."
              className="block w-full rounded-md border-0 bg-white px-4 py-2 text-black shadow-sm ring-1 shadow-black/10 ring-black/10 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/5 resize-none"
            />
          </div>

          {/* Feedback de erro */}
          <AnimatePresence>
            {state.status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-red-500"
              >
                {state.message}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={!isPending ? { scale: 1.01 } : {}}
            whileTap={!isPending ? { scale: 0.98 } : {}}
            className="relative z-10 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-4 text-sm font-medium text-foreground transition duration-200 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar mensagem"
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ─── Conteúdo do modal ───────────────────────────────────────────── */
function ContactModalContent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-140"
    >
      {/* Esquerda: shader */}
      <div className="order-last h-48 sm:h-56 lg:order-first lg:h-auto">
        <ShaderPanel />
      </div>

      {/* Direita: formulário */}
      <div className="flex items-start justify-center px-5 py-8 sm:px-6 md:px-10">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h1 className="mt-4 text-2xl font-bold tracking-tight leading-9 text-black dark:text-white">
              Fale conosco
            </h1>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
              Entre em contato e retornarei o mais rápido possível.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Seção principal ─────────────────────────────────────────────── */
export default function ContactSection() {
  return (
    <section id="contact" className="min-h-160 w-full rounded-md flex items-center justify-center bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden py-20 md:py-0">
      <Spotlight />

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-175 h-64 sm:h-80 md:h-100 rounded-full bg-foreground/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] md:leading-[1.02] tracking-tight text-foreground"
        >
          Vamos
          <br />
          <span className="italic font-light text-foreground/50">conversar</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Tem um projeto, ideia ou dúvida? Estou disponível para novos desafios e colaborações. Respondo em até 24h.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm tracking-wide overflow-hidden shadow-lg shadow-foreground/10 hover:shadow-foreground/20 transition-shadow"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <span className="relative">Iniciar conversa</span>
                <motion.span
                  className="relative text-lg leading-none"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] sm:w-[90vw] max-w-[90vw] max-h-[90vh] p-0 overflow-y-auto rounded-2xl border-border bg-card shadow-2xl">
              <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-border to-transparent z-20" />
              <DialogHeader className="sr-only">
                <DialogTitle>Fale conosco</DialogTitle>
              </DialogHeader>
              <ContactModalContent />
            </DialogContent>
          </Dialog>

          <motion.a
            href="mailto:paulovictorsantosvc@gmail.com"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ou envie um e-mail direto <span className="text-xs opacity-60">↗</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}