import * as React from "react"
import { Slot } from "radix-ui"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Breadcrumb = (props: React.ComponentProps<"nav">) => <nav aria-label="breadcrumb" {...props} />
const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground", className)} {...props} />
)
const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"
  return <Comp className={cn("transition-colors hover:text-foreground", className)} {...props} />
}
const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span role="link" aria-disabled="true" aria-current="page" className={cn("font-medium text-foreground", className)} {...props} />
)
const BreadcrumbSeparator = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    <ChevronRightIcon />
  </li>
)
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator }
