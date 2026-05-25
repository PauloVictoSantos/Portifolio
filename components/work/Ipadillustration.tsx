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
    await animate("#ipad-idle", { opacity: 0 }, { duration: 0.15 });
    await animate("#ipad-loading", { opacity: 1 }, { duration: 0.2 });
    await new Promise(r => setTimeout(r, 1600));
    await animate(scope.current, { width: expandedW, height: expandedH }, { duration: 0.5, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#ipad-loading", { opacity: 0 }, { duration: 0.15 });
    await animate("#ipad-done", { opacity: 1 }, { duration: 0.25 });
    await new Promise(r => setTimeout(r, 2000));
    await animate("#ipad-done", { opacity: 0 }, { duration: 0.2 });
    await animate(scope.current, { width: baseW, height: baseH }, { duration: 0.45, ease: [0.34, 1.2, 0.64, 1] });
    await animate("#ipad-idle", { opacity: 1 }, { duration: 0.2 });
  };

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const loop = async () => { await runSequence(); id = setTimeout(loop, 800); };
    id = setTimeout(loop, 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={scope} className="relative overflow-hidden rounded-4xl bg-black" style={{ width: baseW, height: baseH }}>
      <div id="ipad-idle" className="absolute inset-0 flex items-center justify-center gap-1">
        <div className="h-1 w-1 rounded-full bg-[#1e1e1e]" />
        <div className="h-0.5 w-0.5 rounded-full bg-[#1a1a1a]" />
      </div>
      <div id="ipad-loading" className="absolute inset-0 flex items-center justify-center gap-1" style={{ opacity: 0 }}>
        {[0,1,2].map(i => (
          <div key={i} className="h-0.75 w-0.75 animate-bounce rounded-full bg-white" style={{ animationDelay: `${i*0.18}s`, animationDuration: "0.8s" }} />
        ))}
      </div>
    </div>
  );
}

interface IpadProps {
  content?: React.ReactNode;
}

export function IpadIllustration({ content }: IpadProps) {
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
        {/* power button top */}
        <div className="absolute -top-0.75 right-9 h-0.75 w-4.5 rounded-t-0.5 bg-[#3a3a3a]" />
        {/* volume buttons right */}
        <div className="absolute -right-0.75 top-7 flex flex-col gap-1.5">
          <div className="h-4 w-0.75 rounded-r-0.5 bg-[#3a3a3a]" />
          <div className="h-4 w-0.75 rounded-r-0.5 bg-[#3a3a3a]" />
        </div>

        {/* Body */}
        <div className="w-40 rounded-[18px] bg-linear-to-br from-[#3a3a3a] to-[#222] p-1.25 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]">
          <div className="relative h-32.5 w-full overflow-hidden rounded-[14px] bg-[#0a0a0a]">
            {/* Dynamic Island */}
            <div className="absolute top-1.25 left-1/2 z-10 -translate-x-1/2">
              <DynamicIsland baseW={32} baseH={10} loadW={38} loadH={10} expandedW={88} expandedH={18} />
            </div>
            {/* Screen content */}
            <div ref={screenRef} className="h-full w-full" style={{ opacity: 0, filter: "blur(8px)" }}>
              {content ?? <DefaultIpadContent />}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] tracking-wide text-neutral-600">iPad Pro</p>
    </div>
  );
}

function DefaultIpadContent() {
  return (
    <div className="flex h-full flex-col gap-1.25 bg-linear-to-br from-[#0d1b2a] to-[#1a1a2e] p-2 pt-5.5">
      <div className="h-1.25 w-[60%] rounded-0.75 bg-white/10" />
      <div className="h-1.25 w-[40%] rounded-0.75 bg-white/10" />
      <div className="mt-1 flex flex-1 gap-1">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex-1 rounded-[5px] bg-indigo-500/20" />
          <div className="flex-1 rounded-[5px] bg-white/5" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex-1 rounded-[5px] bg-white/5" />
          <div className="flex-1 rounded-[5px] bg-purple-500/20" />
        </div>
      </div>
    </div>
  );
}