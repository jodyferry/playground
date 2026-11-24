import * as React from "react"
import { FolderOpenIcon, LaptopIcon, MonitorIcon, MoreHorizontalIcon, SearchXIcon, SmartphoneIcon, UploadCloudIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EmptyState } from "@/components/ui/empty-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Preview } from "@/components/site/preview"
import type { ComponentDoc } from "../types"

function CardExamples() {
  return (
    <>
      <Preview
        title="Device card"
        description="Cards group related information and actions about a single subject."
        code={`<Card className="w-full max-w-sm">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>MacBook Pro</CardTitle>
      <Badge variant="success">Protected</Badge>
    </div>
    <CardDescription>Last backup 2 hours ago</CardDescription>
  </CardHeader>
  <CardContent>
    <Progress value={64} aria-label="Storage used" />
  </CardContent>
  <CardFooter>
    <Button size="sm">Back up now</Button>
    <Button size="sm" variant="ghost">View files</Button>
  </CardFooter>
</Card>`}
        nativeCode={`<Card onPress={() => navigate("Device", { id })}>
  <Card.Header
    title="MacBook Pro"
    subtitle="Last backup 2 hours ago"
    trailing={<Badge variant="success">Protected</Badge>}
  />
  <ProgressBar progress={0.64} />
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <LaptopIcon className="size-5" />
                </div>
                <div>
                  <CardTitle>MacBook Pro</CardTitle>
                  <CardDescription>Last backup 2 hours ago</CardDescription>
                </div>
              </div>
              <Badge variant="success">Protected</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Storage used</span>
              <span>128 GB of 200 GB</span>
            </div>
            <Progress value={64} aria-label="Storage used" />
          </CardContent>
          <CardFooter>
            <Button size="sm">
              <UploadCloudIcon /> Back up now
            </Button>
            <Button size="sm" variant="ghost">
              View files
            </Button>
          </CardFooter>
        </Card>
      </Preview>
      <Preview
        title="Stat cards"
        code={`<Card>
  <CardHeader>
    <CardDescription>Threats blocked</CardDescription>
    <CardTitle className="text-3xl">1,284</CardTitle>
  </CardHeader>
</Card>`}
        nativeCode={`<StatCard label="Threats blocked" value="1,284" trend="+12%" />`}
      >
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {[
            ["Devices protected", "3 of 3", "All up to date"],
            ["Threats blocked", "1,284", "+12% this month"],
            ["Files backed up", "184K", "212 GB total"],
          ].map(([l, v, d]) => (
            <Card key={l} className="gap-1 py-4">
              <CardHeader className="gap-1 px-4">
                <CardDescription>{l}</CardDescription>
                <CardTitle className="text-2xl font-bold tracking-tight">{v}</CardTitle>
                <span className="text-xs text-muted-foreground">{d}</span>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Preview>
    </>
  )
}

const devices = [
  { name: "MacBook Pro", os: "macOS 16", icon: LaptopIcon, status: "Protected", last: "2 hours ago", user: "JF" },
  { name: "Office desktop", os: "Windows 11", icon: MonitorIcon, status: "At risk", last: "6 days ago", user: "AK" },
  { name: "iPhone 17", os: "iOS 20", icon: SmartphoneIcon, status: "Protected", last: "14 minutes ago", user: "JF" },
  { name: "Reception PC", os: "Windows 11", icon: MonitorIcon, status: "Threat found", last: "1 hour ago", user: "MR" },
]
const statusVariant = { Protected: "success", "At risk": "warning", "Threat found": "danger" } as const

function TableExamples() {
  const [selected, setSelected] = React.useState<string[]>([])
  return (
    <Preview
      title="Device list"
      description="Tables display structured data people need to scan, compare, and act on. On small screens, the table scrolls horizontally; on native, use a list."
      className="block p-4 sm:p-6"
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Device</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Last backup</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {devices.map((d) => (
      <TableRow key={d.name}>
        <TableCell className="font-medium">{d.name}</TableCell>
        <TableCell><Badge variant={statusVariant[d.status]}>{d.status}</Badge></TableCell>
        <TableCell>{d.last}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
      nativeCode={`<FlatList
  data={devices}
  keyExtractor={(d) => d.id}
  ItemSeparatorComponent={Divider}
  renderItem={({ item }) => (
    <ListRow
      leading={<DeviceIcon type={item.type} />}
      title={item.name}
      subtitle={\`Last backup \${item.last}\`}
      trailing={<Badge variant={statusVariant[item.status]}>{item.status}</Badge>}
      onPress={() => openDevice(item.id)}
    />
  )}
/>`}
    >
      <div className="w-full rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox
                  aria-label="Select all"
                  checked={selected.length === devices.length ? true : selected.length ? "indeterminate" : false}
                  onCheckedChange={(v) => setSelected(v ? devices.map((d) => d.name) : [])}
                />
              </TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last backup</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="w-10">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((d) => (
              <TableRow key={d.name} data-state={selected.includes(d.name) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${d.name}`}
                    checked={selected.includes(d.name)}
                    onCheckedChange={(v) => setSelected(v ? [...selected, d.name] : selected.filter((s) => s !== d.name))}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <d.icon className="size-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium whitespace-nowrap">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.os}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[d.status as keyof typeof statusVariant]}>{d.status}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">{d.last}</TableCell>
                <TableCell>
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[11px]">{d.user}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${d.name}`}>
                    <MoreHorizontalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Preview>
  )
}

function AvatarExamples() {
  return (
    <Preview
      title="Sizes and stack"
      code={`<Avatar className="size-8"><AvatarFallback>JF</AvatarFallback></Avatar>
<Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
<Avatar className="size-14"><AvatarFallback>MR</AvatarFallback></Avatar>

<div className="flex -space-x-2">
  {users.map((u) => (
    <Avatar key={u.id} className="ring-2 ring-background">…</Avatar>
  ))}
</div>`}
      nativeCode={`<Avatar size="md" name="Jody Ferry" source={{ uri: photoUrl }} />
<AvatarGroup max={3} users={team} />`}
    >
      <Avatar className="size-8">
        <AvatarFallback className="text-xs">JF</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarFallback className="bg-navy-900 text-lg text-white">MR</AvatarFallback>
      </Avatar>
      <div className="flex -space-x-2">
        {["JF", "AK", "MR", "TS"].map((u, i) => (
          <Avatar key={u} className="ring-2 ring-background">
            <AvatarFallback className={["", "bg-success-subtle text-success", "bg-warning-subtle text-warning-text", "bg-secondary text-foreground"][i]}>{u}</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="ring-2 ring-background">
          <AvatarFallback className="bg-secondary text-xs text-muted-foreground">+5</AvatarFallback>
        </Avatar>
      </div>
    </Preview>
  )
}

function AccordionExamples() {
  return (
    <Preview
      title="FAQ"
      description="Accordions let people reveal sections of content one at a time. Good for FAQs and advanced settings."
      code={`<Accordion type="single" collapsible className="w-full max-w-lg">
  <AccordionItem value="q1">
    <AccordionTrigger>How is my data encrypted?</AccordionTrigger>
    <AccordionContent>Files are encrypted with AES-256…</AccordionContent>
  </AccordionItem>
  …
</Accordion>`}
      nativeCode={`<Accordion
  items={faqs.map((f) => ({ title: f.question, content: <Text>{f.answer}</Text> }))}
/>`}
    >
      <Accordion type="single" collapsible defaultValue="q1" className="w-full max-w-lg rounded-xl border bg-card px-4">
        {[
          ["How is my data encrypted?", "Files are encrypted on your device with AES-256 before upload, and stay encrypted in transit and at rest in our data centers."],
          ["Can I back up external drives?", "Yes. Plans with external drive support back up connected USB and Thunderbolt drives automatically."],
          ["What happens if I cancel?", "Your backups are kept for 30 days after cancellation so you have time to restore anything you need."],
        ].map(([q, a], i) => (
          <AccordionItem key={q} value={`q${i + 1}`}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Preview>
  )
}

function EmptyStateExamples() {
  return (
    <>
      <Preview
        title="First use"
        description="Explain what will appear here and give one clear next step."
        code={`<EmptyState
  icon={<FolderOpenIcon />}
  title="No backups yet"
  description="Choose folders to back up and we'll keep them safe automatically."
  actions={<Button>Choose folders</Button>}
/>`}
        nativeCode={`<EmptyState
  icon={<FolderOpen />}
  title="No backups yet"
  description="Choose folders to back up and we'll keep them safe automatically."
  action={{ label: "Choose folders", onPress: pickFolders }}
/>`}
      >
        <EmptyState
          icon={<FolderOpenIcon />}
          title="No backups yet"
          description="Choose folders to back up and we'll keep them safe automatically."
          actions={
            <>
              <Button>Choose folders</Button>
              <Button variant="ghost">Learn more</Button>
            </>
          }
        />
      </Preview>
      <Preview
        title="No results"
        code={`<EmptyState icon={<SearchXIcon />} title="No files match “invoice 2019”" description="Check the spelling or try a different date range." />`}
      >
        <EmptyState icon={<SearchXIcon />} title="No files match “invoice 2019”" description="Check the spelling or try a different date range." actions={<Button variant="outline">Clear search</Button>} />
      </Preview>
    </>
  )
}

export const dataDocs: ComponentDoc[] = [
  {
    slug: "card",
    name: "Card",
    category: "Data display",
    status: "stable",
    summary: "Cards contain content and actions about a single subject.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"`,
    nativeImportCode: `import { Card } from "@carbonite/native"`,
    Examples: CardExamples,
    props: [{ name: "className", type: "string", description: "Cards are composable; use sub-components for header, content, and footer." }],
    a11y: ["If the whole card is clickable, make one link or button the target and stretch it, so screen readers don't announce every element.", "Use a heading element for the card title inside lists of cards."],
    Thumb: () => (
      <div className="w-40 rounded-lg border bg-card p-3 shadow-raised">
        <div className="mb-1.5 h-2.5 w-20 rounded bg-foreground/70" />
        <div className="mb-3 h-2 w-28 rounded bg-muted-foreground/40" />
        <div className="h-1.5 w-full rounded-full bg-primary/70" />
      </div>
    ),
  },
  {
    slug: "table",
    name: "Table",
    category: "Data display",
    status: "stable",
    summary: "Tables organize data into rows and columns for scanning and comparison.",
    platforms: ["web"],
    importCode: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"`,
    Examples: TableExamples,
    props: [{ name: "data-state (row)", type: '"selected"', description: "Highlights a selected row." }],
    a11y: ["Uses semantic <table>, <th>, and <td> elements.", "Row checkboxes have labels that include the row name.", "Icon-only action buttons are labelled per row."],
    Thumb: () => (
      <div className="w-44 overflow-hidden rounded-md border text-[10px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex gap-2 border-b px-2 py-1.5 last:border-0 ${i === 0 ? "bg-muted font-semibold" : ""}`}>
            <span className="h-1.5 w-12 rounded bg-foreground/50" />
            <span className="h-1.5 w-8 rounded bg-success/70" />
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data display",
    status: "stable",
    summary: "Avatars represent a person or team with a photo or initials.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`,
    nativeImportCode: `import { Avatar, AvatarGroup } from "@carbonite/native"`,
    Examples: AvatarExamples,
    props: [{ name: "className", type: "string", description: "Set size with size-* utilities. Default is 40px." }],
    a11y: ["Images need alt text with the person's name; decorative avatars next to a visible name use alt=\"\"."],
    Thumb: () => (
      <div className="flex -space-x-2">
        {["JF", "AK", "MR"].map((u) => (
          <Avatar key={u} className="size-8 ring-2 ring-background">
            <AvatarFallback className="text-[10px]">{u}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    ),
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Data display",
    status: "stable",
    summary: "Accordions show and hide sections of related content.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"`,
    nativeImportCode: `import { Accordion } from "@carbonite/native"`,
    Examples: AccordionExamples,
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Whether one or many items can be open." },
      { name: "collapsible", type: "boolean", default: "false", description: "Allow closing the open item when type is single." },
    ],
    a11y: ["Triggers are buttons with aria-expanded and aria-controls.", "Arrow keys move between triggers."],
    Thumb: () => (
      <div className="w-44 rounded-md border text-[11px]">
        <div className="flex justify-between border-b px-2 py-1.5 font-medium">
          Encryption <span>⌃</span>
        </div>
        <div className="flex justify-between px-2 py-1.5 text-muted-foreground">
          Billing <span>⌄</span>
        </div>
      </div>
    ),
  },
  {
    slug: "empty-state",
    name: "Empty state",
    category: "Data display",
    status: "new",
    summary: "Empty states explain why there's no content and what to do next.",
    platforms: ["web", "ios", "android"],
    importCode: `import { EmptyState } from "@/components/ui/empty-state"`,
    nativeImportCode: `import { EmptyState } from "@carbonite/native"`,
    Examples: EmptyStateExamples,
    props: [
      { name: "icon", type: "ReactNode", description: "Illustrative icon." },
      { name: "title", type: "string", description: "What's missing, stated plainly." },
      { name: "description", type: "string", description: "Why, and what will appear here." },
      { name: "actions", type: "ReactNode", description: "One primary action, and optionally a secondary." },
    ],
    a11y: ["The title is a heading so screen reader users can find it.", "Icons are decorative and hidden from assistive tech."],
    Thumb: () => (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
          <FolderOpenIcon className="size-4" />
        </div>
        <div className="h-2 w-20 rounded bg-foreground/60" />
      </div>
    ),
  },
]
