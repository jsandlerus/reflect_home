import Perspective from "@/components/Perspective";
import LogoRotator from "@/components/LogoRotator";
import FeatureBoxes from "@/components/FeatureBoxes";
import fs from "node:fs";
import path from "node:path";



export default function Home() {
  // Build-time read of public/icons/logos to collect image paths
  const logosDir = path.join(process.cwd(), "public", "icons", "logos");
  let allLogos: string[] = [];
  try {
    allLogos = fs
      .readdirSync(logosDir, { withFileTypes: true })
      .filter((e) => e.isFile() && /(\.svg|\.png)$/i.test(e.name))
      .map((e) => `/icons/logos/${e.name}`)
      .sort();
  } catch {
    allLogos = [];
  }
  // Ensure exactly 6 groups of 3 (fallbacks if fewer files)
  const safe = allLogos.length > 0 ? allLogos : [
    "/icons/logos/Vercel_Logo_0.svg",
    "/icons/logos/Ramp_idB_fuD3sk_0.svg",
    "/icons/logos/Brex_idwr3R84k6_0.svg",
    "/icons/logos/Monzo_idUoZh4d3__0.svg",
    "/icons/logos/Scale AI_idG5AdKF6r_0.svg",
    "/icons/logos/Raycast_idFXwWODyV_0.svg",
    "/icons/logos/Runway_idHapR91Bz_0.svg",
    "/icons/logos/Retool_Logo_0.svg",
    "/icons/logos/Remote_idvc80hKJj_0.svg",
  ];
  const groups: string[][] = Array.from({ length: 6 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => safe[(i * 3 + j) % safe.length])
  );
  return (
    <div className="relative isolate max-w-5xl mx-auto">
          <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgb(10_10_15_/_0.6)] backdrop-blur-md backdrop-saturate-150">
              <div className="flex h-16 px-6 items-center justify-between gap-6">
                <a href="/" className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="shrink-0">
                    <defs>
                      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10" fill="url(#lg)" opacity="0.9" />
                  </svg>
                  <span className="text-sm font-semibold tracking-tight">Linear</span>
                </a>
                <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
                  <a href="#product" className="hover:text-white">Product</a>
                  <a href="#resources" className="hover:text-white">Resources</a>
                  <a href="#pricing" className="hover:text-white">Pricing</a>
                  <a href="#customers" className="hover:text-white">Customers</a>
                  <a href="#now" className="hover:text-white">Now</a>
                  <a href="#contact" className="hover:text-white">Contact</a>
                </nav>
                <div className="flex items-center gap-3">
                  <a href="#login" className="text-sm text-white/70 hover:text-white">Log in</a>
                  <a
                    href="#signup"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Sign up
                  </a>
                </div>
              </div>
          </header>
      <section className="relative mx-auto max-w-5xl px-6">
        <div className="flex items-left">
          <div className="relative mt-20 z-10 text-center md:text-left">
            <h1 className=" text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Linear is a purpose-built tool for planning and building products
            </h1>
            <p className="mt-5 max-w-xl text-balance text-white/70 mx-auto md:mx-0">
              Meet the system for modern software development. Streamline issues, projects, and product roadmaps.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <a href="#start" className="inline-flex p-4 py-2 items-center justify-center rounded-lg border border-white/10 bg-white/80 px-6 text-sm font-medium text-black/80 transition-colors hover:bg-white/90 ">Start building</a>
              <div className="text-md hover:bg-white/20 rounded-md">
              <a href="#intelligence" className="inline-flex p-4 py-2 items-center justify-center  bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent gap-4">
                New: Product Intelligence <span aria-hidden className="text-xl">›</span>
              </a>
              </div>
            </div>
          </div>
        </div>
        <Perspective> 
          <div className="w-full h-36 bg-red-500" 
        style={{
          transformStyle: 'preserve-3d'
}}>HI THIS IS A TEST</div></Perspective>

      </section>
      {/* Logos section (rotator) */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-white">Powering the world’s best product teams.</h2>
          <p className="mt-1 text-2xl text-white/70">From next-gen startups to established enterprises.</p>
        </div>
        <div className="mt-8">
          <LogoRotator groups={groups} intervalMs={3000} />
        </div>
      </section>
      {/* Modern product teams section */}
      <section className="relative mx-auto px-6 pb-24">
        <div className="text-left">
          <h2 className="text-5xl font-semibold text-white">Made for modern product teams</h2>
          <p className="mt-3 text-white/70 max-w-2xl text-balance">
            Linear is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to the quality of craft. <span className="text-white">Make the switch &gt;</span>
          </p>
        </div>
        <FeatureBoxes />
      </section>
    </div>
  );
}
