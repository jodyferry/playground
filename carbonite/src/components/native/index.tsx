/**
 * Web renderings of Carbonite native components, used for demos on the docs site.
 * Production apps use the matching components from @carbonite/native (React Native).
 */
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={cn("flex h-11 items-end justify-between px-7 pb-1.5 text-[13px] font-semibold", dark ? "text-white" : "text-foreground")}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-current p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  )
}

export function NavBar({ title, large, back, trailing, dark }: { title: string; large?: boolean; back?: string; trailing?: React.ReactNode; dark?: boolean }) {
  return (
    <div className={cn("px-4", dark && "text-white")}>
      <div className="flex h-11 items-center justify-between">
        {back ? (
          <button className={cn("-ml-1 flex items-center text-[15px]", dark ? "text-blue-400" : "text-primary")}>
            <ChevronLeftIcon className="size-5" />
            {back}
          </button>
        ) : (
          <span />
        )}
        {!large && <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold">{title}</span>}
        <div className="flex items-center gap-3">{trailing}</div>
      </div>
      {large && <h1 className="pb-2 text-[30px] leading-tight font-bold tracking-tight">{title}</h1>}
    </div>
  )
}

export type TabItem = { label: string; icon: LucideIcon; badge?: number }
export function TabBar({ items, active, onChange }: { items: TabItem[]; active: number; onChange?: (i: number) => void }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 border-t bg-background/95 pt-1.5 pb-6 backdrop-blur" aria-label="Tab bar">
      <ul className="flex">
        {items.map((it, i) => (
          <li key={it.label} className="flex-1">
            <button
              onClick={() => onChange?.(i)}
              aria-current={i === active ? "page" : undefined}
              className={cn("relative flex w-full flex-col items-center gap-0.5 text-[10px] font-medium", i === active ? "text-primary" : "text-muted-foreground")}
            >
              <it.icon className="size-6" strokeWidth={i === active ? 2.25 : 1.75} />
              {it.label}
              {it.badge ? (
                <span className="absolute -top-0.5 left-1/2 ml-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">{it.badge}</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function ListGroup({ header, footer, children }: { header?: string; footer?: string; children: React.ReactNode }) {
  return (
    <div className="px-4">
      {header && <div className="px-4 pb-1.5 text-[12px] font-medium tracking-wide text-muted-foreground uppercase">{header}</div>}
      <div className="divide-y overflow-hidden rounded-xl bg-card shadow-raised dark:border">{children}</div>
      {footer && <div className="px-4 pt-1.5 text-[12px] text-muted-foreground">{footer}</div>}
    </div>
  )
}

export function ListRow({
  icon: Icon,
  iconBg = "bg-primary",
  title,
  subtitle,
  trailing,
  chevron,
}: {
  icon?: LucideIcon
  iconBg?: string
  title: string
  subtitle?: string
  trailing?: React.ReactNode
  chevron?: boolean
}) {
  return (
    <div className="flex min-h-12 items-center gap-3 px-4 py-2.5">
      {Icon && (
        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg text-white", iconBg)}>
          <Icon className="size-[18px]" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px]">{title}</div>
        {subtitle && <div className="truncate text-[13px] text-muted-foreground">{subtitle}</div>}
      </div>
      {trailing}
      {chevron && <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground/70" />}
    </div>
  )
}

export function NativeToggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn("relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors", on ? "bg-success" : "bg-input")}
    >
      <span className={cn("absolute top-[2px] left-[2px] size-[27px] rounded-full bg-white shadow transition-transform", on && "translate-x-5")} />
    </button>
  )
}

export function SegmentedControl({ values, index, onChange }: { values: string[]; index: number; onChange: (i: number) => void }) {
  return (
    <div className="flex rounded-[9px] bg-secondary p-[2px]" role="tablist">
      {values.map((v, i) => (
        <button
          key={v}
          role="tab"
          aria-selected={i === index}
          onClick={() => onChange(i)}
          className={cn("flex-1 rounded-[7px] py-1.5 text-[13px] font-medium transition", i === index ? "bg-background shadow-raised" : "text-muted-foreground")}
        >
          {v}
        </button>
      ))}
    </div>
  )
}

export type ProtectionState = "protected" | "at-risk" | "threat"
const stateMap = {
  protected: { label: "You're protected", sub: "No threats found", ring: "#1BA85E", glow: "rgba(27,168,94,.25)" },
  "at-risk": { label: "Action recommended", sub: "2 settings need attention", ring: "#FFC233", glow: "rgba(255,194,51,.25)" },
  threat: { label: "Threat detected", sub: "1 item quarantined", ring: "#F04438", glow: "rgba(240,68,56,.28)" },
}

export function StatusHero({ state, progress, children }: { state: ProtectionState; progress?: number; children?: React.ReactNode }) {
  const s = stateMap[state]
  const r = 64
  const c = 2 * Math.PI * r
  const scanning = progress !== undefined
  return (
    <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-navy-900 to-navy-800 px-6 pt-2 pb-8 text-white">
      <div className="relative size-40" style={{ filter: `drop-shadow(0 0 24px ${s.glow})` }}>
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={scanning ? "#4D94FF" : s.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={scanning ? c * (1 - (progress ?? 0) / 100) : 0}
            style={{ transition: "stroke-dashoffset .4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {scanning ? (
            <>
              <span className="text-3xl font-bold">{Math.round(progress ?? 0)}%</span>
              <span className="text-xs text-white/70">Scanning…</span>
            </>
          ) : (
            children
          )}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">{scanning ? "Scanning your device" : s.label}</div>
        <div className="text-sm text-white/70">{scanning ? "Checking apps and files" : s.sub}</div>
      </div>
    </div>
  )
}
