import * as React from "react"
import { Link } from "react-router-dom"
import { AccessibilityIcon, ActivityIcon, AlertTriangleIcon, BellIcon, BugIcon, CloudUploadIcon, ContrastIcon, DownloadIcon, EyeOffIcon, FileIcon, FolderIcon, HardDriveIcon, HistoryIcon, HomeIcon, InfoIcon, KeyRoundIcon, KeyboardIcon, LaptopIcon, LayersIcon, LayoutGridIcon, LockIcon, MonitorIcon, PaletteIcon, PlayIcon, PointerIcon, RefreshCwIcon, RulerIcon, ScanIcon, SearchIcon, SettingsIcon, ShapesIcon, ShieldAlertIcon, ShieldCheckIcon, ShieldIcon, SmartphoneIcon, SquircleIcon, Trash2Icon, TypeIcon, UserIcon, UsersIcon, Volume2Icon, WifiIcon, ZoomInIcon, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CodeBlock } from "@/components/site/code-block"
import { CodeTabs } from "@/components/site/preview"
import { FigmaLink } from "@/components/site/figma-link"
import { Callout, DoDont, DoDontGrid, H2, Lead, PageHeader, PhoneFrame } from "@/components/site/doc-parts"
import { ListGroup, ListRow, NavBar, StatusBar, StatusHero, TabBar } from "@/components/native"
import { bestText, contrast, palettes, radii, semanticTokens, spacing, typeScale } from "@/lib/tokens"
import { cn } from "@/lib/utils"

const foundationCards = [
  { title: "Color", href: "/foundations/color", icon: PaletteIcon, desc: "Brand palette and semantic colors for light and dark themes." },
  { title: "Typography", href: "/foundations/typography", icon: TypeIcon, desc: "Inter type scale for headings, body, and code." },
  { title: "Spacing", href: "/foundations/spacing", icon: RulerIcon, desc: "A 4px-based scale for consistent rhythm." },
  { title: "Elevation", href: "/foundations/elevation", icon: LayersIcon, desc: "Surfaces and shadows that create depth." },
  { title: "Radius", href: "/foundations/radius", icon: SquircleIcon, desc: "Corner radius scale from inputs to sheets." },
  { title: "Iconography", href: "/foundations/iconography", icon: ShapesIcon, desc: "Lucide line icons at consistent sizes." },
  { title: "Grid and layout", href: "/foundations/grid", icon: LayoutGridIcon, desc: "Breakpoints, columns, and responsive layout." },
  { title: "Motion", href: "/foundations/motion", icon: ActivityIcon, desc: "Durations and easing that feel calm and responsive." },
  { title: "Accessibility", href: "/foundations/accessibility", icon: AccessibilityIcon, desc: "WCAG 2.2 AA standards built into every component." },
]

export function FoundationsOverview() {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Foundations"
        description="Foundations are the visual elements that make up the Carbonite look and feel. They're shared across the web console, desktop apps, and mobile apps."
        actions={<FigmaLink label="Open foundations in Figma" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {foundationCards.map((c) => (
          <Link key={c.href} to={c.href} className="group rounded-xl border bg-card p-5 shadow-raised transition hover:border-primary/40 hover:shadow-overlay">
            <c.icon className="mb-3 size-6 text-primary" />
            <div className="font-semibold group-hover:text-primary">{c.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
      <H2>Platforms</H2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/foundations/platforms/web" className="rounded-xl border p-5 hover:border-primary/40">
          <MonitorIcon className="mb-2 size-6 text-primary" />
          <div className="font-semibold">Web apps</div>
          <p className="mt-1 text-sm text-muted-foreground">Responsive console and account experiences, from 320px to wide desktop.</p>
        </Link>
        <Link to="/foundations/platforms/native" className="rounded-xl border p-5 hover:border-primary/40">
          <SmartphoneIcon className="mb-2 size-6 text-primary" />
          <div className="font-semibold">Native apps</div>
          <p className="mt-1 text-sm text-muted-foreground">iOS and Android apps built with React Native, respecting platform conventions.</p>
        </Link>
      </div>
    </div>
  )
}

function Swatch({ step, hex, token }: { step: string; hex: string; token: string }) {
  const [copied, setCopied] = React.useState(false)
  const fg = bestText(hex)
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(hex).then(() => (setCopied(true), setTimeout(() => setCopied(false), 1200)))}
      className="group flex h-20 min-w-0 flex-col justify-between rounded-lg p-2 text-left ring-1 ring-black/5 ring-inset transition hover:scale-[1.03] dark:ring-white/10"
      style={{ background: hex, color: fg }}
      title={`Copy ${hex}`}
    >
      <span className="text-xs font-semibold">{step}</span>
      <span className="font-mono text-[10px] opacity-80">{copied ? "Copied" : hex}</span>
      <span className="sr-only">{token}</span>
    </button>
  )
}

export function ColorPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Color"
        description="Color helps people understand status, hierarchy, and what they can act on. The Carbonite palette pairs a trustworthy navy and blue with a warm orange accent."
        actions={<FigmaLink />}
      />
      <H2>Brand colors</H2>
      <Lead>Three colors carry the brand. Navy grounds the experience, Carbonite Blue drives action, and Signal Orange adds energy in small doses.</Lead>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Navy 900", "#0B1E3F", "Brand surfaces, headings"],
          ["Carbonite Blue 600", "#0B5FD1", "Primary actions, links"],
          ["Signal Orange 500", "#FF8A1F", "Accent, upgrade moments"],
        ].map(([n, h, u]) => (
          <div key={n} className="overflow-hidden rounded-xl border">
            <div className="h-28" style={{ background: h }} />
            <div className="p-4">
              <div className="font-semibold">{n}</div>
              <div className="font-mono text-xs text-muted-foreground">{h}</div>
              <div className="mt-1 text-sm text-muted-foreground">{u}</div>
            </div>
          </div>
        ))}
      </div>
      <Callout title="How we improved on the marketing palette">
        The marketing site uses many one-off blues. The system consolidates them into a single 10-step Carbonite Blue scale, and checks every text
        pairing against WCAG AA. Orange is reserved for accents, since orange text on white fails contrast.
      </Callout>

      <H2>Palette</H2>
      <Lead>Primitive colors are the raw values. Don't use them directly in product code; reference semantic tokens instead. Click a swatch to copy it.</Lead>
      <div className="grid gap-6">
        {palettes.map((p) => (
          <div key={p.name}>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="font-semibold">{p.name}</h3>
              <code className="font-mono text-xs text-muted-foreground">color.{p.token}.*</code>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              {p.swatches.map(([s, h]) => (
                <Swatch key={s} step={s} hex={h} token={`color.${p.token}.${s}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <H2>Semantic colors</H2>
      <Lead>Semantic tokens describe what a color is for. They switch automatically between light and dark themes.</Lead>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Token</TableHead>
              <TableHead>Light</TableHead>
              <TableHead>Dark</TableHead>
              <TableHead className="min-w-48">Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semanticTokens.map((t) => (
              <TableRow key={t.name}>
                <TableCell className="font-mono text-[12px] font-semibold whitespace-nowrap">{t.name}</TableCell>
                {[t.light, t.dark].map((h, i) => (
                  <TableCell key={i}>
                    <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                      <span className="size-5 shrink-0 rounded-md ring-1 ring-black/10 dark:ring-white/15" style={{ background: h }} />
                      {h}
                    </span>
                  </TableCell>
                ))}
                <TableCell className="text-muted-foreground">{t.usage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <H2>Status colors</H2>
      <Lead>Status colors communicate protection state consistently in every product. Always pair them with an icon and a label.</Lead>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Protected", "success", ShieldCheckIcon, "bg-success-subtle text-success"],
          ["At risk", "warning", AlertTriangleIcon, "bg-warning-subtle text-warning-text"],
          ["Threat found", "danger", ShieldAlertIcon, "bg-danger-subtle text-destructive"],
        ].map(([l, k, I, c]) => {
          const Icon = I as LucideIcon
          return (
            <div key={l as string} className={cn("flex items-center gap-3 rounded-xl p-4 font-semibold", c as string)}>
              <Icon className="size-5" /> {l as string}
              <code className="ml-auto font-mono text-[11px] font-normal opacity-80">{k as string}</code>
            </div>
          )
        })}
      </div>

      <H2>Contrast</H2>
      <Lead>Every text and background pairing in the system meets WCAG 2.2 AA: 4.5:1 for body text and 3:1 for large text and UI components.</Lead>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["#FFFFFF", "#0B5FD1", "Primary button"],
          ["#0B1E3F", "#FF8A1F", "Accent button"],
          ["#52607A", "#FFFFFF", "Subtle text on white"],
          ["#EEF2F8", "#071327", "Text on dark background"],
          ["#FF8A1F", "#FFFFFF", "Orange text on white"],
          ["#138A4B", "#ECFBF2", "Success badge"],
        ].map(([fg, bg, l]) => {
          const r = contrast(fg, bg)
          const pass = r >= 4.5
          return (
            <div key={l} className="flex items-center gap-4 rounded-xl border p-3">
              <div className="flex h-12 w-20 items-center justify-center rounded-lg text-lg font-bold ring-1 ring-black/5" style={{ color: fg, background: bg }}>
                Aa
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{l}</div>
                <div className="font-mono text-xs text-muted-foreground">{r.toFixed(2)}:1</div>
              </div>
              <Badge variant={pass ? "success" : r >= 3 ? "warning" : "danger"}>{pass ? "AA" : r >= 3 ? "AA large" : "Fail"}</Badge>
            </div>
          )
        })}
      </div>

      <H2>Using color in code</H2>
      <CodeTabs
        code={`// Tailwind utilities map to semantic tokens
<div className="bg-card text-foreground border-border">
  <p className="text-muted-foreground">Last backup 2 hours ago</p>
  <Button className="bg-primary text-primary-foreground">Back up now</Button>
</div>

/* Or reference CSS variables directly */
.status-pill { background: var(--success-subtle); color: var(--success); }`}
        nativeCode={`import { useTheme } from "@carbonite/native"

function DeviceCard() {
  const { colors } = useTheme() // resolves light or dark automatically
  return (
    <View style={{ backgroundColor: colors.surface.card, borderColor: colors.border }}>
      <Text style={{ color: colors.text.subtle }}>Last backup 2 hours ago</Text>
    </View>
  )
}`}
      />
    </div>
  )
}

export function TypographyPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Inter is our typeface on web. It's highly legible at small sizes and has tabular figures for data. Native apps use the platform system font for familiarity."
        actions={<FigmaLink />}
      />
      <H2>Typefaces</H2>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Inter", "Web UI and marketing", "font-sans"],
          ["SF Pro / Roboto", "iOS / Android native", "font-[system-ui]"],
          ["JetBrains Mono", "Code and technical values", "font-mono"],
        ].map(([n, u, c]) => (
          <div key={n} className="rounded-xl border p-5">
            <div className={cn("text-4xl font-semibold", c)}>Aa</div>
            <div className="mt-3 font-semibold">{n}</div>
            <div className="text-sm text-muted-foreground">{u}</div>
          </div>
        ))}
      </div>
      <H2>Type scale</H2>
      <Lead>Sizes are shown as font size / line height in pixels. Body text defaults to 15px for comfortable reading in dense product UI.</Lead>
      <div className="divide-y rounded-xl border">
        {typeScale.map(([token, size, weight, track, cls, usage]) => (
          <div key={token} className="grid gap-2 p-4 md:grid-cols-[200px_1fr] md:items-center">
            <div>
              <div className="font-mono text-xs font-semibold">{token}</div>
              <div className="font-mono text-[11px] text-muted-foreground">
                {size} · {weight} · {track}
              </div>
            </div>
            <div className="min-w-0">
              <div className={cn("truncate", cls)}>Your files are safe</div>
              <div className="text-xs text-muted-foreground">{usage}</div>
            </div>
          </div>
        ))}
      </div>
      <H2>Guidelines</H2>
      <DoDontGrid>
        <DoDont kind="do">Use sentence case for headings, buttons, and labels: "Back up now".</DoDont>
        <DoDont kind="dont">Don't use all caps for anything longer than a short overline label.</DoDont>
        <DoDont kind="do">Keep line length between 50 and 80 characters for body text.</DoDont>
        <DoDont kind="dont">Don't use more than three type sizes in one component.</DoDont>
      </DoDontGrid>
      <H2>Code</H2>
      <CodeTabs
        code={`<h1 className="text-4xl font-bold tracking-tight">Devices</h1>
<p className="text-[15px] text-muted-foreground">Manage protection for every device.</p>`}
        nativeCode={`import { Text } from "@carbonite/native"

<Text variant="heading.xl">Devices</Text>
<Text variant="body" color="subtle">Manage protection for every device.</Text>`}
      />
    </div>
  )
}

export function SpacingPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Foundations" title="Spacing" description="Spacing uses a 4px base unit. A consistent scale creates rhythm and makes layouts easier to build and maintain." actions={<FigmaLink />} />
      <H2>Scale</H2>
      <div className="divide-y rounded-xl border">
        {spacing.map(([t, px, tw]) => (
          <div key={t} className="grid grid-cols-[110px_60px_1fr] items-center gap-4 px-4 py-2.5 sm:grid-cols-[140px_70px_70px_1fr]">
            <code className="font-mono text-xs font-semibold">{t}</code>
            <span className="font-mono text-xs text-muted-foreground">{px}</span>
            <code className="hidden font-mono text-xs text-muted-foreground sm:block">p-{tw}</code>
            <div className="h-4 rounded-sm bg-primary/80" style={{ width: px }} />
          </div>
        ))}
      </div>
      <H2>Applying space</H2>
      <Lead>Use smaller steps (4 to 12px) inside components, medium steps (16 to 24px) between related elements, and large steps (32px and up) between sections.</Lead>
      <div className="rounded-xl border bg-surface-sunken p-6">
        <div className="mx-auto max-w-sm rounded-xl border bg-card p-4 shadow-raised ring-[16px] ring-primary/10">
          <div className="flex items-center gap-3 outline-dashed outline-1 outline-primary/40">
            <div className="size-10 rounded-lg bg-accent" />
            <div className="space-y-1.5">
              <div className="h-2.5 w-28 rounded bg-foreground/70" />
              <div className="h-2 w-20 rounded bg-muted-foreground/40" />
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Card padding: space.200 (16px) · Icon gap: space.150 (12px) · Text gap: space.075 (6px)</p>
      </div>
    </div>
  )
}

export function ElevationPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Foundations" title="Elevation" description="Elevation shows how surfaces relate to each other. We use a small number of levels so depth stays meaningful." actions={<FigmaLink />} />
      <H2>Levels</H2>
      <div className="grid gap-6 rounded-xl bg-surface-sunken p-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Sunken", "bg-surface-sunken border-dashed", "Wells and backgrounds", "--surface-sunken"],
          ["Default", "bg-background", "The page itself", "--background"],
          ["Raised", "bg-card shadow-raised", "Cards and buttons", "--shadow-raised"],
          ["Overlay", "bg-popover shadow-overlay", "Menus, dialogs, toasts", "--shadow-overlay"],
        ].map(([n, c, u, t]) => (
          <div key={n} className={cn("flex h-36 flex-col justify-end rounded-xl border p-4", c)}>
            <div className="font-semibold">{n}</div>
            <div className="text-xs text-muted-foreground">{u}</div>
            <code className="mt-1 font-mono text-[10px] text-muted-foreground">{t}</code>
          </div>
        ))}
      </div>
      <Callout title="Dark mode">In dark themes shadows are less visible, so raised surfaces also get lighter. A card is one step lighter than the page; an overlay is two.</Callout>
    </div>
  )
}

export function RadiusPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Foundations" title="Radius" description="Rounded corners make the interface feel approachable. Larger elements get larger radii so corners look consistent." actions={<FigmaLink />} />
      <H2>Scale</H2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {radii.map(([t, v, c, u]) => (
          <div key={t} className="flex items-center gap-4 rounded-xl border p-4">
            <div className="size-16 shrink-0 border-2 border-primary bg-accent" style={{ borderRadius: v }} />
            <div className="min-w-0">
              <code className="font-mono text-xs font-semibold">{t}</code>
              <div className="font-mono text-xs text-muted-foreground">
                {v} · {c}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{u}</div>
            </div>
          </div>
        ))}
      </div>
      <H2>Nesting</H2>
      <Lead>When nesting rounded elements, inner radius equals outer radius minus padding. This keeps curves parallel.</Lead>
      <div className="flex justify-center rounded-xl bg-surface-sunken p-8">
        <div className="rounded-[20px] bg-card p-2 shadow-raised">
          <div className="flex h-24 w-56 items-center justify-center rounded-[12px] bg-primary text-sm font-semibold text-primary-foreground">20px − 8px = 12px</div>
        </div>
      </div>
    </div>
  )
}

const iconSet: [string, LucideIcon][] = [
  ["shield-check", ShieldCheckIcon], ["shield-alert", ShieldAlertIcon], ["lock", LockIcon], ["key-round", KeyRoundIcon],
  ["cloud-upload", CloudUploadIcon], ["hard-drive", HardDriveIcon], ["folder", FolderIcon], ["file", FileIcon],
  ["laptop", LaptopIcon], ["smartphone", SmartphoneIcon], ["monitor", MonitorIcon], ["wifi", WifiIcon],
  ["scan", ScanIcon], ["bug", BugIcon], ["history", HistoryIcon], ["refresh", RefreshCwIcon],
  ["bell", BellIcon], ["settings", SettingsIcon], ["user", UserIcon], ["users", UsersIcon],
  ["search", SearchIcon], ["download", DownloadIcon], ["trash", Trash2Icon], ["info", InfoIcon],
]

export function IconographyPage() {
  const [q, setQ] = React.useState("")
  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        description="We use Lucide, an open-source line icon set, on web and native. Icons are 1.75 to 2px stroke on a 24px grid."
        actions={<FigmaLink label="Open icon library in Figma" />}
      />
      <H2>Sizes</H2>
      <div className="flex flex-wrap items-end gap-8 rounded-xl border p-6">
        {[
          [16, "Small · inline with 13 to 15px text"],
          [20, "Medium · buttons and inputs"],
          [24, "Large · navigation and tab bars"],
          [32, "XL · empty states"],
        ].map(([s, l]) => (
          <div key={s} className="flex flex-col items-center gap-2 text-center">
            <ShieldCheckIcon style={{ width: s as number, height: s as number }} className="text-primary" />
            <span className="font-mono text-xs">{s}px</span>
            <span className="max-w-28 text-[11px] text-muted-foreground">{l}</span>
          </div>
        ))}
      </div>
      <H2>Common icons</H2>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter icons"
        aria-label="Filter icons"
        className="mb-4 h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
      />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {iconSet
          .filter(([n]) => n.includes(q.toLowerCase()))
          .map(([n, I]) => (
            <div key={n} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition hover:border-primary/40 hover:bg-accent">
              <I className="size-6" />
              <span className="font-mono text-[10px] text-muted-foreground">{n}</span>
            </div>
          ))}
      </div>
      <H2>Usage</H2>
      <CodeTabs
        code={`import { ShieldCheckIcon } from "lucide-react"

<ShieldCheckIcon className="size-5 text-success" aria-hidden="true" />`}
        nativeCode={`import { ShieldCheck } from "lucide-react-native"

<ShieldCheck size={20} color={colors.status.success} />`}
      />
    </div>
  )
}

export function GridPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Foundations" title="Grid and layout" description="A responsive 12-column grid adapts layouts from small phones to wide desktop monitors." actions={<FigmaLink />} />
      <H2>Breakpoints</H2>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Min width</TableHead>
              <TableHead>Columns</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Typical device</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["base", "0", "4", "16px", "Phones"],
              ["sm", "640px", "8", "24px", "Large phones, small tablets"],
              ["md", "768px", "8", "24px", "Tablets"],
              ["lg", "1024px", "12", "32px", "Laptops"],
              ["xl", "1280px", "12", "32px", "Desktops"],
              ["2xl", "1536px", "12", "auto (max 1440px)", "Wide monitors"],
            ].map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, i) => (
                  <TableCell key={i} className={i === 0 ? "font-mono font-semibold" : "text-muted-foreground"}>
                    {c}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <H2>Columns</H2>
      <div className="grid grid-cols-4 gap-2 rounded-xl border bg-surface-sunken p-4 sm:grid-cols-8 lg:grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={cn("h-24 rounded bg-primary/15 text-center text-[11px] leading-[6rem] text-primary", i >= 4 && "hidden sm:block", i >= 8 && "sm:hidden lg:block")}>
            {i + 1}
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Resize your browser to see the column count change.</p>
      <H2>App layouts</H2>
      <Lead>Web apps use a top bar plus collapsible side navigation. Below the lg breakpoint, side navigation moves into a sheet opened from the menu button, the same pattern this site uses.</Lead>
      <CodeBlock
        code={`<div className="mx-auto grid max-w-[1440px] gap-6 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
  <aside className="hidden lg:block">{/* side nav */}</aside>
  <main className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{/* cards */}</main>
</div>`}
      />
    </div>
  )
}

export function MotionPage() {
  const [on, setOn] = React.useState(false)
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Foundations" title="Motion" description="Motion guides attention and confirms actions. It should feel quick and calm, never flashy." actions={<FigmaLink />} />
      <H2>Durations</H2>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["motion.duration.fast", "100ms", "Hover, press, and color changes"],
          ["motion.duration.medium", "200ms", "Menus, tooltips, and small reveals"],
          ["motion.duration.slow", "300ms", "Sheets, dialogs, and page transitions"],
          ["motion.duration.progress", "1000ms+", "Scan rings and loading loops"],
        ].map(([t, d, u]) => (
          <div key={t} className="rounded-xl border p-4">
            <code className="font-mono text-xs font-semibold">{t}</code>
            <div className="text-lg font-semibold">{d}</div>
            <div className="text-sm text-muted-foreground">{u}</div>
          </div>
        ))}
      </div>
      <H2>Easing</H2>
      <Lead>Elements entering use ease-out so they arrive gently. Elements leaving use ease-in. Press play to compare.</Lead>
      <div className="grid gap-3 rounded-xl border p-6">
        {[
          ["ease-out · cubic-bezier(0.16, 1, 0.3, 1)", "cubic-bezier(0.16, 1, 0.3, 1)"],
          ["ease-in-out · cubic-bezier(0.65, 0, 0.35, 1)", "cubic-bezier(0.65, 0, 0.35, 1)"],
          ["linear (avoid for UI)", "linear"],
        ].map(([l, e]) => (
          <div key={l}>
            <div className="mb-1 font-mono text-xs text-muted-foreground">{l}</div>
            <div className="h-10 rounded-lg bg-surface-sunken p-1">
              <div className="size-8 rounded-md bg-primary" style={{ transform: on ? "translateX(min(520px, 60vw))" : "none", transition: `transform 900ms ${e}` }} />
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-fit" onClick={() => setOn(!on)}>
          <PlayIcon /> Play
        </Button>
      </div>
      <Callout title="Reduced motion">All animation respects prefers-reduced-motion. Transitions shorten to a simple fade, and scan rings stop spinning but still show progress.</Callout>
    </div>
  )
}

export function AccessibilityPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Foundations" title="Accessibility" description="People rely on Carbonite to protect what matters. Everyone should be able to do that, whatever their abilities or devices." />
      <H2>Our standard</H2>
      <Lead>All components meet WCAG 2.2 Level AA on web, and follow Apple and Google accessibility guidelines on native.</Lead>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          [ContrastIcon, "Contrast", "4.5:1 for text, 3:1 for large text, icons, and control borders."],
          [KeyboardIcon, "Keyboard", "Everything works with a keyboard, with a visible 3px focus ring."],
          [Volume2Icon, "Screen readers", "Semantic HTML first, ARIA only when needed. Tested with VoiceOver, NVDA, and TalkBack."],
          [PointerIcon, "Touch targets", "At least 44×44pt on iOS, 48×48dp on Android, 24×24px on web."],
          [ZoomInIcon, "Text scaling", "Layouts hold up at 200% zoom and the largest Dynamic Type sizes."],
          [EyeOffIcon, "Not color alone", "Status uses color plus an icon plus text, so it works for color-blind users."],
        ].map(([I, t, d]) => {
          const Icon = I as LucideIcon
          return (
            <div key={t as string} className="flex gap-4 rounded-xl border p-5">
              <Icon className="size-6 shrink-0 text-primary" />
              <div>
                <div className="font-semibold">{t as string}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </div>
            </div>
          )
        })}
      </div>
      <H2>Focus</H2>
      <Lead>Tab through these to see the focus ring.</Lead>
      <div className="flex flex-wrap gap-3 rounded-xl border bg-surface-sunken p-6">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="link">A link</Button>
      </div>
    </div>
  )
}

const tabs = [
  { label: "Home", icon: HomeIcon },
  { label: "Protection", icon: ShieldIcon },
  { label: "Backup", icon: HardDriveIcon },
  { label: "Settings", icon: SettingsIcon },
]

export function PlatformWebPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Platforms" title="Web apps" description="Carbonite web apps include the account portal, admin console, and restore experiences. They're built with React, Tailwind CSS, and shadcn/ui." />
      <H2>Stack</H2>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["React 19 + TypeScript", "Component framework"],
          ["shadcn/ui + Radix", "Accessible, owned component source"],
          ["Tailwind CSS v4", "Utility styling mapped to tokens"],
          ["Lucide", "Icon set"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border p-4">
            <div className="font-semibold">{a}</div>
            <div className="text-sm text-muted-foreground">{b}</div>
          </div>
        ))}
      </div>
      <H2>Responsive behavior</H2>
      <ul className="prose-doc">
        <li>Design mobile-first from 320px wide. Every web flow must work on a phone.</li>
        <li>Side navigation collapses into a sheet below 1024px.</li>
        <li>Data tables scroll horizontally on small screens; consider a card list instead for key flows.</li>
        <li>Dialogs become full-width with stacked buttons below 640px.</li>
      </ul>
      <H2>Theming</H2>
      <Lead>Light and dark themes switch by toggling a dark class on the root element. All components read semantic CSS variables, so no component code changes.</Lead>
      <CodeBlock code={`document.documentElement.classList.toggle("dark", prefersDark)`} />
    </div>
  )
}

export function PlatformNativePage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="Platforms"
        title="Native apps"
        description="Carbonite mobile apps are built with React Native and the @carbonite/native package. They share tokens with web but follow iOS and Android conventions where it matters."
      />
      <div className="flex flex-wrap justify-center gap-8 rounded-xl border bg-surface-sunken py-8">
        <PhoneFrame label="Home · iOS">
          <div className="h-full bg-surface-sunken">
            <div className="bg-navy-900">
              <StatusBar dark />
              <NavBar title="Carbonite" dark trailing={<BellIcon className="size-5 text-white" />} />
            </div>
            <StatusHero state="protected">
              <ShieldCheckIcon className="size-14 text-[#1BA85E]" />
            </StatusHero>
            <div className="-mt-4 grid gap-3 px-4">
              <Button size="lg" className="w-full rounded-xl">
                Scan now
              </Button>
            </div>
            <TabBar items={tabs} active={0} />
          </div>
        </PhoneFrame>
        <PhoneFrame label="Settings · iOS">
          <div className="h-full bg-surface-sunken">
            <StatusBar />
            <NavBar title="Settings" large />
            <div className="grid gap-5 pt-1">
              <ListGroup header="Account">
                <ListRow icon={UserIcon} title="Jody Ferry" subtitle="Premium plan" chevron />
              </ListGroup>
              <ListGroup header="Security">
                <ListRow icon={LockIcon} iconBg="bg-navy-700" title="App lock" subtitle="Face ID" chevron />
                <ListRow icon={WifiIcon} title="Secure Wi-Fi" chevron />
                <ListRow icon={BellIcon} iconBg="bg-[#E86F00]" title="Alerts" chevron />
              </ListGroup>
            </div>
            <TabBar items={tabs} active={3} />
          </div>
        </PhoneFrame>
      </div>
      <H2>Platform conventions</H2>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Element</TableHead>
              <TableHead>iOS</TableHead>
              <TableHead>Android</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Typeface", "SF Pro (system)", "Roboto (system)"],
              ["Top-level navigation", "Tab bar, 4 items", "Navigation bar, 4 items"],
              ["Back", "Chevron + previous title, edge swipe", "System back gesture"],
              ["Confirmations", "Alert / action sheet", "Material dialog / bottom sheet"],
              ["Switch color", "Success green when on", "Primary blue when on"],
              ["Min touch target", "44×44pt", "48×48dp"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-medium">{r[0]}</TableCell>
                <TableCell className="text-muted-foreground">{r[1]}</TableCell>
                <TableCell className="text-muted-foreground">{r[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <H2>Getting started</H2>
      <CodeBlock language="bash" code={`npm install @carbonite/native lucide-react-native react-native-svg`} />
      <CodeBlock
        className="mt-3"
        code={`import { CarboniteProvider } from "@carbonite/native"

export default function App() {
  return (
    <CarboniteProvider colorScheme="system">
      <AppTabs />
    </CarboniteProvider>
  )
}`}
      />
    </div>
  )
}
