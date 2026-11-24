import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Pagination({ page, pageCount, onPageChange, className }: { page: number; pageCount: number; onPageChange: (p: number) => void; className?: string }) {
  const pages: (number | "…")[] = []
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) pages.push(i)
    else if (pages[pages.length - 1] !== "…") pages.push("…")
  }
  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button
        className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className={cn(buttonVariants({ variant: p === page ? "default" : "ghost", size: "icon-sm" }))}
          >
            {p}
          </button>
        )
      )}
      <button
        className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  )
}
export { Pagination }
