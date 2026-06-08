"use client"
import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-100 hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40 bg-foreground/5 backdrop-blur transition-all duration-300 ease-out"
        style={{
          width: hover ? 48 : 14,
          height: hover ? 48 : 14,
          opacity: hover ? 1 : 0.7,
        }}
      />
    </div>
  );
}
