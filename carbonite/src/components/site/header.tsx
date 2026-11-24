import * as React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Logo } from "@/components/site/logo"
import { SearchButton } from "@/components/site/search"
import { SidebarNav } from "@/components/site/sidebar"
import { topNav } from "@/lib/nav"
import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function Header() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = React.useState(false)
  const { pathname } = useLocation()
  React.useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
        <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
          <MenuIcon />
        </Button>
        <Link to="/" className="mr-4 shrink-0 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {topNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                  isActive && "text-foreground after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-primary"
                )
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchButton />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle color theme">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{theme === "dark" ? "Light mode" : "Dark mode"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[300px] gap-0 overflow-y-auto p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <div className="border-b p-4">
            <Logo />
          </div>
          <nav className="grid gap-0.5 border-b p-3" aria-label="Main">
            {topNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn("rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary", isActive && "bg-accent text-accent-foreground")
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <div className="p-3">
            <SidebarNav />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
