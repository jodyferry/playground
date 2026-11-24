import * as React from "react"
import { Link } from "react-router-dom"
import { HardDriveIcon, LaptopIcon, ShieldCheckIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination } from "@/components/ui/pagination"
import { Preview } from "@/components/site/preview"
import type { ComponentDoc } from "../types"

function TabsExamples() {
  return (
    <Preview
      title="Default"
      description="Tabs switch between related views of the same object without leaving the page."
      code={`<Tabs defaultValue="overview" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="files">Files</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="files">…</TabsContent>
  <TabsContent value="settings">…</TabsContent>
</Tabs>`}
      nativeCode={`// Use SegmentedControl for in-screen views on native
<SegmentedControl
  values={["Overview", "Files", "Settings"]}
  selectedIndex={index}
  onChange={setIndex}
/>`}
    >
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="overview">
            <ShieldCheckIcon /> Overview
          </TabsTrigger>
          <TabsTrigger value="files">
            <HardDriveIcon /> Files
          </TabsTrigger>
          <TabsTrigger value="devices">
            <LaptopIcon /> Devices
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          Your last backup finished 2 hours ago. All 3 devices are protected.
        </TabsContent>
        <TabsContent value="files" className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          184,203 files backed up, using 212 GB.
        </TabsContent>
        <TabsContent value="devices" className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          MacBook Pro, Office desktop, and iPhone 17.
        </TabsContent>
      </Tabs>
    </Preview>
  )
}

function BreadcrumbExamples() {
  return (
    <Preview
      title="Default"
      description="Breadcrumbs show where a page sits in the hierarchy. Use them on web only; native apps rely on the back button."
      code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/devices">Devices</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/devices/mbp">MacBook Pro</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Restore files</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/components">Devices</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/components">MacBook Pro</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Restore files</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Preview>
  )
}

function PaginationExamples() {
  const [page, setPage] = React.useState(4)
  return (
    <Preview
      title="Default"
      description="Use pagination for long tables like file versions or activity logs. On native, prefer infinite scroll."
      code={`const [page, setPage] = useState(1)

<Pagination page={page} pageCount={12} onPageChange={setPage} />`}
      nativeCode={`// Native lists load more on scroll
<FlatList
  data={files}
  onEndReached={loadMore}
  ListFooterComponent={loading ? <Spinner /> : null}
/>`}
    >
      <div className="grid justify-items-center gap-2">
        <Pagination page={page} pageCount={12} onPageChange={setPage} />
        <span className="text-xs text-muted-foreground">Page {page} of 12</span>
      </div>
    </Preview>
  )
}

export const navigationDocs: ComponentDoc[] = [
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    status: "stable",
    summary: "Tabs organize related content into views people can switch between.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`,
    nativeImportCode: `import { SegmentedControl } from "@carbonite/native"`,
    Examples: TabsExamples,
    props: [
      { name: "defaultValue / value", type: "string", description: "Active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the active tab changes." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout and arrow-key direction." },
    ],
    a11y: ["Implements the WAI-ARIA tabs pattern: arrow keys move between tabs, Tab moves into the panel.", "Keep tab labels short, one or two words."],
    Thumb: () => (
      <div className="flex rounded-md bg-secondary p-0.5 text-[11px]">
        <span className="rounded bg-background px-2 py-1 font-medium shadow-raised">Overview</span>
        <span className="px-2 py-1 text-muted-foreground">Files</span>
        <span className="px-2 py-1 text-muted-foreground">Devices</span>
      </div>
    ),
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    status: "stable",
    summary: "Breadcrumbs show the path to the current page and let people move up levels.",
    platforms: ["web"],
    importCode: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`,
    Examples: BreadcrumbExamples,
    props: [{ name: "asChild (link)", type: "boolean", description: "Render a router Link as the breadcrumb link." }],
    a11y: ["Wrapped in <nav aria-label=\"breadcrumb\">.", "The current page uses aria-current=\"page\"."],
    Thumb: () => <div className="text-xs text-muted-foreground">Devices › MacBook › <span className="font-medium text-foreground">Restore</span></div>,
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    status: "stable",
    summary: "Pagination splits long lists into pages people can move between.",
    platforms: ["web"],
    importCode: `import { Pagination } from "@/components/ui/pagination"`,
    Examples: PaginationExamples,
    props: [
      { name: "page", type: "number", description: "Current page (1-based)." },
      { name: "pageCount", type: "number", description: "Total pages." },
      { name: "onPageChange", type: "(page: number) => void", description: "Called when a page is selected." },
    ],
    a11y: ["Wrapped in <nav aria-label=\"Pagination\">; the current page has aria-current=\"page\".", "Previous and next buttons have accessible labels."],
    Thumb: () => (
      <div className="flex gap-1 text-[11px]">
        {["‹", "1", "2", "3", "›"].map((p) => (
          <span key={p} className={`flex size-6 items-center justify-center rounded ${p === "2" ? "bg-primary text-primary-foreground" : ""}`}>
            {p}
          </span>
        ))}
      </div>
    ),
  },
]
