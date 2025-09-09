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
                  <img src="/icons/linear-logo.svg" alt="Linear" className="w-6 h-6" />
                  <span className="text-md font-semibold tracking-tight">Linear</span>
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
          <div className="relative w-full h-full grid grid-cols-[760px_1fr]">
            <aside className="h-full border-r border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="h-full grid grid-cols-[220px_1fr]">
                <div className="h-full border-r border-white/10 px-3 py-4 overflow-auto">
                  <div className="px-2 py-1 text-xs font-semibold tracking-wide text-white/70">Linear</div>
                  <nav className="mt-2 space-y-1 text-sm">
                    <a className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/[0.04]" href="#">
                      <span className="inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-white/80">Inbox</span>
                    </a>
                    <a className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/[0.04]" href="#">
                      <span className="inline-block h-2 w-2 rounded-full bg-white/30" />
                      <span className="text-white/70">My issues</span>
                    </a>
                  </nav>
                  <div className="mt-4 px-2 text-[11px] uppercase tracking-wide text-white/40">Workspace</div>
                  <nav className="mt-2 space-y-1 text-sm">
                    {['Initiatives','Projects','Views','Teams'].map((label) => (
                      <a key={label} className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/[0.04]" href="#">
                        <span className="inline-block h-4 w-4 rounded-sm bg-white/10" />
                        <span className="text-white/70">{label}</span>
                      </a>
                    ))}
                  </nav>
                  <div className="mt-4 px-2 text-[11px] uppercase tracking-wide text-white/40">Favorites</div>
                  <nav className="mt-2 space-y-1 text-sm">
                    {['Mobile App','2024 Roadmap','Projects','Docs'].map((label) => (
                      <a key={label} className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/[0.04]" href="#">
                        <span className="inline-block h-4 w-4 rounded-sm bg-[rgba(0,212,255,.25)] border border-white/10" />
                        <span className="text-white/70">{label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="h-full overflow-hidden">
                  <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
                    <h3 className="text-sm font-medium text-white/80">Inbox</h3>
                    <span className="text-xs text-white/50">12</span>
                  </div>
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="relative">
                      <input
                        className="w-full bg-white/[0.04] border border-white/10 rounded-md py-2 pl-8 pr-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.55)]"
                        placeholder="Search"
                      />
                      <svg
                        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.79 3.8-1.42 1.41-3.78-3.8ZM8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                      </svg>
                    </div>
                  </div>
                  <ul className="divide-y divide-white/5 overflow-auto h-[calc(100%-106px)]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <li key={i} className="p-4 hover:bg-white/[0.04] cursor-default">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white">ENG-{135 + i} Refactor sonic crawler</p>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-white/50">{i % 3 === 0 ? '1d' : i % 2 === 0 ? '2h' : '4d'}</span>
                            <svg className="h-4 w-4 text-white/40" viewBox="0 0 20 20" fill="currentColor"><path d="m10 15-4.33 2.28.83-4.84L3 8.72l4.87-.71L10 3l2.13 5.01 4.87.71-3.5 3.72.83 4.84z"/></svg>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: i % 2 === 0 ? '#22c55e' : '#f59e0b' }} />
                          <span>{i % 2 === 0 ? 'LLM Chatbot' : 'Upload API'}</span>
                          <span className="text-white/40">·</span>
                          <span>New project update by raissa</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
            <main className="h-full overflow-hidden">
              <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white/60">
                  <span>Engineering</span>
                  <span className="text-white/30">›</span>
                  <span>Spice harvester</span>
                  <span className="text-white/30">›</span>
                  <span className="text-white">ENG-135</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white/60">
                  <button className="btn btn-ghost h-7 px-3 text-xs">Add sub-issues</button>
                  <button className="btn btn-ghost h-7 px-3 text-xs">Links</button>
                </div>
              </div>
              <div className="px-6 py-6 space-y-6 overflow-auto h-[calc(100%-49px)]">
                <h2 className="text-2xl font-semibold text-white">Refactor sonic crawler</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-muted">Open</span>
                  <span className="badge-muted">Priority: Medium</span>
                  <span className="badge-muted">Assignee: nan</span>
                </div>
                <div className="glass rounded-md p-4 text-sm text-white/80">
                  <p>comment.documentContent is defined wrongly; it should be updated to the new document schema.</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/30 p-4">
                  <pre className="text-xs text-white/80 overflow-x-auto">
                    <code>{`/** The document content of this comment */\npublic documentContent: DocumentContent`}</code>
                  </pre>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/70">We would be accessing cached property touch on the document when rendering.</p>
                  <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80">property.touch</div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <input className="flex-1 bg-white/[0.04] border border-white/10 rounded-md py-2 px-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.55)]" placeholder="Add a comment" />
                    <button className="btn btn-gold h-8 px-4 text-xs">Comment</button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Perspective>
        {/* Bottom fade overlay for transition to next section */}
        <div
          aria-hidden
          className="pointer-events-none w-screen absolute left-0 inset-x-0 bottom-0 h-64"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.9) 45%, rgba(10,10,15,1) 75%, var(--background) 100%)'
          }}
        />

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
