import * as React from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import {
  AlertTriangleIcon, BellIcon, CheckCircle2Icon, CloudUploadIcon, FolderOpenIcon, HardDriveIcon, HomeIcon, ImageIcon, InfoIcon, LaptopIcon,
  LockIcon, MonitorIcon, SettingsIcon, ShieldAlertIcon, ShieldCheckIcon, ShieldIcon, SmartphoneIcon, UsersIcon, WifiIcon, XCircleIcon, FileTextIcon, MusicIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { EmptyState } from "@/components/ui/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FigmaLink } from "@/components/site/figma-link"
import { CodeTabs } from "@/components/site/preview"
import { DoDont, DoDontGrid, H2, Lead, PageHeader, PhoneFrame } from "@/components/site/doc-parts"
import { ListGroup, ListRow, NativeToggle, NavBar, SegmentedControl, StatusBar, StatusHero, TabBar } from "@/components/native"
import { cn } from "@/lib/utils"

export function PatternsOverviewPage() {
  const items = [
    ["Forms", "/patterns/forms", "Collect information with clear labels, validation, and recovery."],
    ["Protection status", "/patterns/protection-status", "Show people where they stand in one glance."],
    ["Empty states", "/patterns/empty-states", "Turn blank screens into a helpful next step."],
    ["Messaging and errors", "/patterns/messaging", "Pick the right message type for every situation."],
    ["Mobile app shell", "/patterns/mobile-shell", "The structure of every Carbonite mobile app."],
  ]
  return (
    <div className="max-w-4xl">
      <PageHeader title="Patterns" description="Patterns combine components into reusable solutions for common product problems." actions={<FigmaLink label="Open pattern library in Figma" />} />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(([t, h, d]) => (
          <Link key={h} to={h} className="group rounded-xl border bg-card p-5 shadow-raised transition hover:border-primary/40 hover:shadow-overlay">
            <div className="font-semibold group-hover:text-primary">{t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function FormsPatternPage() {
  const [values, setValues] = React.useState({ name: "", email: "", plan: "personal", terms: false })
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = React.useState(false)
  const errors = {
    name: !values.name.trim() ? "Enter a device name" : "",
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email) ? "Enter an email address like name@example.com" : "",
    terms: !values.terms ? "Accept the terms to continue" : "",
  }
  const show = (k: keyof typeof errors) => (touched[k] || submitted) && errors[k]
  const errorCount = Object.values(errors).filter(Boolean).length

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!errorCount) toast.success("Device added", { description: `${values.name} will start backing up shortly.` })
  }

  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Patterns" title="Forms" description="Good forms ask only for what's needed, explain why, and help people recover from mistakes." actions={<FigmaLink />} />
      <H2>Example: add a device</H2>
      <Lead>Try submitting the form empty to see validation. Errors are summarized at the top and shown next to each field.</Lead>
      <div className="rounded-xl border bg-surface-sunken p-4 sm:p-8">
        <form onSubmit={onSubmit} noValidate className="mx-auto grid max-w-md gap-5 rounded-xl border bg-card p-6 shadow-raised">
          <div>
            <h3 className="text-lg font-semibold">Add a device</h3>
            <p className="text-sm text-muted-foreground">We'll send setup instructions to this email.</p>
          </div>
          {submitted && errorCount > 0 && (
            <Alert variant="danger">
              <XCircleIcon />
              <AlertTitle>Fix {errorCount} {errorCount === 1 ? "error" : "errors"} to continue</AlertTitle>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="f-name">Device name</Label>
            <Input id="f-name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} onBlur={() => setTouched({ ...touched, name: true })} aria-invalid={!!show("name")} placeholder="e.g. Office laptop" />
            {show("name") && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="f-email">Email address</Label>
            <Input id="f-email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} onBlur={() => setTouched({ ...touched, email: true })} aria-invalid={!!show("email")} />
            {show("email") ? <p className="text-sm text-destructive">{errors.email}</p> : <p className="text-sm text-muted-foreground">Use the email of the person who uses this device.</p>}
          </div>
          <fieldset className="grid gap-3">
            <legend className="mb-2 text-sm font-medium">Device type</legend>
            <RadioGroup value={values.plan} onValueChange={(plan) => setValues({ ...values, plan })} className="grid-cols-3 gap-2">
              {[
                ["personal", "Computer", LaptopIcon],
                ["mobile", "Phone", SmartphoneIcon],
                ["server", "Server", MonitorIcon],
              ].map(([v, l, I]) => {
                const Icon = I as typeof LaptopIcon
                return (
                  <Label key={v as string} htmlFor={`p-${v}`} className={cn("flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 text-center transition", values.plan === v && "border-primary bg-accent text-accent-foreground")}>
                    <RadioGroupItem value={v as string} id={`p-${v}`} className="sr-only" />
                    <Icon className="size-5" />
                    {l as string}
                  </Label>
                )
              })}
            </RadioGroup>
          </fieldset>
          <div className="grid gap-2">
            <div className="flex items-start gap-2">
              <Checkbox id="f-terms" checked={values.terms} onCheckedChange={(v) => setValues({ ...values, terms: !!v })} aria-invalid={!!show("terms")} className="mt-0.5" />
              <Label htmlFor="f-terms" className="leading-snug font-normal">
                I agree to the subscription terms
              </Label>
            </div>
            {show("terms") && <p className="text-sm text-destructive">{errors.terms}</p>}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => (setValues({ name: "", email: "", plan: "personal", terms: false }), setTouched({}), setSubmitted(false))}>
              Cancel
            </Button>
            <Button type="submit">Add device</Button>
          </div>
        </form>
      </div>
      <H2>Guidelines</H2>
      <DoDontGrid>
        <DoDont kind="do">Use a single column. People complete it faster and on any screen size.</DoDont>
        <DoDont kind="dont">Don't disable the submit button until the form is valid; people can't tell what's wrong.</DoDont>
        <DoDont kind="do">Validate on blur, then re-check as people type to clear errors quickly.</DoDont>
        <DoDont kind="dont">Don't clear the form when there's an error.</DoDont>
      </DoDontGrid>
    </div>
  )
}

const deviceRows = [
  { name: "MacBook Pro", icon: LaptopIcon, user: "Jody F.", status: "Protected", backup: "2 hours ago", pct: 64 },
  { name: "Office desktop", icon: MonitorIcon, user: "Alex K.", status: "At risk", backup: "6 days ago", pct: 88 },
  { name: "Reception PC", icon: MonitorIcon, user: "Maria R.", status: "Threat found", backup: "1 hour ago", pct: 41 },
  { name: "iPhone 17", icon: SmartphoneIcon, user: "Jody F.", status: "Protected", backup: "14 min ago", pct: 22 },
]
const sv = { Protected: "success", "At risk": "warning", "Threat found": "danger" } as const

export function ProtectionStatusPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader eyebrow="Patterns" title="Protection status" description="Status is the most important information in any Carbonite product. Lead with it, make it unmistakable, and always offer a next step." actions={<FigmaLink />} />
      <H2>Three states</H2>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Protected", "Everything is working. No action needed.", ShieldCheckIcon, "border-success/30 bg-success-subtle text-success"],
          ["At risk", "Something needs attention soon, like an outdated agent or a paused backup.", AlertTriangleIcon, "border-warning/50 bg-warning-subtle text-warning-text"],
          ["Threat found", "Immediate action is needed, or we've already acted and need to tell you.", ShieldAlertIcon, "border-destructive/30 bg-danger-subtle text-destructive"],
        ].map(([t, d, I, c]) => {
          const Icon = I as typeof ShieldCheckIcon
          return (
            <div key={t as string} className={cn("rounded-xl border p-5", c as string)}>
              <Icon className="mb-2 size-6" />
              <div className="font-semibold">{t as string}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
            </div>
          )
        })}
      </div>
      <H2>Web dashboard</H2>
      <Lead>On web, a summary banner leads, followed by stat cards and the device list. The worst status anywhere decides the banner.</Lead>
      <div className="overflow-hidden rounded-xl border bg-surface-sunken">
        <div className="flex items-center gap-3 border-b bg-card px-4 py-3">
          <ShieldIcon className="size-5 text-primary" />
          <span className="font-semibold">Carbonite Console</span>
          <span className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <BellIcon className="size-4" /> Acme Dental
          </span>
        </div>
        <div className="grid gap-4 p-4 sm:p-6">
          <Alert variant="danger">
            <ShieldAlertIcon />
            <AlertTitle>1 device needs attention</AlertTitle>
            <AlertDescription>
              <p>We quarantined a threat on Reception PC. Review it to confirm no files were affected.</p>
              <div>
                <Button size="sm" variant="destructive">
                  Review threat
                </Button>
              </div>
            </AlertDescription>
          </Alert>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Devices", "4", UsersIcon, "3 protected"],
              ["Threats blocked", "1,284", ShieldCheckIcon, "Last 30 days"],
              ["Backed up", "1.2 TB", CloudUploadIcon, "of 2 TB"],
              ["Last scan", "9:12 AM", CheckCircle2Icon, "Today"],
            ].map(([l, v, I, d]) => {
              const Icon = I as typeof UsersIcon
              return (
                <Card key={l as string} className="gap-2 py-4">
                  <CardHeader className="px-4">
                    <CardDescription className="flex items-center gap-1.5">
                      <Icon className="size-4" />
                      {l as string}
                    </CardDescription>
                    <CardTitle className="text-2xl font-bold">{v as string}</CardTitle>
                    <span className="text-xs text-muted-foreground">{d as string}</span>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
          <Card className="gap-0 py-0">
            <CardHeader className="border-b px-4 py-4">
              <CardTitle>Devices</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-4">Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last backup</TableHead>
                    <TableHead className="hidden md:table-cell">Storage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deviceRows.map((d) => (
                    <TableRow key={d.name}>
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <d.icon className="size-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium whitespace-nowrap">{d.name}</div>
                            <div className="text-xs text-muted-foreground">{d.user}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={sv[d.status as keyof typeof sv]}>{d.status}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{d.backup}</TableCell>
                      <TableCell className="hidden w-48 md:table-cell">
                        <Progress value={d.pct} aria-label={`${d.name} storage`} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <H2>Native</H2>
      <Lead>
        On mobile, the <Link to="/components/status-hero" className="font-medium text-primary hover:underline">status hero</Link> fills the top of the home screen, with one primary action beneath it.
      </Lead>
    </div>
  )
}

export function EmptyStatesPatternPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Patterns" title="Empty states" description="An empty screen is a chance to explain what belongs there and help people get started." actions={<FigmaLink />} />
      <H2>Types</H2>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [FolderOpenIcon, "First use", "No backups yet", "Choose folders and we'll protect them automatically.", "Choose folders"],
          [CheckCircle2Icon, "All clear", "No threats found", "Your devices are protected. We'll let you know if anything changes.", ""],
          [WifiIcon, "Error", "You're offline", "Connect to the internet to see your latest backups.", "Try again"],
        ].map(([I, k, t, d, a]) => {
          const Icon = I as typeof FolderOpenIcon
          return (
            <div key={k as string} className="flex flex-col items-center rounded-xl border p-6">
              <Badge variant="secondary" className="mb-6">
                {k as string}
              </Badge>
              <EmptyState icon={<Icon />} title={t as string} description={d as string} actions={a ? <Button size="sm">{a as string}</Button> : undefined} />
            </div>
          )
        })}
      </div>
      <H2>Writing empty states</H2>
      <DoDontGrid>
        <DoDont kind="do">Say what's missing and how to add it: "No backups yet. Choose folders to start."</DoDont>
        <DoDont kind="dont">Don't just say "No data" or leave the screen blank.</DoDont>
      </DoDontGrid>
    </div>
  )
}

export function MessagingPatternPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Patterns" title="Messaging and errors" description="Choose a message type based on urgency and whether people need to act." actions={<FigmaLink />} />
      <H2>Choosing a message type</H2>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Type</TableHead>
              <TableHead>Use for</TableHead>
              <TableHead>Persistence</TableHead>
              <TableHead>Blocks the user</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Toast", "Confirming an action, background events", "Auto-dismisses", "No", "/components/toast"],
              ["Inline field error", "A specific input is invalid", "Until fixed", "No", "/components/text-field"],
              ["Alert", "Page or section-level status", "Until resolved", "No", "/components/alert"],
              ["Dialog", "Destructive or irreversible actions", "Until answered", "Yes", "/components/dialog"],
              ["Push notification", "Threats and failures when the app is closed", "System", "No", "/patterns/mobile-shell"],
            ].map(([t, u, p, b, h]) => (
              <TableRow key={t}>
                <TableCell className="font-semibold whitespace-nowrap">
                  <Link to={h} className="text-primary hover:underline">
                    {t}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{u}</TableCell>
                <TableCell className="text-muted-foreground">{p}</TableCell>
                <TableCell className="text-muted-foreground">{b}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <H2>Anatomy of an error message</H2>
      <Lead>Every error answers three questions: what happened, why, and what to do next.</Lead>
      <Alert variant="danger" className="max-w-xl">
        <XCircleIcon />
        <AlertTitle>Restore didn't finish</AlertTitle>
        <AlertDescription>
          <p>Your device ran out of space with 1,204 files left to restore. Free up 4.2 GB, then resume.</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Resume restore
            </Button>
            <Button size="sm" variant="ghost">
              Get help
            </Button>
          </div>
        </AlertDescription>
      </Alert>
      <H2>Info and warnings</H2>
      <div className="grid gap-3">
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>Scheduled maintenance on Dec 2</AlertTitle>
          <AlertDescription>Backups will pause from 1:00 to 3:00 AM ET and resume automatically.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTriangleIcon />
          <AlertTitle>Your subscription ends in 7 days</AlertTitle>
          <AlertDescription>Renew to keep your backups. After it ends, we keep your files for 30 days.</AlertDescription>
        </Alert>
      </div>
      <H2>Code</H2>
      <CodeTabs
        code={`<Alert variant="danger">
  <XCircleIcon />
  <AlertTitle>Restore didn't finish</AlertTitle>
  <AlertDescription>
    Your device ran out of space with 1,204 files left to restore. Free up 4.2 GB, then resume.
  </AlertDescription>
</Alert>`}
        nativeCode={`<Banner
  variant="danger"
  title="Restore didn't finish"
  message="Your device ran out of space with 1,204 files left. Free up 4.2 GB, then resume."
  action={{ label: "Resume restore", onPress: resume }}
/>`}
      />
    </div>
  )
}

const appTabs = [
  { label: "Home", icon: HomeIcon },
  { label: "Protection", icon: ShieldIcon },
  { label: "Backup", icon: HardDriveIcon },
  { label: "Settings", icon: SettingsIcon },
]

function MobileApp() {
  const [tab, setTab] = React.useState(0)
  const [progress, setProgress] = React.useState<number | undefined>()
  const [rt, setRt] = React.useState(true)
  const [wifi, setWifi] = React.useState(false)
  const [range, setRange] = React.useState(1)
  const scan = () => {
    let p = 0
    setProgress(0)
    const t = setInterval(() => {
      p += 5
      if (p >= 100) {
        clearInterval(t)
        setProgress(undefined)
      } else setProgress(p)
    }, 90)
  }
  const state = rt ? "protected" : "at-risk"
  return (
    <PhoneFrame label="Interactive prototype: tap the tabs, Scan now, and the switches">
      <div className="h-full overflow-y-auto bg-surface-sunken pb-24">
        {tab === 0 && (
          <>
            <div className="bg-navy-900">
              <StatusBar dark />
              <NavBar title="Carbonite" dark trailing={<BellIcon className="size-5 text-white" />} />
            </div>
            <StatusHero state={state} progress={progress}>
              {state === "protected" ? <ShieldCheckIcon className="size-14 text-[#1BA85E]" /> : <AlertTriangleIcon className="size-14 text-[#FFC233]" />}
            </StatusHero>
            <div className="-mt-4 grid gap-4 px-4">
              <Button size="lg" className="w-full rounded-xl" onClick={scan} disabled={progress !== undefined}>
                {progress !== undefined ? "Scanning…" : "Scan now"}
              </Button>
              {!rt && (
                <button onClick={() => setRt(true)} className="flex items-center gap-3 rounded-xl border border-warning/50 bg-warning-subtle p-3 text-left text-[13px]">
                  <AlertTriangleIcon className="size-5 shrink-0 text-warning-text" />
                  <span>
                    <span className="block font-semibold">Real-time protection is off</span>
                    <span className="text-muted-foreground">Tap to turn it on</span>
                  </span>
                </button>
              )}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Threats blocked", "86"],
                  ["Last backup", "2h ago"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-card p-3 shadow-raised">
                    <div className="text-[11px] text-muted-foreground">{l}</div>
                    <div className="text-lg font-bold">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {tab === 1 && (
          <>
            <StatusBar />
            <NavBar title="Protection" large />
            <div className="grid gap-4 px-4">
              <SegmentedControl values={["Day", "Week", "Month"]} index={range} onChange={setRange} />
              <div className="rounded-xl bg-card p-4 shadow-raised">
                <div className="text-[13px] text-muted-foreground">Threats blocked</div>
                <div className="text-3xl font-bold">{[14, 86, 312][range]}</div>
                <div className="mt-3 flex h-20 items-end gap-1.5">
                  {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${(h * (range + 1)) / 3 + 10}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <ListGroup header="Recent">
                <ListRow icon={ShieldAlertIcon} iconBg="bg-destructive" title="Phishing site blocked" subtitle="Today, 8:41 AM" chevron />
                <ListRow icon={ShieldCheckIcon} iconBg="bg-success" title="Scan complete" subtitle="Today, 9:12 AM" chevron />
              </ListGroup>
            </div>
          </>
        )}
        {tab === 2 && (
          <>
            <StatusBar />
            <NavBar title="Backup" large />
            <div className="mx-4 mb-5 rounded-xl bg-card p-4 shadow-raised">
              <div className="mb-2 flex justify-between text-[13px]">
                <span className="font-semibold">Cloud storage</span>
                <span className="text-muted-foreground">42 of 100 GB</span>
              </div>
              <Progress value={42} aria-label="Cloud storage" />
            </div>
            <ListGroup header="Backed up">
              <ListRow icon={ImageIcon} iconBg="bg-[#E86F00]" title="Photos" subtitle="8,214 items" trailing={<CheckCircle2Icon className="size-5 text-success" />} />
              <ListRow icon={UsersIcon} title="Contacts" subtitle="412 contacts" trailing={<CheckCircle2Icon className="size-5 text-success" />} />
              <ListRow icon={FileTextIcon} iconBg="bg-[#52607A]" title="Documents" subtitle="96 files" trailing={<CheckCircle2Icon className="size-5 text-success" />} />
              <ListRow icon={MusicIcon} iconBg="bg-[#B42318]" title="Music" subtitle="Not backed up" chevron />
            </ListGroup>
          </>
        )}
        {tab === 3 && (
          <>
            <StatusBar />
            <NavBar title="Settings" large />
            <div className="grid gap-5">
              <ListGroup header="Protection">
                <ListRow icon={ShieldCheckIcon} iconBg="bg-success" title="Real-time protection" trailing={<NativeToggle on={rt} onChange={setRt} label="Real-time protection" />} />
                <ListRow icon={WifiIcon} title="Secure Wi-Fi" trailing={<NativeToggle on={wifi} onChange={setWifi} label="Secure Wi-Fi" />} />
                <ListRow icon={LockIcon} iconBg="bg-navy-700" title="App lock" subtitle="Face ID" chevron />
              </ListGroup>
              <ListGroup header="Account" footer="Carbonite Mobile 1.0 (concept)">
                <ListRow icon={BellIcon} iconBg="bg-[#E86F00]" title="Notifications" chevron />
                <ListRow icon={UsersIcon} iconBg="bg-[#52607A]" title="Manage plan" subtitle="Premium" chevron />
              </ListGroup>
            </div>
          </>
        )}
      </div>
      <TabBar items={appTabs.map((t, i) => (i === 1 && !rt ? { ...t, badge: 1 } : t))} active={tab} onChange={setTab} />
    </PhoneFrame>
  )
}

export function MobileShellPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader eyebrow="Patterns" title="Mobile app shell" description="Every Carbonite mobile app shares the same structure: a status-first home, four tabs, and grouped settings." actions={<FigmaLink />} />
      <div className="grid items-start gap-8 lg:grid-cols-[auto_1fr]">
        <div className="flex justify-center rounded-xl border bg-surface-sunken p-6">
          <MobileApp />
        </div>
        <div>
          <H2 id="structure">Structure</H2>
          <ul className="prose-doc">
            <li>
              <strong>Home</strong> leads with the status hero and a single primary action.
            </li>
            <li>
              <strong>Protection</strong> shows activity over time and recent events.
            </li>
            <li>
              <strong>Backup</strong> shows storage and what's included.
            </li>
            <li>
              <strong>Settings</strong> uses grouped list rows with switches that apply instantly.
            </li>
          </ul>
          <H2 id="behavior">Behavior</H2>
          <ul className="prose-doc">
            <li>Turning off real-time protection immediately changes the home status to "at risk" and badges the Protection tab. Try it in Settings.</li>
            <li>Scans run in the foreground with progress in the hero, and continue in the background with a notification.</li>
            <li>Large titles collapse into the navigation bar on scroll (iOS).</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
