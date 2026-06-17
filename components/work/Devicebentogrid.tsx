"use client";

import { MacbookIllustration } from "./Macbookillustration";
import { IphoneIllustration } from "./Iphoneillustration";
import { IpadIllustration } from "./Ipadillustration";
import { cn } from "@/lib/utils";
import { useAnimate } from "motion/react";
import { useEffect } from "react";
import ChatServiceRequest from "../ui/Chatservicerequest";

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
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mx-auto mt-1 max-w-lg text-balance text-sm text-foreground/50">{description}</p>
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
            title="Experiência completa em telas grandes"
            description="Interfaces fluidas, robustas e projetadas para máxima produtividade no desktop."
          />
        </BentoCard>
        <BentoCard>
          <SyncPill />
        </BentoCard>
        <BentoCard>
          <IphoneIllustration />
          <CardText
            title="Responsivo por padrão."
            description="Uma experiência leve, impecável e intuitiva na palma da mão."
          />
        </BentoCard>

        <BentoCard className="md:col-span-2">
          <IpadIllustration />
          <CardText
            title="Adaptável para qualquer tela"
            description="ayouts inteligentes que aproveitam cada pixel, de tablets a monitores ultrawide."
          />
        </BentoCard>
      </div>
    </div>
  );
}

function SyncPill() {
  return (
    <div className="flex min-h-24 items-center justify-center">
        <ChatServiceRequest />
    </div>
  );
}
