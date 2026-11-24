import { cn } from "@/lib/utils"

const sizes = { sm: "size-4 border-2", md: "size-6 border-[3px]", lg: "size-10 border-4" }

function Spinner({ size = "md", className, label = "Loading" }: { size?: keyof typeof sizes; className?: string; label?: string }) {
  return (
    <span role="status" className={cn("inline-block animate-spin rounded-full border-primary/20 border-t-primary", sizes[size], className)}>
      <span className="sr-only">{label}</span>
    </span>
  )
}
export { Spinner }
