import { NavLink, useLocation } from "react-router-dom"
import { sidebars, type NavSection } from "@/lib/nav"
import { componentCategories, componentDocs } from "@/docs/registry"
import { cn } from "@/lib/utils"

export function useSidebarSections(): NavSection[] | null {
  const { pathname } = useLocation()
  const section = pathname.split("/")[1]
  if (section === "components") {
    return [
      { title: "Components", items: [{ title: "Overview", href: "/components" }] },
      ...componentCategories.map((cat) => ({
        title: cat,
        items: componentDocs
          .filter((c) => c.category === cat)
          .map((c) => ({ title: c.name, href: `/components/${c.slug}`, badge: c.status === "native" ? "Native" : c.status === "new" ? "New" : undefined })),
      })),
    ]
  }
  return sidebars[section] ?? null
}

export function SidebarNav() {
  const sections = useSidebarSections()
  if (!sections) return null
  return (
    <div className="grid gap-6">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="mb-1.5 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{section.title}</div>
          <ul className="grid gap-0.5">
            {section.items.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                      isActive && "bg-accent font-semibold text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                    )
                  }
                >
                  {item.title}
                  {item.badge && (
                    <span className={cn("rounded px-1.5 text-[10px] font-semibold", item.badge === "Native" ? "bg-brand-accent/20 text-orange-700 dark:text-orange-300" : "bg-info-subtle text-primary")}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
