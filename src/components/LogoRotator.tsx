"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";

type LogoRotatorProps = {
  groups: string[][]; // 6 groups, each with 3 image paths
  intervalMs?: number;
};

export default function LogoRotator({ groups, intervalMs = 1000 }: LogoRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [effectiveInterval, setEffectiveInterval] = useState(intervalMs);

  const maxItems = useMemo(() => {
    return groups.length > 0 ? Math.max(...groups.map((g) => Math.max(1, g.length))) : 1;
  }, [groups]);

  const flatLogos =   useMemo(() => {
    return groups.flat();
  }, [groups]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setInitializing(false));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Sync JS interval to CSS animation durations + delay so handoff aligns
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const parseTime = (v: string) => {
      const value = v.trim();
      if (!value) return 0;
      if (value.endsWith("ms")) return parseFloat(value);
      if (value.endsWith("s")) return parseFloat(value) * 1000;
      const num = parseFloat(value);
      return Number.isNaN(num) ? 0 : num;
    };
    const durationIn = parseTime(cs.getPropertyValue("--duration-in"));
    const durationOut = parseTime(cs.getPropertyValue("--duration-out"));
    const delayIn = parseTime(cs.getPropertyValue("--delay-in"));
    const totalIn = delayIn + durationIn;
    const newInterval = Math.max(durationOut, totalIn);
    setEffectiveInterval(Math.max(intervalMs, newInterval));
  }, [intervalMs]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % maxItems;
      });
    }, effectiveInterval);
    return () => clearInterval(id);
  }, [effectiveInterval, maxItems]);

  return (
    <div ref={containerRef} className="relative group mx-auto max-w-7xl p-6 logo-rotator">
      {/* md and up: 3x2 grid with item-index rotation */}
      <div className="hidden md:grid grid-cols-3 gap-x-10 gap-y-8 items-center justify-items-center">
        {groups.map((group, idx) => {
          const currentSrc = group[(activeIndex % group.length + group.length) % group.length];
          const prevSrc = group[(prevIndex % group.length + group.length) % group.length];
          const altCurrent = currentSrc.split("/").pop()?.replace(/[-_]/g, " ") ?? "logo";
          const altPrev = prevSrc.split("/").pop()?.replace(/[-_]/g, " ") ?? "logo";
          return (
            <div key={idx} className="relative h-10 w-[100px] flex items-center justify-center">
              {prevSrc && !initializing && (
                <img
                  key={prevSrc + "-out"}
                  src={prevSrc}
                  alt={altPrev}
                  className={
                    "absolute inset-0 m-auto h-full max-h-10 w-full max-w-[100px] object-contain logo-img logo-prev"
                  }
                />
              )}
              <img
                key={currentSrc + "-in"}
                src={currentSrc}
                alt={altCurrent}
                className={
                  "absolute inset-0 m-auto h-full max-h-10 w-full max-w-[100px] object-contain logo-img " +
                  (initializing ? "logo-initial" : "logo-cur")
                }
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* Small screens: infinite marquee carousel */}
      <div className="block md:hidden overflow-hidden">
        <div className="marquee marquee-paused flex items-center gap-12">
          {[...flatLogos, ...flatLogos].map((src, i) => (
            <img
              key={src + "-" + i}
              src={src}
              alt={src.split("/").pop()?.replace(/[-_]/g, " ") ?? "logo"}
              className="h-10 w-[100px] object-contain opacity-90"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Hover overlay with blurred background and CTA */}
      <div className="pointer-events-none w-full h-full text-sm backdrop-blur-md absolute cursor-pointer inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <a href="#customers" className=" px-4 py-1 border border-white/10 bg-white/10 hover:bg-white/10 transition-colors hover:border-[#00D4FF]/5 rounded-full">Meet our customers &gt;</a>
      </div>
      <style jsx>{`
        /* Editable animation design tokens */
        .logo-rotator {
          --scale-hidden: 0.6;
          --duration-in: 1200ms;
          --duration-out: 1400ms;
          --blur-hidden: 8px;
          --delay-in: 300ms; /* delay before the incoming logo starts animating */
        }

        /* Adjust these % to tune overlap vs gap:
           - logoOut  "45%" is when the old logo becomes fully hidden
           - logoIn   "55%" is when the new logo starts to appear
           Increasing the gap between them creates a period where both are invisible. */
        @keyframes logoOut {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          45% { opacity: 0; transform: scale(var(--scale-hidden)); filter: blur(var(--blur-hidden)); }
          100% { opacity: 0; transform: scale(var(--scale-hidden)); filter: blur(var(--blur-hidden)); }
        }

        @keyframes logoIn {
          0% { opacity: 0; transform: scale(var(--scale-hidden)); filter: blur(var(--blur-hidden)); }
          55% { opacity: 0; transform: scale(var(--scale-hidden)); filter: blur(var(--blur-hidden)); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        /* Initial mount should simply fade/scale in without the gap */
        @keyframes logoInitial {
          0% { opacity: 0; transform: scale(var(--scale-hidden)); filter: blur(var(--blur-hidden)); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        .logo-img {
          animation-fill-mode: both;
          will-change: transform, opacity, filter;
        }
        .logo-prev { animation: logoOut var(--duration-out) ease-out; }
        .logo-cur { animation: logoIn var(--duration-in) ease-out;}
        .logo-initial { animation: logoInitial var(--duration-in) ease-out; }
      `}</style>
    </div>
  );
}


