import * as React from "react"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type PropDef = { name: string; type: string; default?: string; description: string }

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead className="min-w-56">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((p) => (
            <TableRow key={p.name}>
              <TableCell className="font-mono text-[13px] font-semibold text-primary">{p.name}</TableCell>
              <TableCell className="font-mono text-[12px] text-muted-foreground">{p.type}</TableCell>
              <TableCell className="font-mono text-[12px] text-muted-foreground">{p.default ?? "–"}</TableCell>
              <TableCell className="text-muted-foreground">{p.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function DoDont({ kind, children, example }: { kind: "do" | "dont"; children: React.ReactNode; example?: React.ReactNode }) {
  const isDo = kind === "do"
  return (
    <div className="overflow-hidden rounded-xl border">
      {example && <div className="flex min-h-32 items-center justify-center gap-3 bg-surface-sunken p-6">{example}</div>}
      <div className={cn("border-t-4 p-4 text-sm", isDo ? "border-success" : "border-destructive")}>
        <div className={cn("mb-1 flex items-center gap-1.5 font-semibold", isDo ? "text-success" : "text-destructive")}>
          {isDo ? <CheckCircle2Icon className="size-4" /> : <XCircleIcon className="size-4" />}
          {isDo ? "Do" : "Don't"}
        </div>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

export function DoDontGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-4 grid gap-4 sm:grid-cols-2">{children}</div>
}

export type Status = "stable" | "beta" | "new" | "native"
export function StatusBadge({ status }: { status: Status }) {
  const map = {
    stable: { label: "Stable", variant: "success" as const },
    beta: { label: "Beta", variant: "warning" as const },
    new: { label: "New", variant: "info" as const },
    native: { label: "Native", variant: "accent" as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <header className="mb-8 border-b pb-8">
      {eyebrow && <div className="mb-2 text-sm font-semibold text-primary">{eyebrow}</div>}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
      {actions && <div className="mt-5 flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  const slug = id ?? String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return (
    <h2 id={slug} className="mt-12 mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  )
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="my-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">{children}</p>
}

export function Callout({ title, children, tone = "info" }: { title?: string; children: React.ReactNode; tone?: "info" | "warning" }) {
  return (
    <div className={cn("my-5 rounded-xl border-l-4 p-4 text-sm", tone === "info" ? "border-primary bg-info-subtle" : "border-warning bg-warning-subtle")}>
      {title && <div className="mb-1 font-semibold">{title}</div>}
      <div className="text-muted-foreground [&_code]:rounded [&_code]:bg-background [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em]">{children}</div>
    </div>
  )
}

export function PhoneFrame({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <figure className="flex flex-col items-center gap-2">
      <div className={cn("relative w-[290px] rounded-[44px] border-[10px] border-navy-950 bg-navy-950 shadow-overlay dark:border-[#1b2a45]", className)}>
        <div className="absolute top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-navy-950 dark:bg-[#1b2a45]" />
        <div className="relative h-[580px] overflow-hidden rounded-[34px] bg-background">{children}</div>
      </div>
      {label && <figcaption className="text-xs font-medium text-muted-foreground">{label}</figcaption>}
    </figure>
  )
}
