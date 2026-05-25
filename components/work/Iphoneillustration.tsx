"use client";

import { useAnimate } from "motion/react";
import { useEffect, useRef } from "react";

function DynamicIsland({
  baseW, baseH, loadW, loadH, expandedW, expandedH,
}: {
  baseW: number; baseH: number;
  loadW: number; loadH: number;
  expandedW: number; expandedH: number;
}) {
  const [scope, animate] = useAnimate();

  const runSequence = async () => {
    await animate(scope.current, { width: loadW, height: loadH }, { duration: 0.5, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#ip-idle", { opacity: 0 }, { duration: 0.15 });
    await animate("#ip-loading", { opacity: 1 }, { duration: 0.2 });
    await new Promise(r => setTimeout(r, 1600));
    await animate(scope.current, { width: expandedW, height: expandedH }, { duration: 0.5, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#ip-loading", { opacity: 0 }, { duration: 0.15 });
    await animate("#ip-done", { opacity: 1 }, { duration: 0.25 });
    await new Promise(r => setTimeout(r, 2000));
    await animate("#ip-done", { opacity: 0 }, { duration: 0.2 });
    await animate(scope.current, { width: baseW, height: baseH }, { duration: 0.45, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#ip-idle", { opacity: 1 }, { duration: 0.2 });
  };

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const loop = async () => { await runSequence(); id = setTimeout(loop, 800); };
    id = setTimeout(loop, 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={scope} className="relative overflow-hidden rounded-4xl bg-black" style={{ width: baseW, height: baseH }}>
      <div id="ip-idle" className="absolute inset-0 flex items-center justify-center gap-1">
        <div className="h-1 w-1 rounded-full bg-[#1e1e1e]" />
        <div className="h-0.5 *:w-0.5 *:rounded-full bg-[#1a1a1a]" />
      </div>
      <div id="ip-loading" className="absolute inset-0 flex items-center justify-center gap-1" style={{ opacity: 0 }}>
        {[0,1,2].map(i => (
          <div key={i} className="h-0.75 w-0.75 animate-bounce rounded-full bg-white" style={{ animationDelay: `${i*0.18}s`, animationDuration: "0.8s" }} />
        ))}
      </div>

    </div>
  );
}

interface IphoneProps {
  content?: React.ReactNode;
}

export function IphoneIllustration({ content }: IphoneProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const isHovered = useRef(false);

  const onEnter = () => {
    if (isHovered.current) return;
    isHovered.current = true;
    animate(screenRef.current!, { opacity: 1, filter: "blur(0px)" }, { duration: 0.5, ease: "easeOut" });
  };

  const onLeave = () => {
    isHovered.current = false;
    animate(screenRef.current!, { opacity: 0, filter: "blur(8px)" }, { duration: 0.35 });
  };

  return (
    <div ref={scope} className="flex flex-col items-center cursor-pointer select-none" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="relative">
        {/* Side buttons — volume */}
        <div className="absolute -left-0.75 top-9.5 flex flex-col gap-1.25">
          <div className="h-2 w-0.75 rounded-l-0.5 *:bg-linear-to-b from-[#3a3a3a] to-[#2a2a2a]" />
          <div className="h-4 w-0.75 rounded-l-0.5 *:bg-linear-to-b from-[#3a3a3a] to-[#2a2a2a]" />
          <div className="h-4 w-0.75 rounded-l-0.5 *:bg-linear-to-b from-[#3a3a3a] to-[#2a2a2a]" />
        </div>
        {/* Power button */}
        <div className="absolute -right-0.75 top-14 h-6.5 w-0.75 rounded-r-0.5 *:bg-linear-to-b from-[#3a3a3a] to-[#2a2a2a]" />

        {/* Body */}
        <div className="w-25 rounded-[26px] *:bg-linear-to-b from-[#3a3a3a] to-[#222] p-1.25 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]">
          <div className="relative h-50 w-full overflow-hidden rounded-[22px] bg-[#0a0a0a]">
            {/* Dynamic Island */}
            <div className="absolute top-1.25 left-1/2 z-10 -translate-x-1/2">
              <DynamicIsland baseW={28} baseH={10} loadW={34} loadH={10} expandedW={82} expandedH={18} />
            </div>
            {/* Screen content */}
            <div ref={screenRef} className="h-full w-full" style={{ opacity: 0, filter: "blur(8px)" }}>
              {content ?? <DefaultIphoneContent />}
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-1.25 left-1/2 h-0.75 w-9 -translate-x-1/2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] tracking-wide text-neutral-600">iPhone 16 Pro</p>
    </div>
  );
}

function DefaultIphoneContent() {
  const apps = [
    { emoji: "📷", bg: "rgba(59,130,246,0.3)" },
    { emoji: "💬", bg: "rgba(16,185,129,0.3)" },
    { emoji: "🎵", bg: "rgba(239,68,68,0.3)" },
    { emoji: "🗺", bg: "rgba(245,158,11,0.3)" },
    { emoji: "📱", bg: "rgba(139,92,246,0.3)" },
    { emoji: "❤️", bg: "rgba(236,72,153,0.3)" },
  ];
  return (
    <div className="flex h-full flex-col *:bg-linear-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-2 pt-5.5">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-white/90">9:41</span>
        <div className="flex items-center gap-0.75">
          <div className="flex items-end gap-px">
            {[4,6,8,10].map(h => (
              <div key={h} className="w-0.5 *:rounded-[1px] bg-white/80" style={{ height: h }} />
            ))}
          </div>
          <div className="relative h-1.5 w-2.5 rounded-[1px] border border-white/60">
            <div className="h-full w-[75%] rounded-[1px] bg-green-400" />
          </div>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-1.25">
        {apps.map(({ emoji, bg }) => (
          <div key={emoji} className="flex aspect-square items-center justify-center rounded-2 text-[11px]" style={{ background: bg }}>
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}