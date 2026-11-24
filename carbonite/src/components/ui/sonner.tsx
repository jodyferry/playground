import { Toaster as Sonner, type ToasterProps } from "sonner"
import { useTheme } from "@/lib/theme"

function Toaster(props: ToasterProps) {
  const { theme } = useTheme()
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{ classNames: { toast: "!rounded-lg !border-border !bg-popover !text-popover-foreground !shadow-overlay", description: "!text-muted-foreground" } }}
      {...props}
    />
  )
}
export { Toaster }
