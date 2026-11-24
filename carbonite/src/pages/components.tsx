import * as React from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom"
import { MonitorIcon, SearchIcon, SmartphoneIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/site/code-block"
import { FigmaLink } from "@/components/site/figma-link"
import { H2, Lead, PageHeader, PropsTable, StatusBadge } from "@/components/site/doc-parts"
import { componentCategories, componentDocs, getComponentDoc } from "@/docs/registry"
import type { Platform } from "@/docs/types"

const platformLabel: Record<Platform, string> = { web: "Web", ios: "iOS", android: "Android" }

export function ComponentsOverviewPage() {
  const [q, setQ] = React.useState("")
  const filtered = componentDocs.filter((c) => `${c.name} ${c.summary} ${c.category}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Components"
        description="Components are the reusable building blocks of Carbonite products. Each one is designed, built, and documented for web (React) and native (React Native)."
        actions={<FigmaLink label="Open component library in Figma" />}
      />
      <div className="relative mb-8 max-w-sm">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter components" className="pl-9" aria-label="Filter components" />
      </div>
      {componentCategories.map((cat) => {
        const items = filtered.filter((c) => c.category === cat)
        if (!items.length) return null
        return (
          <section key={cat} className="mb-10">
            <h2 id={cat.toLowerCase().replace(/\s+/g, "-")} className="mb-4 scroll-mt-24 text-xl font-semibold">
              {cat}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  to={`/components/${c.slug}`}
                  className="group overflow-hidden rounded-xl border bg-card shadow-raised transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-overlay outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <div className="pointer-events-none flex h-32 items-center justify-center border-b bg-surface-sunken" aria-hidden="true" inert>
                    {c.Thumb ? <c.Thumb /> : null}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold group-hover:text-primary">{c.name}</span>
                      {c.status !== "stable" && <StatusBadge status={c.status} />}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
      {!filtered.length && <p className="text-muted-foreground">No components match "{q}".</p>}
    </div>
  )
}

export function ComponentPage() {
  const { slug = "" } = useParams()
  const doc = getComponentDoc(slug)
  const [params, setParams] = useSearchParams()
  if (!doc) return <Navigate to="/components" replace />
  const tab = params.get("tab") ?? "examples"
  const { Examples, Usage } = doc

  return (
    <div className="max-w-4xl">
      <div className="mb-3 text-sm text-muted-foreground">
        <Link to="/components" className="hover:text-foreground">
          Components
        </Link>{" "}
        / {doc.category}
      </div>
      <PageHeader
        title={doc.name}
        description={doc.summary}
        actions={
          <>
            <FigmaLink />
            <StatusBadge status={doc.status} />
            <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
            {doc.platforms.map((p) => (
              <Badge key={p} variant="outline" className="gap-1 font-medium text-muted-foreground">
                {p === "web" ? <MonitorIcon /> : <SmartphoneIcon />}
                {platformLabel[p]}
              </Badge>
            ))}
          </>
        }
      />
      <Tabs value={tab} onValueChange={(v) => setParams(v === "examples" ? {} : { tab: v }, { replace: true })}>
        <TabsList className="mb-6 w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          {Usage && <TabsTrigger value="usage">Usage</TabsTrigger>}
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>
        <TabsContent value="examples">
          <Examples />
        </TabsContent>
        <TabsContent value="code">
          <H2 id="installation">Installation</H2>
          <Lead>Components are added to your project with the shadcn CLI from the Carbonite registry, so you own and can extend the source.</Lead>
          <CodeBlock language="bash" code={`npx shadcn@latest add @carbonite/${doc.slug}`} />
          <H2 id="import">Import</H2>
          <div className="grid gap-3">
            <CodeBlock code={doc.importCode} title="Web · React" />
            {doc.nativeImportCode && <CodeBlock code={doc.nativeImportCode} title="Native · React Native" />}
          </div>
          {doc.props && (
            <>
              <H2 id="props">Props</H2>
              <PropsTable props={doc.props} />
            </>
          )}
        </TabsContent>
        {Usage && (
          <TabsContent value="usage">
            <Usage />
          </TabsContent>
        )}
        <TabsContent value="accessibility">
          <H2 id="accessibility">Accessibility</H2>
          <ul className="mt-3 grid gap-3">
            {(doc.a11y ?? []).map((a) => (
              <li key={a} className="flex gap-3 rounded-xl border bg-card p-4 text-[15px] text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {a}
              </li>
            ))}
          </ul>
          <H2 id="keyboard">Testing checklist</H2>
          <div className="prose-doc">
            <ul>
              <li>Operate every interaction with a keyboard only.</li>
              <li>Check with VoiceOver (macOS/iOS) and TalkBack (Android).</li>
              <li>Verify at 200% zoom and with the largest system text size.</li>
              <li>Check both light and dark themes for contrast.</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
