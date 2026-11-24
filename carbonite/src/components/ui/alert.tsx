import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[1.25rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-5 [&>svg]:translate-y-0",
  {
    variants: {
      variant: {
        info: "border-primary/25 bg-info-subtle [&>svg]:text-primary",
        success: "border-success/25 bg-success-subtle [&>svg]:text-success",
        warning: "border-warning/50 bg-warning-subtle [&>svg]:text-warning-text",
        danger: "border-destructive/25 bg-danger-subtle [&>svg]:text-destructive",
        neutral: "bg-card [&>svg]:text-muted-foreground",
      },
    },
    defaultVariants: { variant: "info" },
  }
)

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("col-start-2 font-semibold leading-5", className)} {...props} />
}
function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("col-start-2 grid gap-2 text-muted-foreground [&_p]:leading-relaxed", className)} {...props} />
}
export { Alert, AlertTitle, AlertDescription }
