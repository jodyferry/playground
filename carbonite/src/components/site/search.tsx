import * as React from "react"
import { useNavigate } from "react-router-dom"
import { FileTextIcon, ComponentIcon, SearchIcon } from "lucide-react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { sidebars } from "@/lib/nav"
import { componentDocs } from "@/docs/registry"

export function SearchButton() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea"))) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 items-center gap-2 rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground transition hover:border-ring/60 md:w-56 lg:w-64 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        aria-label="Search"
      >
        <SearchIcon className="size-4" />
        <span className="hidden md:inline">Search…</span>
        <kbd className="ml-auto hidden rounded border bg-background px-1.5 font-mono text-[11px] md:inline">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components, foundations, patterns…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            {componentDocs.map((c) => (
              <CommandItem key={c.slug} value={`component ${c.name} ${c.category}`} onSelect={() => go(`/components/${c.slug}`)}>
                <ComponentIcon />
                {c.name}
                <span className="ml-auto text-xs text-muted-foreground">{c.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {Object.values(sidebars)
            .flat()
            .map((section) => (
              <CommandGroup key={section.title} heading={section.title}>
                {section.items.map((item) => (
                  <CommandItem key={item.href} value={`${section.title} ${item.title}`} onSelect={() => go(item.href)}>
                    <FileTextIcon />
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
