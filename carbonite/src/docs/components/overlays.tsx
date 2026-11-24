import { InfoIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Preview } from "@/components/site/preview"
import { DoDont, DoDontGrid, H2, Lead } from "@/components/site/doc-parts"
import type { ComponentDoc } from "../types"

function DialogExamples() {
  return (
    <>
      <Preview
        title="Confirmation"
        description="Use a dialog to confirm destructive or irreversible actions. The title asks the question and the button repeats the action."
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive"><Trash2Icon /> Remove device</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Remove Office laptop?</DialogTitle>
      <DialogDescription>
        Backups from this device will be deleted after 30 days. You can add it again any time.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button variant="destructive">Remove device</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        nativeCode={`// Native confirmations use the platform alert
Alert.alert(
  "Remove Office laptop?",
  "Backups from this device will be deleted after 30 days.",
  [
    { text: "Cancel", style: "cancel" },
    { text: "Remove device", style: "destructive", onPress: removeDevice },
  ]
)`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2Icon /> Remove device
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Office laptop?</DialogTitle>
              <DialogDescription>Backups from this device will be deleted after 30 days. You can add it again any time.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">Remove device</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Preview>
      <Preview
        title="Form dialog"
        code={`<DialogContent>
  <DialogHeader>
    <DialogTitle>Rename device</DialogTitle>
  </DialogHeader>
  <div className="grid gap-2">
    <Label htmlFor="name">Device name</Label>
    <Input id="name" defaultValue="MacBook Pro" />
  </div>
  <DialogFooter>
    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
    <Button>Save</Button>
  </DialogFooter>
</DialogContent>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Rename device</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Rename device</DialogTitle>
              <DialogDescription>This name appears in your device list and reports.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor="dname">Device name</Label>
              <Input id="dname" defaultValue="MacBook Pro" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Preview>
    </>
  )
}

function DialogUsage() {
  return (
    <>
      <H2>When to use</H2>
      <Lead>Dialogs interrupt. Use them for decisions that need attention right now, like confirming a deletion. For non-blocking information, use an alert or a toast.</Lead>
      <DoDontGrid>
        <DoDont kind="do">Title the dialog with a specific question: "Remove Office laptop?"</DoDont>
        <DoDont kind="dont">Don't title it "Are you sure?" or use "Yes / No" buttons.</DoDont>
      </DoDontGrid>
    </>
  )
}

function SheetExamples() {
  return (
    <Preview
      title="Side and bottom"
      description="Sheets slide in from an edge to show details or filters while keeping context. Bottom sheets are the native default."
      code={`<Sheet>
  <SheetTrigger asChild><Button variant="outline">Scan settings</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Scan settings</SheetTitle>
      <SheetDescription>Choose what's checked during a scan.</SheetDescription>
    </SheetHeader>
    …
  </SheetContent>
</Sheet>`}
      nativeCode={`<BottomSheet
  visible={open}
  onClose={() => setOpen(false)}
  snapPoints={["50%", "90%"]}
  title="Scan settings"
>
  …
</BottomSheet>`}
    >
      {(["right", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Open {side} sheet</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Scan settings</SheetTitle>
              <SheetDescription>Choose what's checked during a scan.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-4 pb-6">
              {["Scan archives (.zip, .rar)", "Scan removable drives", "Detect potentially unwanted apps"].map((l, i) => (
                <div key={l} className="flex items-center justify-between gap-4">
                  <Label htmlFor={`s-${side}-${i}`}>{l}</Label>
                  <Switch id={`s-${side}-${i}`} defaultChecked={i !== 1} />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </Preview>
  )
}

function TooltipExamples() {
  return (
    <Preview
      title="Default"
      description="Tooltips label icon buttons and give short, supplementary hints on hover or focus."
      code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="About encryption"><InfoIcon /></Button>
  </TooltipTrigger>
  <TooltipContent>Files are encrypted with AES-256 before upload</TooltipContent>
</Tooltip>`}
      nativeCode={`// Native has no hover. Use a long-press hint or inline helper text.
<IconButton
  icon={<Info />}
  accessibilityLabel="About encryption"
  accessibilityHint="Files are encrypted with AES-256 before upload"
/>`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="About encryption">
            <InfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Files are encrypted with AES-256 before upload</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Last synced 2 minutes ago</TooltipContent>
      </Tooltip>
    </Preview>
  )
}

function PopoverExamples() {
  return (
    <Preview
      title="Default"
      description="Popovers hold richer, interactive content anchored to a trigger, like a quick settings panel."
      code={`<Popover>
  <PopoverTrigger asChild><Button variant="outline">Bandwidth</Button></PopoverTrigger>
  <PopoverContent>
    <div className="grid gap-3">…</div>
  </PopoverContent>
</Popover>`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Backup schedule</Button>
        </PopoverTrigger>
        <PopoverContent className="grid gap-3">
          <div>
            <div className="font-semibold">Backup schedule</div>
            <p className="text-sm text-muted-foreground">Set when automatic backups run.</p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="start">Start time</Label>
            <Input id="start" type="time" defaultValue="02:00" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="idle">Only when idle</Label>
            <Switch id="idle" defaultChecked />
          </div>
        </PopoverContent>
      </Popover>
    </Preview>
  )
}

export const overlayDocs: ComponentDoc[] = [
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    status: "stable",
    summary: "Dialogs focus attention on a task or decision that needs a response.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"`,
    nativeImportCode: `import { Alert } from "react-native"
import { Modal } from "@carbonite/native"`,
    Examples: DialogExamples,
    Usage: DialogUsage,
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Controlled open state." },
      { name: "modal", type: "boolean", default: "true", description: "Blocks interaction with the page behind." },
    ],
    a11y: ["Focus moves into the dialog on open, is trapped while open, and returns to the trigger on close.", "Escape closes. DialogTitle and DialogDescription are wired to aria-labelledby and aria-describedby."],
    Thumb: () => (
      <div className="w-44 rounded-lg border bg-popover p-3 shadow-overlay">
        <div className="mb-1 h-2.5 w-24 rounded bg-foreground/70" />
        <div className="mb-3 h-2 w-32 rounded bg-muted-foreground/40" />
        <div className="flex justify-end gap-1">
          <span className="h-5 w-10 rounded border" />
          <span className="h-5 w-12 rounded bg-primary" />
        </div>
      </div>
    ),
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    status: "stable",
    summary: "Sheets slide in from the edge of the screen for supplementary tasks.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"`,
    nativeImportCode: `import { BottomSheet } from "@carbonite/native"`,
    Examples: SheetExamples,
    props: [{ name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "Edge the sheet enters from." }],
    a11y: ["Behaves like a dialog: focus is trapped and Escape closes.", "Bottom sheets on native support swipe-to-dismiss and the system back gesture."],
    Thumb: () => (
      <div className="relative h-16 w-40 overflow-hidden rounded-md border bg-muted">
        <div className="absolute inset-y-0 right-0 w-16 border-l bg-popover shadow-overlay" />
      </div>
    ),
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    status: "stable",
    summary: "Tooltips show a short label or hint when an element is hovered or focused.",
    platforms: ["web"],
    importCode: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"`,
    Examples: TooltipExamples,
    props: [
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred placement." },
      { name: "delayDuration (provider)", type: "number", default: "200", description: "Hover delay in ms." },
    ],
    a11y: ["Opens on keyboard focus as well as hover.", "Never put essential information or interactive content in a tooltip."],
    Thumb: () => <span className="rounded-md bg-navy-900 px-2 py-1 text-[11px] text-white">Last synced 2m ago</span>,
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    status: "beta",
    summary: "Popovers display interactive content anchored to a trigger.",
    platforms: ["web"],
    importCode: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"`,
    Examples: PopoverExamples,
    props: [{ name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment relative to the trigger." }],
    a11y: ["Focus moves into the popover on open and returns on close.", "Escape and clicking outside both dismiss."],
    Thumb: () => <div className="h-14 w-36 rounded-lg border bg-popover shadow-overlay" />,
  },
]
