"use client"
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  words: string[];
  className?: string;
  interval?: number;
}

export function WordRotate({ words, className, interval = 2200 }: Props) {
  const [index, setIndex] = useState(0);
  const widthRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      <span ref={widthRef} className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      {words.map((w, i) => (
        <span
          key={w}
          className={cn(
            "absolute inset-0 flex items-center justify-start whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            i === index
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0",
          )}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
