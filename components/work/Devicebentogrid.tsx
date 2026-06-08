"use client";

import { MacbookIllustration } from "./Macbookillustration";
import { IphoneIllustration } from "./Iphoneillustration";
import { IpadIllustration } from "./Ipadillustration";
import { cn } from "@/lib/utils";
import { useAnimate } from "motion/react";
import { useEffect } from "react";

function BentoCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-between gap-6 rounded-2xl p-4 md:p-8",
      "shadow-sm ring-1 shadow-black/5 ring-black/5",
      "dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10",
      className
    )}>
      {children}
    </div>
  );
}

function CardText({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-balance text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  );
}

export function DeviceBentoGrid() {
  return (
    <div id="word" className="mx-auto w-full px-4 py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BentoCard className="md:col-span-2">
          <MacbookIllustration />
          <CardText
            title="Desktop builds in minutes"
            description="Ship faster with instant previews and seamless deployment pipelines."
          />
        </BentoCard>
        <BentoCard>
          <SyncPill />
          <CardText title="Everything in sync" description="Real-time sync across devices." />
        </BentoCard>
        <BentoCard>
          <IphoneIllustration />
          <CardText
            title="Mobile compatible, everywhere"
            description="Responsive by default. Works on every device."
          />
        </BentoCard>

        <BentoCard className="md:col-span-2">
          <IpadIllustration />
          <CardText
            title="Tablet ready, always"
            description="Optimized layouts for tablets and large screens out of the box."
          />
        </BentoCard>
      </div>
    </div>
  );
}

function SyncPill() {
  return (
    <div className="flex min-h-24 items-center justify-center">
      {/* reuse DynamicIsland logic inline as a bigger pill */}
      <div className="relative h-8 w-36 overflow-hidden rounded-2xl bg-black shadow-lg">
        <SyncStates />
      </div>
    </div>
  );
}

function SyncStates() {
  const [scope, animate] = useAnimate();

  const run = async () => {
    await new Promise(r => setTimeout(r, 800));
    await animate("#s-idle", { opacity: 0 }, { duration: 0.2 });
    await animate("#s-loading", { opacity: 1 }, { duration: 0.2 });
    await new Promise(r => setTimeout(r, 2000));
    await animate("#s-loading", { opacity: 0 }, { duration: 0.2 });
    await animate("#s-done", { opacity: 1 }, { duration: 0.25 });
    await new Promise(r => setTimeout(r, 2200));
    await animate("#s-done", { opacity: 0 }, { duration: 0.2 });
    await animate("#s-idle", { opacity: 1 }, { duration: 0.2 });
  };

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const loop = async () => { await run(); id = setTimeout(loop, 600); };
    id = setTimeout(loop, 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={scope} className="h-full w-full">
      <div id="s-idle" className="absolute inset-0 flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-neutral-700" />
        <span className="text-xs font-medium text-neutral-400">Waiting</span>
      </div>
      <div id="s-loading" className="absolute inset-0 flex items-center justify-center gap-2" style={{ opacity: 0 }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        <span className="text-xs font-medium text-white">Syncing...</span>
      </div>
      <div id="s-done" className="absolute inset-0 flex items-center justify-center gap-2" style={{ opacity: 0 }}>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-medium text-white">All synced</span>
      </div>
    </div>
  );
}