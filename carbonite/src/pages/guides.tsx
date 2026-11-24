import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRightIcon, CodeIcon, GitPullRequestIcon, MessageCircleIcon, PaletteIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/site/code-block"
import { FigmaIcon, FigmaLink } from "@/components/site/figma-link"
import { Callout, DoDont, DoDontGrid, H2, Lead, PageHeader } from "@/components/site/doc-parts"
import { palettes, radii, semanticTokens, spacing, typeScale } from "@/lib/tokens"

/* ---------------- Get started ---------------- */

export function GetStartedPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Get started"
        description="The Carbonite Design System is the single source of truth for building Carbonite products. Pick your path to begin."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { t: "For designers", d: "Set up the Figma libraries and learn how tokens and components map to code.", h: "/get-started/designers", i: PaletteIcon },
          { t: "For developers", d: "Install the packages, configure Tailwind and the theme, and add your first component.", h: "/get-started/developers", i: CodeIcon },
        ].map((c) => (
          <Link key={c.h} to={c.h} className="group rounded-2xl border bg-card p-6 shadow-raised transition hover:border-primary/40 hover:shadow-overlay">
            <c.i className="mb-4 size-7 text-primary" />
            <div className="flex items-center gap-1.5 text-lg font-semibold">
              {c.t} <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
          </Link>
        ))}
      </div>
      <H2>What's in the system</H2>
      <div className="rounded-xl border">
        <Table>
          <TableBody>
            {[
              ["Foundations", "Color, typography, spacing, elevation, radius, icons, grid, motion, accessibility", "/foundations"],
              ["Tokens", "Design decisions as named variables for CSS, Tailwind, and React Native", "/tokens"],
              ["Components", "Accessible React and React Native components with live demos", "/components"],
              ["Patterns", "Reusable solutions for common product flows", "/patterns"],
              ["Content", "Voice, tone, and writing guidelines", "/content"],
            ].map(([a, b, h]) => (
              <TableRow key={a}>
                <TableCell className="w-40 font-semibold">
                  <Link to={h} className="text-primary hover:underline">
                    {a}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{b}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <H2>Get help</H2>
      <Lead>Ask questions in the #design-system channel, join office hours on Thursdays, or open an issue in the design system repo.</Lead>
    </div>
  )
}

export function DesignersPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Get started" title="For designers" description="Everything you need to design Carbonite products in Figma." actions={<FigmaLink label="Open Carbonite UI kit" />} />
      <H2>1. Enable the libraries</H2>
      <Lead>In Figma, open Assets, choose Team libraries, and turn on the libraries below.</Lead>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Carbonite Foundations", "Colors, type, effects, and variables"],
          ["Carbonite Web", "Components for web apps"],
          ["Carbonite Native", "iOS and Android components"],
        ].map(([n, d]) => (
          <a key={n} href="#" onClick={(e) => e.preventDefault()} className="rounded-xl border p-4 transition hover:border-primary/40">
            <FigmaIcon className="mb-3 size-5" />
            <div className="font-semibold">{n}</div>
            <div className="text-sm text-muted-foreground">{d}</div>
          </a>
        ))}
      </div>
      <H2>2. Use variables, not raw values</H2>
      <Lead>Figma variables mirror our code tokens one to one, with Light and Dark modes. Applying variables means developers get exact token names in Dev Mode.</Lead>
      <DoDontGrid>
        <DoDont kind="do">Apply the color/interactive/primary variable to a button fill.</DoDont>
        <DoDont kind="dont">Paste a hex value like #0B5FD1 directly onto a layer.</DoDont>
      </DoDontGrid>
      <H2>3. Design for both themes and both platforms</H2>
      <Lead>Switch your frame's variable mode to Dark to check every screen. For mobile, start from the native templates, which include safe areas and system bars.</Lead>
    </div>
  )
}

export function DevelopersPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Get started" title="For developers" description="Set up Carbonite in a React web app or a React Native app." />
      <Tabs defaultValue="web">
        <TabsList>
          <TabsTrigger value="web">Web (React)</TabsTrigger>
          <TabsTrigger value="native">Native (React Native)</TabsTrigger>
        </TabsList>
        <TabsContent value="web">
          <H2 id="install-web">1. Install</H2>
          <Lead>Carbonite web components are distributed through a shadcn registry. You get the component source in your repo, styled by Carbonite tokens.</Lead>
          <CodeBlock language="bash" code={`npx shadcn@latest init\nnpx shadcn@latest add @carbonite/theme @carbonite/button @carbonite/card`} />
          <H2 id="theme-web">2. Add the theme</H2>
          <Lead>The theme adds Carbonite tokens as CSS variables and maps them to Tailwind.</Lead>
          <CodeBlock
            language="css"
            title="src/index.css"
            code={`@import "tailwindcss";
@import "@carbonite/tokens/theme.css";

/* Tokens are now available as utilities */
/* bg-primary, text-muted-foreground, shadow-raised, rounded-xl … */`}
          />
          <H2 id="use-web">3. Use a component</H2>
          <CodeBlock
            code={`import { Button } from "@/components/ui/button"

export function BackupAction() {
  return <Button onClick={startBackup}>Back up now</Button>
}`}
          />
        </TabsContent>
        <TabsContent value="native">
          <H2 id="install-native">1. Install</H2>
          <CodeBlock language="bash" code={`npm install @carbonite/native @carbonite/tokens lucide-react-native react-native-svg`} />
          <H2 id="provider">2. Wrap your app</H2>
          <CodeBlock
            code={`import { CarboniteProvider } from "@carbonite/native"

export default function App() {
  return (
    <CarboniteProvider colorScheme="system">
      <RootNavigator />
    </CarboniteProvider>
  )
}`}
          />
          <H2 id="use-native">3. Use a component</H2>
          <CodeBlock
            code={`import { Button } from "@carbonite/native"

export function BackupAction() {
  return <Button size="lg" onPress={startBackup}>Back up now</Button>
}`}
          />
        </TabsContent>
      </Tabs>
      <Callout title="About this site">This documentation site itself is built with React, Vite, Tailwind CSS v4, and shadcn/ui. Its source is a working reference implementation.</Callout>
    </div>
  )
}

export function ContributingPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Get started" title="Contributing" description="The system grows through contributions from product teams. Here's how to propose a change." />
      <ol className="grid gap-4">
        {[
          ["Check what exists", "Search this site and the Figma libraries. Many needs are met by composing existing components."],
          ["Open a proposal", "Describe the problem, where it appears, and who else needs it. Include screenshots or a prototype."],
          ["Review with the team", "We review proposals weekly for fit, accessibility, and cross-platform impact."],
          ["Design and build", "Build it in Figma and code together. Every component needs web and native designs, docs, and tests."],
          ["Release", "Changes ship in the next minor release and are announced in the changelog."],
        ].map(([t, d], i) => (
          <li key={t} className="flex gap-4 rounded-xl border p-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
            <div>
              <div className="font-semibold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>
          <GitPullRequestIcon /> Open a proposal
        </Button>
        <Button variant="outline">
          <MessageCircleIcon /> Ask in #design-system
        </Button>
      </div>
    </div>
  )
}

/* ---------------- Tokens ---------------- */

export function TokensOverviewPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Design tokens"
        description="Tokens are named design decisions. They replace hard-coded values so products stay consistent, and theming (like dark mode) happens in one place."
        actions={
          <Button asChild>
            <Link to="/tokens/all">Browse all tokens</Link>
          </Button>
        }
      />
      <H2>How tokens are structured</H2>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Primitive", "color.blue.600", "Raw values. The full palette, spacing steps, and radii."],
          ["Semantic", "color.interactive.primary", "Purpose-based. Points to a primitive and changes per theme."],
          ["Component", "button.primary.background", "Optional. Scoped to a single component when needed."],
        ].map(([t, e, d], i) => (
          <div key={t} className="rounded-xl border p-5">
            <Badge variant={i === 1 ? "default" : "secondary"}>{t}</Badge>
            <code className="mt-3 block font-mono text-sm font-semibold">{e}</code>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <Callout title="Use semantic tokens in product code">Reach for semantic tokens first. They're what make dark mode and future brand updates work without touching components.</Callout>
      <H2>Naming</H2>
      <Lead>Token names read from general to specific: category, then property, then variant, then state.</Lead>
      <div className="flex flex-wrap items-center gap-1 rounded-xl border bg-surface-sunken p-5 font-mono text-sm">
        {["color", "interactive", "primary", "hovered"].map((p, i) => (
          <React.Fragment key={p}>
            {i > 0 && <span className="text-muted-foreground">.</span>}
            <span className="rounded-md bg-card px-2 py-1 shadow-raised">{p}</span>
          </React.Fragment>
        ))}
      </div>
      <H2>Formats</H2>
      <Tabs defaultValue="css">
        <TabsList>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="tw">Tailwind</TabsTrigger>
          <TabsTrigger value="rn">React Native</TabsTrigger>
        </TabsList>
        <TabsContent value="css">
          <CodeBlock language="css" code={`.card {\n  background: var(--card);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-raised);\n}`} />
        </TabsContent>
        <TabsContent value="tw">
          <CodeBlock code={`<div className="bg-card border border-border shadow-raised rounded-xl p-4" />`} />
        </TabsContent>
        <TabsContent value="rn">
          <CodeBlock code={`import { tokens, useTheme } from "@carbonite/native"\n\nconst { colors } = useTheme()\n<View style={{ backgroundColor: colors.surface.card, padding: tokens.space[200], borderRadius: tokens.radius.xlarge }} />`} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

type Row = { name: string; value: string; dark?: string; type: string; preview?: React.ReactNode; css?: string }

export function AllTokensPage() {
  const [q, setQ] = React.useState("")
  const [type, setType] = React.useState("all")
  const rows: Row[] = [
    ...semanticTokens.map((t) => ({ name: t.name, value: t.light, dark: t.dark, type: "color", css: `var(${t.cssVar})`, preview: <span className="block size-6 rounded-md ring-1 ring-black/10 dark:ring-white/15" style={{ background: `var(${t.cssVar})` }} /> })),
    ...palettes.flatMap((p) => p.swatches.map(([s, h]) => ({ name: `color.${p.token}.${s}`, value: h, type: "color", preview: <span className="block size-6 rounded-md ring-1 ring-black/10" style={{ background: h }} /> }))),
    ...spacing.map(([n, v]) => ({ name: n, value: v, type: "space", preview: <span className="block h-3 rounded-sm bg-primary" style={{ width: v }} /> })),
    ...radii.map(([n, v]) => ({ name: n, value: v, type: "radius", preview: <span className="block size-6 border-2 border-primary" style={{ borderRadius: v }} /> })),
    ...typeScale.map(([n, v, w]) => ({ name: n, value: `${v} · ${w}`, type: "typography" })),
    { name: "shadow.raised", value: "0 1px 2px rgb(11 30 63 / .08)", type: "elevation", css: "var(--shadow-raised)", preview: <span className="block size-6 rounded-md bg-card shadow-raised" /> },
    { name: "shadow.overlay", value: "0 8px 24px rgb(11 30 63 / .14)", type: "elevation", css: "var(--shadow-overlay)", preview: <span className="block size-6 rounded-md bg-card shadow-overlay" /> },
  ]
  const filtered = rows.filter((r) => (type === "all" || r.type === type) && r.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="max-w-5xl">
      <PageHeader eyebrow="Tokens" title="All tokens" description={`${rows.length} tokens across color, space, radius, typography, and elevation.`} />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tokens" className="pl-9" aria-label="Search tokens" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["all", "color", "space", "radius", "typography", "elevation"].map((t) => (
            <Button key={t} size="sm" variant={type === t ? "default" : "outline"} onClick={() => setType(t)} className="capitalize">
              {t}
            </Button>
          ))}
        </div>
      </div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <span className="sr-only">Preview</span>
              </TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Dark</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.name}>
                <TableCell>{r.preview}</TableCell>
                <TableCell>
                  <code className="font-mono text-[12px] font-semibold whitespace-nowrap">{r.name}</code>
                  {r.css && <div className="font-mono text-[11px] text-muted-foreground">{r.css}</div>}
                </TableCell>
                <TableCell className="font-mono text-[12px] whitespace-nowrap text-muted-foreground">{r.value}</TableCell>
                <TableCell className="font-mono text-[12px] text-muted-foreground">{r.dark ?? "–"}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{r.type}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!filtered.length && <p className="p-6 text-center text-sm text-muted-foreground">No tokens match.</p>}
      </div>
    </div>
  )
}

/* ---------------- Content ---------------- */

export function ContentOverviewPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader title="Content" description="Words are part of the design. Clear, calm content helps people feel in control of their security." />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Voice and tone", "/content/voice-and-tone", "Who we sound like, and how that shifts with context."],
          ["Writing style", "/content/writing-style", "Grammar, capitalization, numbers, and formatting."],
          ["Terminology", "/content/terminology", "The words we use for backup and security concepts."],
        ].map(([t, h, d]) => (
          <Link key={h} to={h} className="rounded-xl border p-5 transition hover:border-primary/40">
            <div className="font-semibold">{t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function VoiceTonePage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Content" title="Voice and tone" description="Our voice stays the same everywhere. Our tone adapts to what people are going through." />
      <H2>Our voice</H2>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Reassuring", "not alarmist", "We state risks plainly and always pair them with a next step."],
          ["Clear", "not technical", "We explain what happened in everyday words. Jargon only when people need it."],
          ["Confident", "not arrogant", "We're experts, and we show it by being helpful, not by boasting."],
        ].map(([a, b, d]) => (
          <div key={a} className="rounded-xl border p-5">
            <div className="text-lg font-semibold">{a}</div>
            <div className="text-sm font-medium text-primary">{b}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <H2>Tone by moment</H2>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Moment</TableHead>
              <TableHead>Tone</TableHead>
              <TableHead className="min-w-64">Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Everything is fine", "Light, brief", "You're protected. Last backup 2 hours ago."],
              ["Threat found", "Calm, direct", "We found and quarantined 1 threat. Your files are safe."],
              ["Action needed", "Clear, specific", "Turn on real-time protection to block threats as they appear."],
              ["Error", "Honest, helpful", "We couldn't reach your device. Check that it's online, then try again."],
              ["Data loss risk", "Serious, careful", "Deleting this backup removes 212 GB of files permanently."],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-medium whitespace-nowrap">{r[0]}</TableCell>
                <TableCell className="text-muted-foreground">{r[1]}</TableCell>
                <TableCell className="text-muted-foreground">"{r[2]}"</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <H2>Examples</H2>
      <DoDontGrid>
        <DoDont kind="do">"We blocked a suspicious website. You don't need to do anything."</DoDont>
        <DoDont kind="dont">"WARNING!!! MALICIOUS URL DETECTED. YOUR SYSTEM MAY BE COMPROMISED."</DoDont>
        <DoDont kind="do">"Your backup is paused because you're on cellular data."</DoDont>
        <DoDont kind="dont">"Error 0x80070057: Backup operation could not be completed."</DoDont>
      </DoDontGrid>
    </div>
  )
}

export function WritingStylePage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Content" title="Writing style" description="Consistent mechanics make our content easier to read and trust." />
      <div className="prose-doc">
        <h2 id="capitalization">Capitalization</h2>
        <p>
          Use <strong>sentence case</strong> everywhere: page titles, headings, buttons, menu items, and labels. Capitalize only the first word and proper nouns.
        </p>
        <h2 id="punctuation">Punctuation</h2>
        <ul>
          <li>No periods on headings, buttons, labels, or single-sentence tooltips.</li>
          <li>Use periods on full sentences in descriptions and messages.</li>
          <li>Avoid exclamation points, especially in security messages.</li>
          <li>Use the Oxford comma.</li>
          <li>Don't use em dashes. Split the thought into two sentences, or use a comma or colon.</li>
        </ul>
        <h2 id="numbers">Numbers, dates, and sizes</h2>
        <ul>
          <li>Use numerals for all numbers: "3 devices", not "three devices".</li>
          <li>Use relative times under 7 days ("2 hours ago"), then dates ("Nov 24, 2026").</li>
          <li>Show storage with one decimal at most: "212 GB", "1.5 TB". Put a space before the unit.</li>
        </ul>
        <h2 id="actions">Action labels</h2>
        <ul>
          <li>Start with a verb that describes the outcome: "Restore files", "Add device".</li>
          <li>Keep labels consistent through a flow. If the button says "Remove device", the confirmation says "Remove device" too.</li>
        </ul>
      </div>
    </div>
  )
}

export function TerminologyPage() {
  const terms = [
    ["Back up (verb)", "Back up your files.", "Backup (as a verb)"],
    ["Backup (noun)", "Your backup is complete.", "Back-up"],
    ["Restore", "Restore files to this device.", "Recover, retrieve"],
    ["Device", "Add a device.", "Computer, machine, endpoint (in consumer UI)"],
    ["Threat", "1 threat quarantined.", "Virus (unless it's specifically a virus)"],
    ["Quarantine", "We moved the file to quarantine.", "Jail, isolate"],
    ["Sign in / sign out", "Sign in to your account.", "Log in, login (as a verb)"],
    ["Real-time protection", "Turn on real-time protection.", "Live shield, active scan"],
  ]
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Content" title="Terminology" description="Use these terms consistently in product UI, help content, and notifications." />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Use</TableHead>
              <TableHead>Example</TableHead>
              <TableHead>Avoid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {terms.map(([u, e, a]) => (
              <TableRow key={u}>
                <TableCell className="font-semibold whitespace-nowrap">{u}</TableCell>
                <TableCell className="text-muted-foreground">{e}</TableCell>
                <TableCell className="text-destructive">{a}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/* ---------------- Resources ---------------- */

export function ResourcesOverviewPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader title="Resources" description="Libraries, assets, and updates to help you work with the system." />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Figma libraries", "/resources/figma", "Foundations, web, and native component libraries."],
          ["Icons", "/resources/icons", "The Lucide icon set and usage guidance."],
          ["Changelog", "/resources/changelog", "What changed in each release."],
        ].map(([t, h, d]) => (
          <Link key={h} to={h} className="rounded-xl border p-5 transition hover:border-primary/40">
            <div className="font-semibold">{t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function FigmaPage() {
  const libs = [
    ["Carbonite Foundations", "Variables for color, type, spacing, radius, and effects. Light and dark modes.", "v1.0"],
    ["Carbonite Web", "All web components with variants, properties, and auto layout.", "v1.0"],
    ["Carbonite Native", "iOS and Android components, system bars, and keyboard templates.", "v1.0"],
    ["Carbonite Patterns", "Page templates for the console, account portal, and mobile app.", "v0.9"],
    ["Carbonite Icons", "Lucide icons as Figma components, sized 16 to 32px.", "v1.0"],
  ]
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Resources" title="Figma libraries" description="Published team libraries for designing Carbonite products." />
      <div className="grid gap-3">
        {libs.map(([n, d, v]) => (
          <div key={n} className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-navy-900">
              <FigmaIcon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-semibold">
                {n} <Badge variant="secondary">{v}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
            <FigmaLink />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChangelogPage() {
  const releases = [
    { v: "1.0.0", d: "Nov 24, 2026", items: [["New", "Status hero, Tab bar, List row, and Segmented control for native."], ["New", "Dark theme for every semantic token."], ["Improved", "Focus rings increased to 3px for better visibility."]] },
    { v: "0.9.0", d: "Oct 14, 2026", items: [["New", "Empty state component and pattern guidance."], ["Improved", "Table supports row selection."], ["Fixed", "Select menu now matches trigger width."]] },
    { v: "0.8.0", d: "Sep 2, 2026", items: [["New", "Toast built on Sonner."], ["Changed", "Badge variant 'error' renamed to 'danger'."]] },
  ]
  const variant = { New: "info", Improved: "success", Fixed: "secondary", Changed: "warning" } as const
  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow="Resources" title="Changelog" description="Every release of the Carbonite Design System." />
      <ol className="relative grid gap-10 border-l pl-6">
        {releases.map((r) => (
          <li key={r.v} className="relative">
            <span className="absolute top-1.5 -left-[31px] size-3 rounded-full border-2 border-background bg-primary" />
            <h2 id={`v${r.v}`} className="scroll-mt-24 text-xl font-semibold">
              v{r.v}
            </h2>
            <div className="text-sm text-muted-foreground">{r.d}</div>
            <ul className="mt-3 grid gap-2">
              {r.items.map(([k, t]) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <Badge variant={variant[k as keyof typeof variant]} className="w-20 justify-center">
                    {k}
                  </Badge>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
      <div className="text-6xl font-bold text-primary">404</div>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <Button className="mt-6" asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  )
}
