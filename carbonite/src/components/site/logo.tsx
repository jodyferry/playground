import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0B1E3F" />
      <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" fill="none" stroke="#4D94FF" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="22.5" cy="16" r="2.2" fill="#FF8A1F" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="text-[17px] font-bold tracking-tight">Carbonite</span>
        <span className="hidden text-[15px] font-medium text-muted-foreground sm:inline">Design System</span>
      </span>
    </span>
  )
}
