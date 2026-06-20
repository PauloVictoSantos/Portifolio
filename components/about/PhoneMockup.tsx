import type { ReactNode } from "react";
import { useTheme } from "next-themes";

interface PhoneMockupProps {
  children: ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <div
      className="relative mx-auto"
      style={{
        width: 372,
        height: 760,
        filter: dark
          ? "drop-shadow(0 40px 80px rgba(124,111,207,0.25)) drop-shadow(0 20px 40px rgba(0,0,0,0.6))"
          : "drop-shadow(0 40px 80px rgba(124,111,207,0.18)) drop-shadow(0 20px 40px rgba(0,0,0,0.18))",
      }}
    >
      {/* Outer frame with gradient border */}
      <div
        className="absolute inset-0 rounded-[55px] p-0.75"
        style={{
          background: dark
            ? "linear-gradient(145deg, #2a2a32 0%, #0a0a0e 50%, #1a1a20 100%)"
            : "linear-gradient(145deg, #4a4a52 0%, #1a1a20 50%, #2a2a30 100%)",
        }}
      >
        <div className="relative h-full w-full rounded-[52px] bg-black p-2.5">
          {/* Dynamic island / notch */}
          <div
            className="absolute top-3.5 left-1/2 -translate-x-1/2 h-7.5 w-27.5 rounded-full z-30"
            style={{
              background: "#000",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#1a1a1f]" />
          </div>

          {/* Screen */}
          <div className="relative h-full w-full rounded-[42px] overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div
        className="absolute top-27.5 -left-0.75 h-12 w-0.75 rounded-l-md"
        style={{ background: "#1a1a1f" }}
      />
      <div
        className="absolute top-42.5 -left-0.75 h-16 w-0.75 rounded-l-md"
        style={{ background: "#1a1a1f" }}
      />
      <div
        className="absolute top-60 -left-0.75 h-16 w-0.75 rounded-l-md"
        style={{ background: "#1a1a1f" }}
      />
      <div
        className="absolute top-40 -right-0.75 h-20 w-0.75 rounded-r-md"
        style={{ background: "#1a1a1f" }}
      />
    </div>
  );
}
