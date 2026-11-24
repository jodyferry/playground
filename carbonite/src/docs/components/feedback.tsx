import * as React from "react"
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, ShieldAlertIcon, XCircleIcon } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Preview } from "@/components/site/preview"
import { DoDont, DoDontGrid, H2, Lead } from "@/components/site/doc-parts"
import type { ComponentDoc } from "../types"

function AlertExamples() {
  return (
    <>
      <Preview
        title="Variants"
        description="Section-level messages that stay on the page until the issue is resolved."
        className="flex-col items-stretch"
        code={`<Alert variant="info">
  <InfoIcon />
  <AlertTitle>New backup location available</AlertTitle>
  <AlertDescription>You can now store backups in the EU data center.</AlertDescription>
</Alert>

<Alert variant="success">…</Alert>
<Alert variant="warning">…</Alert>
<Alert variant="danger">…</Alert>`}
        nativeCode={`<Banner
  variant="warning"
  title="Backup paused"
  message="Connect to Wi-Fi to resume. Cellular backup is off."
  action={{ label: "Settings", onPress: openSettings }}
/>`}
      >
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>New backup location available</AlertTitle>
          <AlertDescription>You can now store backups in the EU data center.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <CheckCircle2Icon />
          <AlertTitle>Backup complete</AlertTitle>
          <AlertDescription>12,480 files backed up at 2:14 AM.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTriangleIcon />
          <AlertTitle>Backup paused</AlertTitle>
          <AlertDescription>Connect to Wi-Fi to resume. Cellular backup is turned off.</AlertDescription>
        </Alert>
        <Alert variant="danger">
          <XCircleIcon />
          <AlertTitle>3 files couldn't be backed up</AlertTitle>
          <AlertDescription>
            <p>These files were in use. We'll try again in 15 minutes.</p>
            <div>
              <Button size="sm" variant="outline">
                View files
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </Preview>
    </>
  )
}

function ToastExamples() {
  return (
    <Preview
      title="Default"
      description="Toasts confirm an action or report background events. They disappear on their own, so never put critical information only in a toast. Click to try."
      code={`import { toast } from "sonner"

toast.success("Backup complete", { description: "12,480 files backed up." })

toast("Device removed", {
  action: { label: "Undo", onClick: () => restoreDevice() },
})

toast.error("Couldn't connect", { description: "Check your network and try again." })`}
      nativeCode={`import { useToast } from "@carbonite/native"

const toast = useToast()
toast.show({ variant: "success", title: "Backup complete" })
toast.show({ title: "Device removed", action: { label: "Undo", onPress: undo } })`}
    >
      <Button variant="outline" onClick={() => toast.success("Backup complete", { description: "12,480 files backed up." })}>
        Success toast
      </Button>
      <Button variant="outline" onClick={() => toast("Device removed", { description: "Office laptop", action: { label: "Undo", onClick: () => toast("Device restored") } })}>
        With action
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't connect", { description: "Check your network and try again." })}>
        Error toast
      </Button>
    </Preview>
  )
}

function BadgeExamples() {
  return (
    <>
      <Preview
        title="Status"
        description="Badges label status, counts, or categories. Keep text to one or two words."
        code={`<Badge variant="success">Protected</Badge>
<Badge variant="warning">At risk</Badge>
<Badge variant="danger">Threat found</Badge>
<Badge variant="info">Scanning</Badge>
<Badge variant="secondary">Offline</Badge>
<Badge variant="accent">Pro</Badge>`}
        nativeCode={`<Badge variant="success">Protected</Badge>
<Badge variant="warning">At risk</Badge>
<Badge variant="danger">Threat found</Badge>`}
      >
        <Badge variant="success">Protected</Badge>
        <Badge variant="warning">At risk</Badge>
        <Badge variant="danger">Threat found</Badge>
        <Badge variant="info">Scanning</Badge>
        <Badge variant="secondary">Offline</Badge>
        <Badge variant="accent">Pro</Badge>
        <Badge variant="outline">Windows</Badge>
        <Badge>3 new</Badge>
      </Preview>
      <Preview
        title="With icon"
        code={`<Badge variant="danger"><ShieldAlertIcon /> 2 threats</Badge>`}
        nativeCode={`<Badge variant="danger" icon={<ShieldAlert />}>2 threats</Badge>`}
      >
        <Badge variant="success">
          <CheckCircle2Icon /> Up to date
        </Badge>
        <Badge variant="danger">
          <ShieldAlertIcon /> 2 threats
        </Badge>
      </Preview>
    </>
  )
}

function BadgeUsage() {
  return (
    <>
      <H2>Color carries meaning</H2>
      <Lead>Status colors map to protection states across every Carbonite product. Green means protected, amber means action is recommended, red means action is required.</Lead>
      <DoDontGrid>
        <DoDont kind="do" example={<Badge variant="warning">Update needed</Badge>}>
          Use the status color that matches the severity.
        </DoDont>
        <DoDont kind="dont" example={<Badge variant="danger">Pro</Badge>}>
          Don't use status colors for decoration or plan names.
        </DoDont>
      </DoDontGrid>
    </>
  )
}

function ProgressExamples() {
  const [value, setValue] = React.useState(36)
  React.useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 4)), 600)
    return () => clearInterval(t)
  }, [])
  return (
    <>
      <Preview
        title="Determinate"
        description="Use when you know how long a task will take, like an upload or a full scan."
        code={`<div className="flex justify-between text-sm">
  <span className="font-medium">Backing up Photos</span>
  <span className="text-muted-foreground">{value}%</span>
</div>
<Progress value={value} aria-label="Backup progress" />`}
        nativeCode={`<ProgressBar
  label="Backing up Photos"
  progress={value / 100}
  showValue
/>`}
      >
        <div className="grid w-full max-w-md gap-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Backing up Photos</span>
            <span className="font-mono text-muted-foreground">{value}%</span>
          </div>
          <Progress value={value} aria-label="Backup progress" />
          <span className="text-xs text-muted-foreground">{Math.round((value / 100) * 4820)} of 4,820 files</span>
        </div>
      </Preview>
      <Preview
        title="Status colors"
        code={`<Progress value={92} indicatorClassName="bg-success" />
<Progress value={78} indicatorClassName="bg-warning" />
<Progress value={97} indicatorClassName="bg-destructive" />`}
        nativeCode={`<ProgressBar progress={0.92} variant="success" />
<ProgressBar progress={0.97} variant="danger" />`}
      >
        <div className="grid w-full max-w-md gap-4 text-sm">
          {[
            ["Cloud storage", 42, "bg-success", "210 GB of 500 GB"],
            ["Cloud storage", 82, "bg-warning", "410 GB of 500 GB"],
            ["Cloud storage", 97, "bg-destructive", "485 GB of 500 GB"],
          ].map(([l, v, c, d], i) => (
            <div key={i} className="grid gap-1.5">
              <div className="flex justify-between">
                <span className="font-medium">{l}</span>
                <span className="text-muted-foreground">{d}</span>
              </div>
              <Progress value={v as number} indicatorClassName={c as string} aria-label={l as string} />
            </div>
          ))}
        </div>
      </Preview>
    </>
  )
}

function SpinnerExamples() {
  return (
    <Preview
      title="Sizes"
      description="Use a spinner for short, indeterminate waits under about 5 seconds. For longer tasks, show progress."
      code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`}
      nativeCode={`<Spinner size="small" />
<Spinner size="large" />`}
    >
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner size="sm" /> Checking for threats…
      </span>
    </Preview>
  )
}

function SkeletonExamples() {
  return (
    <Preview
      title="Loading a card"
      description="Skeletons mirror the layout of the content that's loading, which reduces perceived wait time and layout shift."
      code={`<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>`}
      nativeCode={`<Skeleton.Group>
  <Skeleton circle size={48} />
  <Skeleton width={192} height={16} />
  <Skeleton width={128} height={16} />
</Skeleton.Group>`}
    >
      <div className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-5">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    </Preview>
  )
}

export const feedbackDocs: ComponentDoc[] = [
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    status: "stable",
    summary: "Alerts show important, persistent messages within a page or section.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`,
    nativeImportCode: `import { Banner } from "@carbonite/native"`,
    Examples: AlertExamples,
    props: [{ name: "variant", type: '"info" | "success" | "warning" | "danger" | "neutral"', default: '"info"', description: "Severity and color of the message." }],
    a11y: ["Rendered with role=\"alert\", so new alerts are announced. Use role=\"status\" for non-urgent updates.", "Each variant pairs color with an icon and a title, never color alone."],
    Thumb: () => (
      <div className="flex w-48 items-center gap-2 rounded-md border border-warning/50 bg-warning-subtle p-2 text-xs">
        <AlertTriangleIcon className="size-4 text-warning-text" /> Backup paused
      </div>
    ),
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    status: "stable",
    summary: "Toasts give brief, temporary feedback about an action or background event.",
    platforms: ["web", "ios", "android"],
    importCode: `import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner" // render once at the app root`,
    nativeImportCode: `import { useToast } from "@carbonite/native"`,
    Examples: ToastExamples,
    props: [
      { name: "description", type: "ReactNode", description: "Secondary line of text." },
      { name: "action", type: "{ label, onClick }", description: "Single optional action, like Undo." },
      { name: "duration", type: "number", default: "4000", description: "Milliseconds before dismissing. Toasts with actions should stay at least 6 seconds." },
    ],
    a11y: ["Announced through an aria-live region without moving focus.", "Pause on hover and focus so people have time to read and act."],
    Thumb: () => (
      <div className="flex w-48 items-center gap-2 rounded-lg border bg-popover p-2 text-xs shadow-overlay">
        <CheckCircle2Icon className="size-4 text-success" /> Backup complete
      </div>
    ),
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Feedback",
    status: "stable",
    summary: "Badges show status, counts, or short labels at a glance.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Badge } from "@/components/ui/badge"`,
    nativeImportCode: `import { Badge } from "@carbonite/native"`,
    Examples: BadgeExamples,
    Usage: BadgeUsage,
    props: [{ name: "variant", type: '"default" | "secondary" | "outline" | "success" | "warning" | "danger" | "info" | "accent"', default: '"default"', description: "Color and meaning." }],
    a11y: ["Badge text must make sense on its own when read by a screen reader.", "All status variants meet 4.5:1 text contrast in light and dark themes."],
    Thumb: () => (
      <div className="flex gap-1.5">
        <Badge variant="success">Protected</Badge>
        <Badge variant="danger">Threat</Badge>
      </div>
    ),
  },
  {
    slug: "progress",
    name: "Progress bar",
    category: "Feedback",
    status: "stable",
    summary: "Progress bars show how far along a task is, like a backup or a scan.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Progress } from "@/components/ui/progress"`,
    nativeImportCode: `import { ProgressBar } from "@carbonite/native"`,
    Examples: ProgressExamples,
    props: [
      { name: "value", type: "number", description: "Progress from 0 to 100." },
      { name: "indicatorClassName", type: "string", description: "Override the indicator color, for example bg-success." },
    ],
    a11y: ["Exposes role=\"progressbar\" with aria-valuenow.", "Give every progress bar an accessible name with aria-label or a visible label."],
    Thumb: () => <Progress value={64} className="w-40" aria-label="example" />,
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Feedback",
    status: "stable",
    summary: "Spinners show that something is loading when progress can't be measured.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Spinner } from "@/components/ui/spinner"`,
    nativeImportCode: `import { Spinner } from "@carbonite/native"`,
    Examples: SpinnerExamples,
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Diameter of the spinner." },
      { name: "label", type: "string", default: '"Loading"', description: "Screen reader text." },
    ],
    a11y: ["Renders role=\"status\" with visually hidden label text.", "Respects prefers-reduced-motion by slowing the animation."],
    Thumb: () => <Spinner />,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    status: "stable",
    summary: "Skeletons are placeholders that show the shape of content while it loads.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Skeleton } from "@/components/ui/skeleton"`,
    nativeImportCode: `import { Skeleton } from "@carbonite/native"`,
    Examples: SkeletonExamples,
    props: [{ name: "className", type: "string", description: "Set width, height, and radius to match the content." }],
    a11y: ["Set aria-busy=\"true\" on the loading region and announce when content is ready."],
    Thumb: () => (
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
    ),
  },
]
