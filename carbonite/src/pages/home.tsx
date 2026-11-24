import { Link } from "react-router-dom"
import { ArrowRightIcon, BookOpenIcon, BoxesIcon, LayersIcon, MessageSquareTextIcon, PaletteIcon, PuzzleIcon, ShieldCheckIcon, SmartphoneIcon, MonitorIcon, SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FigmaIcon } from "@/components/site/figma-link"
import { componentDocs } from "@/docs/registry"

const sections = [
  { title: "Foundations", href: "/foundations", icon: PaletteIcon, desc: "Color, type, spacing, elevation, and motion: the visual language behind every Carbonite product." },
  { title: "Tokens", href: "/tokens", icon: LayersIcon, desc: "Named design decisions that keep web and native apps consistent and themeable." },
  { title: "Components", href: "/components", icon: BoxesIcon, desc: `${componentDocs.length} accessible components for React and React Native, with live demos and code.` },
  { title: "Patterns", href: "/patterns", icon: PuzzleIcon, desc: "Proven solutions for forms, protection status, empty states, and mobile app shells." },
  { title: "Content", href: "/content", icon: MessageSquareTextIcon, desc: "Voice, tone, and writing guidelines for clear, calm, confident security messaging." },
  { title: "Resources", href: "/resources", icon: BookOpenIcon, desc: "Figma libraries, icon sets, the changelog, and ways to get help." },
]

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 80% at 85% 10%, rgba(47,123,245,.45), transparent 60%), radial-gradient(40% 60% at 10% 100%, rgba(255,138,31,.18), transparent 60%)" }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.07)_1px,transparent_0)] bg-[length:24px_24px]" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Badge className="mb-5 border-white/15 bg-white/10 text-white">
              <SparklesIcon /> Version 1.0 is here
            </Badge>
            <h1 className="max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build trusted products, <span className="text-blue-400">faster.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              The Carbonite Design System gives designers and engineers one shared language for backup and security experiences across web, iOS, and Android.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="accent" asChild>
                <Link to="/get-started">
                  Get started <ArrowRightIcon />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                <Link to="/components">Browse components</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <MonitorIcon className="size-4" /> React + shadcn/ui
              </span>
              <span className="flex items-center gap-2">
                <SmartphoneIcon className="size-4" /> React Native
              </span>
              <span className="flex items-center gap-2">
                <FigmaIcon className="size-3.5" /> Figma libraries
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="size-4" /> WCAG 2.2 AA
              </span>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Everything you need to design and build</h2>
          <p className="mt-2 text-muted-foreground">Start with the foundations, then compose with components and patterns.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.title}
              to={s.href}
              className="group rounded-2xl border bg-card p-6 shadow-raised transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-overlay outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                <s.icon className="size-5" />
              </div>
              <h3 className="flex items-center gap-1.5 text-lg font-semibold">
                {s.title}
                <ArrowRightIcon className="size-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-surface-sunken">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Principles</h2>
            <p className="mt-2 text-muted-foreground">Every decision in the system traces back to these.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-2">
            {[
              ["Calm confidence", "Security is stressful. Our UI stays clear and composed, and tells people exactly where they stand."],
              ["Protection at a glance", "Status comes first. Anyone should understand if they're protected within one second."],
              ["One system, every screen", "Shared tokens make the web console, desktop agent, and mobile apps feel like one product."],
            ].map(([t, d], i) => (
              <div key={t}>
                <div className="mb-3 font-mono text-sm font-semibold text-primary">0{i + 1}</div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">What's new</h2>
            <p className="mt-1 text-muted-foreground">Recent updates to the system.</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/resources/changelog">View changelog</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Nov 2026", "Status hero for native", "A new component for showing protection status on mobile home screens.", "/components/status-hero"],
            ["Oct 2026", "Dark theme tokens", "Every semantic token now has a tuned dark value with verified contrast.", "/foundations/color"],
            ["Sep 2026", "Empty state", "Guidance and a component for first-use and no-results screens.", "/components/empty-state"],
          ].map(([date, title, desc, href]) => (
            <Link key={title} to={href} className="rounded-xl border p-5 transition hover:border-primary/40 hover:bg-muted/50">
              <div className="text-xs font-semibold text-muted-foreground">{date}</div>
              <div className="mt-1 font-semibold">{title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function HeroArt() {
  return (
    <div className="relative mx-auto hidden h-[420px] w-full max-w-[520px] sm:block" aria-hidden="true">
      <div className="absolute top-4 left-0 w-[300px] rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Devices</div>
            <div className="text-xs text-white/60">3 protected</div>
          </div>
          <span className="rounded-full bg-[#1BA85E]/20 px-2.5 py-0.5 text-xs font-semibold text-[#5ee39a]">All good</span>
        </div>
        {[
          ["MacBook Pro", "2 hours ago", 64],
          ["Office desktop", "Yesterday", 88],
          ["iPhone 17", "14 min ago", 32],
        ].map(([n, t, v]) => (
          <div key={n as string} className="mb-3 last:mb-0">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="font-medium">{n}</span>
              <span className="text-white/50">{t}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#4D94FF]" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-0 bottom-0 w-[210px] rounded-[32px] border-[7px] border-[#1b2a45] bg-[#0B1E3F] p-4 pt-8 shadow-2xl">
        <div className="mx-auto mb-3 flex size-24 items-center justify-center rounded-full border-[6px] border-[#1BA85E]" style={{ boxShadow: "0 0 30px rgba(27,168,94,.35)" }}>
          <ShieldCheckIcon className="size-10 text-[#1BA85E]" />
        </div>
        <div className="text-center text-sm font-bold">You're protected</div>
        <div className="mb-4 text-center text-[11px] text-white/60">No threats found</div>
        <div className="rounded-xl bg-[#2F7BF5] py-2 text-center text-xs font-semibold">Scan now</div>
      </div>
      <div className="absolute bottom-16 left-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0e1f3d] px-3 py-2 text-xs shadow-2xl">
        <span className="size-2 rounded-full bg-[#FF8A1F]" /> Backup complete · 12,480 files
      </div>
    </div>
  )
}
