"use client";

import { useAnimate } from "motion/react";
import { useEffect, useRef } from "react";

function DynamicIsland() {
  const [scope, animate] = useAnimate();

  const runSequence = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    await animate(scope.current, { width: 44, height: 12 }, { duration: 0.6, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#di-idle", { opacity: 0 }, { duration: 0.15 });
    await animate("#di-loading", { opacity: 1 }, { duration: 0.2 });
    await new Promise((r) => setTimeout(r, 1700));
    await animate(scope.current, { width: 114, height: 20 }, { duration: 0.8, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#di-loading", { opacity: 0 }, { duration: 0.15 });
    await animate("#di-done", { opacity: 1 }, { duration: 0.25 });
    await new Promise((r) => setTimeout(r, 2400));
    await animate("#di-done", { opacity: 0 }, { duration: 0.2 });
    await animate(scope.current, { width: 36, height: 12 }, { duration: 0.6, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#di-idle", { opacity: 1 }, { duration: 0.2 });
  };

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = async () => { await runSequence(); t = setTimeout(loop, 700); };
    t = setTimeout(loop, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={scope}
      className="relative overflow-hidden rounded-4xl bg-black"
      style={{ width: 36, height: 12 }}
    >
      <div id="di-idle" className="absolute inset-0 flex items-center justify-center gap-1">
        <div className="h-1 w-1 rounded-full bg-[#1e1e1e]" />
        <div className="h-0.5 w-0.5 rounded-full bg-[#1a1a1a]" />
      </div>
      <div id="di-loading" className="absolute inset-0 flex items-center justify-center gap-1" style={{ opacity: 0 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1 w-1 animate-bounce rounded-full bg-white"
            style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.8s" }}
          />
        ))}
      </div>

    </div>
  );
}

function DefaultMacContent() {
  return (
    <div className="flex h-full w-full flex-col bg-linear-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      <div className="flex h-3.5 shrink-0 items-center gap-0.75 bg-black/70 px-1.75">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} className="h-1 w-1 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="flex flex-1 gap-1 p-1.25">
        <div className="flex w-11 flex-col gap-0.75 rounded-lg bg-white/4 p-1.25">
          {[null, "active", null, null].map((s, i) => (
            <div key={i} className="h-1.25 rounded-0.5"
              style={{ width: s ? "72%" : "100%", background: s ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-0.75 p-1.25">
          <div className="h-1.25 w-[85%] rounded-0.5 bg-white/10" />
          <div className="h-1.25 w-[65%] rounded-0.5 bg-white/10" />
          <div className="my-0.75 h-5.5 rounded-lg bg-indigo-500/20" />
          <div className="h-1.25 w-[90%] rounded-0.5 bg-white/10" />
          <div className="h-1.25 w-[70%] rounded-0.5 bg-white/10" />
        </div>
      </div>
    </div>
  );
}

interface MacbookIllustrationProps {
  content?: React.ReactNode;
}

export function MacbookIllustration({ content }: MacbookIllustrationProps) {
  const [scope, animate] = useAnimate();
  const lidRef = useRef<HTMLDivElement>(null);
  const scrRef = useRef<HTMLDivElement>(null);
  const isOpen = useRef(false);

  const open = async () => {
    if (isOpen.current) return;
    isOpen.current = true;
    animate(lidRef.current!, { rotateX: 0 }, { duration: 0.8, ease: [0.34, 1.4, 0.64, 1] });
    animate(scrRef.current!, { opacity: 1, filter: "blur(0px)" }, { duration: 0.55, delay: 0.3, ease: "easeOut" });
  };

  const close = () => {
    isOpen.current = false;
    animate(scrRef.current!, { filter: "black" }, { duration: 0.4 });
    animate(lidRef.current!, { rotateX: -60 }, { duration: 0.65, ease: [0.42, 0, 0.58, 1] });
  };

  return (
    <div
      ref={scope}
      className="flex cursor-pointer select-none flex-col items-center"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <div style={{ perspective: 1000, perspectiveOrigin: "50% 100%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div
          ref={lidRef}
          style={{ transformOrigin: "bottom center", rotateX: 20 } as React.CSSProperties}
          className="relative flex h-43.75 w-70 items-center justify-center
            rounded-t-[10px] rounded-b-0.5
            bg-linear-to-br from-[#2a2a2a] via-[#1c1c1c] to-[#161616]
            ring-[1.5px] ring-white/8
            shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_-2px_12px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute top-1.5 left-1/2 z-10 h-1.25 w-1.25 -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
          <div className="relative h-37.5 w-62.5 overflow-hidden rounded-1.25 bg-linear-to-br from-[#3a3a3a] to-[#222]">
            <div className="absolute top-1.25 left-1/2 z-20 -translate-x-1/2">
              <DynamicIsland />
            </div>
            <div ref={scrRef} className="h-full w-full" style={{ opacity: 0.3, filter: "blur(4px)" }}>
              {content ?? <DefaultMacContent />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-3.25 w-73.5 items-end justify-center
        rounded-b-[7px] rounded-t-0.5
        bg-linear-to-b from-[#252525] to-[#1a1a1a]
        ring-[1.5px] ring-white/[0.07]
        shadow-[0_4px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.07)]"
      >
        <div className="mb-0 h-1.75 w-13 rounded-b-1.25 bg-black/35 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]" />
      </div>

      <div
        className="mt-px h-2 w-70"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.5) 0%, transparent 80%)" }}
      />

      <p className="mt-3 text-[11px] tracking-wide text-neutral-600 dark:text-neutral-500">
        MacBook Pro
      </p>
    </div>
  );
}