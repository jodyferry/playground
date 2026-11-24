import * as React from "react"
import { cn } from "@/lib/utils"

function EmptyState({ icon, title, description, actions, className }: { icon?: React.ReactNode; title: string; description?: string; actions?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex max-w-sm flex-col items-center gap-3 text-center", className)}>
      {icon && <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary [&_svg]:size-7">{icon}</div>}
      <div className="space-y-1">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="mt-1 flex flex-wrap justify-center gap-2">{actions}</div>}
    </div>
  )
}
export { EmptyState }
