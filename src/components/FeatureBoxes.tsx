"use client";

import React from "react";

type ExpandSide = "left" | "center" | "right";

type ActiveOverlay = {
  side: ExpandSide;
  rect: DOMRect;
  title: string;
  triggerEl: HTMLElement | null;
  heroSrc: string;
};

export default function FeatureBoxes() {
  const leftRef = React.useRef<HTMLDivElement | null>(null);
  const centerRef = React.useRef<HTMLDivElement | null>(null);
  const rightRef = React.useRef<HTMLDivElement | null>(null);

  const [active, setActive] = React.useState<ActiveOverlay | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  const open = React.useCallback((side: ExpandSide, ref: React.RefObject<HTMLDivElement | null>, title: string, heroSrc: string) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setActive({ side, rect, title, triggerEl: ref.current, heroSrc });
    // next frame => expand
    requestAnimationFrame(() => setExpanded(true));
  }, []);

  const close = React.useCallback(() => {
    setExpanded(false);
  }, []);

  // Hide body scroll while overlay is open
  React.useEffect(() => {
    if (active && expanded) {
      const prev = document.documentElement.style.overflowY;
      document.documentElement.style.overflowY = "hidden";
      return () => {
        document.documentElement.style.overflowY = prev;
      };
    }
  }, [active, expanded]);

  // ESC to close
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  // When collapse finishes, clear state
  const handleTransitionEnd = React.useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!expanded) {
      setActive(null);
    }
  }, [expanded]);

  const renderOverlayContent = () => {
    return (
      <div className="relative flex h-full w-full flex-col overflow-auto">
        {/* Fixed close button */}
        <button
          aria-label="Close overlay"
          onClick={close}
          className="fixed right-6 top-6 z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 ring-1 ring-[var(--primary)]/20 backdrop-blur-md hover:text-white hover:border-white/30 hover:bg-black/50 shadow-lg"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {/* Hero illustration */}
        <div className="pointer-events-none relative mx-auto w-full max-w-5xl px-6 pt-14 md:px-8 md:pt-20">
          <div className="relative mx-auto w-full overflow-auto rounded-2xl border border-white/10 bg-black/30 shadow-xl">
            <div className="relative aspect-[16/9] w-full">
              {active?.heroSrc && (
                <img src={active.heroSrc} alt="Hero" className="absolute inset-0 h-full w-full object-contain md:object-cover opacity-90" />
              )}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
        <div className="pointer-events-auto mx-auto w-full max-w-4xl grow px-6 pb-16 pt-8 md:px-8 h-full flex flex-col">
          <h2 className="text-3xl mb-10 font-semibold md:text-6xl">{active?.title ?? "Purpose-built for product development"}</h2>
          <div className=" space-y-6 text-white/80">
            <p>
              Linear was developed with a specific purpose: to empower product teams to do their best work. Every aspect is intentionally designed to help teams focus on what they do best: Planning, building, and shipping great products.
            </p>
            <p>
              Because of its fit-to-purpose design, Linear is incredibly easy to use, but grows more powerful as you scale. It’s principled where it needs to be, but provides enough flexibility to adapt to your team’s unique way of working.
            </p>
            <p>
              We believe that this approach creates a better way to build products. And more than 15,000 product teams around the globe – from early-stage startups to public companies – agree.
            </p>
          </div>

          <div className="w-full max-w-4xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className=" rounded-xl border border-white/10 bg-white/5 p-6 text-white/80">
            <p className="italic">
              “We’d tried many tools before Linear but none of them felt like they were made for the way we work. Linear was a breath of fresh air - speedy, snappy, and a pleasure to use.”
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center opacity-70">
            <img src="/icons/logos/Vercel_Logo_0.svg" alt="Vercel" className="h-5" />
          </div>
          {/* Divider line */}
          <div className="mx-auto my-10 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Stats 2x2 grid */}
          <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-x-8 gap-y-10 md:gap-x-12">
            <div>
              <div className="text-6xl font-semibold leading-none tracking-tight text-white">15k</div>
              <div className="mt-2 text-sm text-white/70">Paying customers</div>
            </div>
            <div>
              <div className="text-6xl font-semibold leading-none tracking-tight text-white">500k+</div>
              <div className="mt-2 text-sm text-white/70">Active users</div>
            </div>
            <div>
              <div className="text-6xl font-semibold leading-none tracking-tight text-white">45%</div>
              <div className="mt-2 text-sm text-white/70">of YC companies build with Linear</div>
            </div>
            <div>
              <div className="text-6xl font-semibold leading-none tracking-tight text-white">66%</div>
              <div className="mt-2 text-sm text-white/70">of the top AI startups use Linear</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sideToOrigin = (side: ExpandSide): string => {
    if (side === "left") return "left center";
    if (side === "right") return "right center";
    return "center center";
  };

  const computeTransform = (rect: DOMRect, side: ExpandSide): { transform: string; origin: string } => {
    const vw = typeof window !== "undefined" ? window.innerWidth : rect.width;
    const vh = typeof window !== "undefined" ? window.innerHeight : rect.height;
    const scaleX = Math.max(0.001, rect.width / vw);
    const scaleY = Math.max(0.001, rect.height / vh);
    const origin = sideToOrigin(side);

    // Translate based on origin so the scaled overlay aligns to the card
    let translateX = 0;
    let translateY = 0;
    if (origin === "left center") {
      translateX = rect.left;
      translateY = rect.top + rect.height / 2 - vh / 2;
    } else if (origin === "right center") {
      translateX = rect.right - vw;
      translateY = rect.top + rect.height / 2 - vh / 2;
    } else {
      // center center
      translateX = rect.left + rect.width / 2 - vw / 2;
      translateY = rect.top + rect.height / 2 - vh / 2;
    }

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
      origin,
    };
  };

  return (
    <>
      <div className="flex justify-left gap-2 p-6 z-50">
        <div
          ref={leftRef}
          onClick={() => open("left", leftRef, "Purpose-built for product development", "https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/93514696-592a-4764-aa98-b6101349a100/f=auto,dpr=2,q=95,fit=scale-down,metadata=none")}
          className="min-w-[336px] min-h-[360px] rounded-2xl bg-white/5 hover:bg-white/10 transition-colors hover:border-[#00D4FF]/5 overflow-hidden relative group cursor-pointer"
        >
          <img
            src="https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/93514696-592a-4764-aa98-b6101349a100/f=auto,dpr=2,q=95,fit=scale-down,metadata=none"
            alt="Purpose-built for product development"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
            <span className="text-white font-medium text-xl max-w-52">Purpose-built for product development</span>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#9c9da1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4V7.25H4C3.58579 7.25 3.25 7.58579 3.25 8C3.25 8.41421 3.58579 8.75 4 8.75H7.25V12C7.25 12.4142 7.58579 12.75 8 12.75C8.41421 12.75 8.75 12.4142 8.75 12V8.75H12C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25H8.75V4Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div
          ref={centerRef}
          onClick={() => open("center", centerRef, "Designed to move fast", "https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/5a4ff140-41a2-42dd-0723-e14cccc3e300/f=auto,dpr=2,q=95,fit=scale-down,metadata=none")}
          className="min-w-[336px] min-h-[360px] rounded-2xl  bg-white/5 hover:bg-white/10 transition-colors hover:border-[#00D4FF]/5 overflow-hidden relative group cursor-pointer"
        >
          <img
            src="https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/5a4ff140-41a2-42dd-0723-e14cccc3e300/f=auto,dpr=2,q=95,fit=scale-down,metadata=none"
            alt="Designed to move fast"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
            <span className="text-white font-medium text-xl">Designed to move fast</span>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#9c9da1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4V7.25H4C3.58579 7.25 3.25 7.58579 3.25 8C3.25 8.41421 3.58579 8.75 4 8.75H7.25V12C7.25 12.4142 7.58579 12.75 8 12.75C8.41421 12.75 8.75 12.4142 8.75 12V8.75H12C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25H8.75V4Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div
          ref={rightRef}
          onClick={() => open("right", rightRef, "Crafted to perfection", "https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/0068f657-fe3f-47e9-6819-0ba9e6533900/f=auto,dpr=2,q=95,fit=scale-down,metadata=none")}
          className="min-w-[336px] min-h-[360px] rounded-2xl  bg-white/5 hover:bg-white/10 transition-colors hover:border-[#00D4FF]/5 overflow-hidden relative group cursor-pointer"
        >
          <img
            src="https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/0068f657-fe3f-47e9-6819-0ba9e6533900/f=auto,dpr=2,q=95,fit=scale-down,metadata=none"
            alt="Crafted to perfection"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
            <span className="text-white font-medium text-xl">Crafted to perfection</span>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#9c9da1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4V7.25H4C3.58579 7.25 3.25 7.58579 3.25 8C3.25 8.41421 3.58579 8.75 4 8.75H7.25V12C7.25 12.4142 7.58579 12.75 8 12.75C8.41421 12.75 8.75 12.4142 8.75 12V8.75H12C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25H8.75V4Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Expanding overlay */}
      {active && (
        <div className="fixed inset-0 z-50">
        <div style={{
                position: 'fixed',
                inset: '5vh 0 0 0',
                marginInline: 'auto',
                maxWidth: '960px',
                background: '#0f1011',
                zIndex: '700',
                borderRadius: '30px 30px 0 0',
                outline: 'none',
                contain: 'strict',
                isolation: 'isolate',
                pointerEvents: 'auto',
                transform: 'none',
                transformOrigin: '50% 50% 0px',
                
        }}>
        <div className="relative w-full h-full flex justify-center inset-0 backdrop-blur-sm" aria-modal="true" role="dialog">
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}
            onClick={close}
          />
          <div
            ref={overlayRef}
            onTransitionEnd={handleTransitionEnd}
            className="absolute left-0 top-0 h-[100vh] w-[100vw] border border-white/10 bg-white/5 shadow-2xl"
            style={(function() {
              const { transform, origin } = computeTransform(active.rect, active.side);
              const styleObj: React.CSSProperties = {
                borderRadius: expanded ? 24 : 16,
                transition: "transform 420ms cubic-bezier(0.2,0.8,0.2,1), border-radius 380ms ease",
                transform: expanded ? "translate(0px, 0px) scale(1, 1)" : transform,
                transformOrigin: origin as React.CSSProperties["transformOrigin"],
              };
              return styleObj;
            })()}
          >
            <div className={`relative h-full w-full transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}>
              {renderOverlayContent()}
            </div>
          </div>
        </div>
        </div>
        </div>
      )}
    </>
  );
}


