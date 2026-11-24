import * as React from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { Header } from "@/components/site/header"
import { SidebarNav, useSidebarSections } from "@/components/site/sidebar"
import { LogoMark } from "@/components/site/logo"
import { cn } from "@/lib/utils"

function OnThisPage() {
  const { pathname } = useLocation()
  const [headings, setHeadings] = React.useState<{ id: string; text: string }[]>([])
  const [active, setActive] = React.useState<string>("")

  React.useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return
    let obs: IntersectionObserver | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    const scan = () => {
      const els = Array.from(main.querySelectorAll<HTMLElement>("h2[id]"))
      setHeadings((prev) => {
        const next = els.map((el) => ({ id: el.id, text: el.textContent ?? "" }))
        return JSON.stringify(prev) === JSON.stringify(next) ? prev : next
      })
      obs?.disconnect()
      obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-80px 0px -70% 0px" })
      els.forEach((el) => obs!.observe(el))
    }
    scan()
    const mo = new MutationObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(scan, 100)
    })
    mo.observe(main, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      obs?.disconnect()
      clearTimeout(timer)
    }
  }, [pathname])

  if (headings.length < 2) return null
  return (
    <nav className="sticky top-24 hidden w-52 shrink-0 self-start xl:block" aria-label="On this page">
      <div className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">On this page</div>
      <ul className="grid gap-1 border-l text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
                history.replaceState(null, "", `#${h.id}`)
              }}
              className={cn("-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-muted-foreground hover:text-foreground", active === h.id && "border-primary font-medium text-foreground")}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="border-t bg-surface-sunken">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <LogoMark className="size-5" />
          <span>Carbonite Design System · v1.0</span>
        </div>
        <p className="max-w-xl text-xs leading-relaxed">
          A concept design system by Jody Ferry, inspired by the Carbonite brand. Not affiliated with or endorsed by OpenText or Carbonite.
        </p>
        <div className="flex gap-4">
          <Link to="/resources/changelog" className="hover:text-foreground">
            Changelog
          </Link>
          <Link to="/get-started/contributing" className="hover:text-foreground">
            Contribute
          </Link>
        </div>
      </div>
    </footer>
  )
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  React.useEffect(() => {
    if (hash) {
      setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 80)
    } else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export function DocsLayout() {
  const sections = useSidebarSections()
  return (
    <div className="mx-auto flex max-w-[1440px] gap-10 px-4 sm:px-6">
      {sections && (
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r py-8 pr-4 lg:block">
          <SidebarNav />
        </aside>
      )}
      <main className="min-w-0 flex-1 py-8 lg:py-10">
        <Outlet />
      </main>
      <OnThisPage />
    </div>
  )
}
