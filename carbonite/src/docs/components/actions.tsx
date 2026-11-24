import * as React from "react"
import { ArrowRightIcon, CloudUploadIcon, CopyIcon, DownloadIcon, LogOutIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, SettingsIcon, Trash2Icon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Preview } from "@/components/site/preview"
import { DoDont, DoDontGrid, H2, Lead } from "@/components/site/doc-parts"
import type { ComponentDoc } from "../types"

function ButtonExamples() {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
      <Preview
        title="Appearance"
        description="Use one primary button per view for the main action. Accent is reserved for marketing moments and upgrade prompts."
        code={`import { Button } from "@/components/ui/button"

export function ButtonAppearance() {
  return (
    <>
      <Button>Start backup</Button>
      <Button variant="accent">Upgrade plan</Button>
      <Button variant="secondary">View devices</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="destructive">Delete backup</Button>
      <Button variant="link">Learn more</Button>
    </>
  )
}`}
        nativeCode={`import { Button } from "@carbonite/native"

export function ButtonAppearance() {
  return (
    <View style={{ gap: 12 }}>
      <Button onPress={startBackup}>Start backup</Button>
      <Button variant="accent">Upgrade plan</Button>
      <Button variant="secondary">View devices</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="destructive">Delete backup</Button>
    </View>
  )
}`}
      >
        <Button>Start backup</Button>
        <Button variant="accent">Upgrade plan</Button>
        <Button variant="secondary">View devices</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Skip</Button>
        <Button variant="destructive">Delete backup</Button>
        <Button variant="link">Learn more</Button>
      </Preview>
      <Preview
        title="Sizes"
        description="Default (40px) works for most web UI. Use large (48px) for primary actions in native apps and touch-first layouts."
        code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`}
        nativeCode={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button> {/* 48pt, recommended for primary mobile CTAs */}`}
      >
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </Preview>
      <Preview
        title="With icon"
        description="Icons sit before the label to reinforce meaning, or after it to signal direction. Icon-only buttons need an accessible label."
        code={`<Button><CloudUploadIcon /> Back up now</Button>
<Button variant="outline">Continue <ArrowRightIcon /></Button>
<Button variant="outline" size="icon" aria-label="Settings">
  <SettingsIcon />
</Button>`}
        nativeCode={`<Button icon={<CloudUpload />}>Back up now</Button>
<Button variant="outline" iconRight={<ArrowRight />}>Continue</Button>
<IconButton icon={<Settings />} accessibilityLabel="Settings" />`}
      >
        <Button>
          <CloudUploadIcon /> Back up now
        </Button>
        <Button variant="outline">
          Continue <ArrowRightIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Settings">
          <SettingsIcon />
        </Button>
      </Preview>
      <Preview
        title="Loading and disabled"
        description="Show a spinner and keep the label while an action is in progress. Click the first button to try it."
        code={`const [loading, setLoading] = useState(false)

<Button disabled={loading} onClick={restore}>
  {loading && <Spinner size="sm" className="border-white/30 border-t-white" />}
  {loading ? "Restoring…" : "Restore files"}
</Button>
<Button disabled>Disabled</Button>`}
        nativeCode={`<Button loading={isRestoring} onPress={restore}>
  {isRestoring ? "Restoring…" : "Restore files"}
</Button>
<Button disabled>Disabled</Button>`}
      >
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true)
            setTimeout(() => setLoading(false), 2000)
          }}
        >
          {loading && <Spinner size="sm" className="border-white/30 border-t-white dark:border-navy-950/30 dark:border-t-navy-950" />}
          {loading ? "Restoring…" : "Restore files"}
        </Button>
        <Button disabled>Disabled</Button>
      </Preview>
    </>
  )
}

function ButtonUsage() {
  return (
    <>
      <H2>When to use</H2>
      <Lead>Buttons trigger actions: starting a backup, saving settings, opening a dialog. If the result is navigation to another page, use a link instead.</Lead>
      <H2>Hierarchy</H2>
      <Lead>Pair one primary button with secondary or outline buttons. Put the primary action on the right in dialogs and forms on web, and at the bottom, full width, on native.</Lead>
      <DoDontGrid>
        <DoDont
          kind="do"
          example={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </>
          }
        >
          Use one primary action with clear, verb-first labels.
        </DoDont>
        <DoDont
          kind="dont"
          example={
            <>
              <Button>Cancel</Button>
              <Button>OK</Button>
            </>
          }
        >
          Don't use multiple primary buttons or vague labels like "OK".
        </DoDont>
      </DoDontGrid>
      <H2>Writing labels</H2>
      <Lead>Start with a verb and say what happens: "Restore files", "Add device", "Start free trial". Keep labels to three words or fewer, in sentence case.</Lead>
    </>
  )
}

function DropdownExamples() {
  return (
    <>
      <Preview
        title="Default"
        description="Group related actions and separate destructive ones at the bottom."
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="icon" aria-label="Device actions">
      <MoreHorizontalIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-52">
    <DropdownMenuLabel>MacBook Pro</DropdownMenuLabel>
    <DropdownMenuItem><PencilIcon /> Rename</DropdownMenuItem>
    <DropdownMenuItem><DownloadIcon /> Restore files</DropdownMenuItem>
    <DropdownMenuItem><CopyIcon /> Copy device ID <DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><Trash2Icon /> Remove device</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        nativeCode={`// On native, overflow actions open an ActionSheet
import { ActionSheet } from "@carbonite/native"

<ActionSheet
  title="MacBook Pro"
  options={[
    { label: "Rename", icon: <Pencil />, onPress: rename },
    { label: "Restore files", icon: <Download />, onPress: restore },
    { label: "Remove device", destructive: true, onPress: remove },
  ]}
  visible={open}
  onClose={() => setOpen(false)}
/>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Device actions">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>MacBook Pro</DropdownMenuLabel>
            <DropdownMenuItem>
              <PencilIcon /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon /> Restore files
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon /> Copy device ID <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2Icon /> Remove device
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <UserIcon /> Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <UserIcon /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusIcon /> Add device
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Preview>
    </>
  )
}

export const actionDocs: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    status: "stable",
    summary: "Buttons let people take action, like starting a backup or saving settings.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Button } from "@/components/ui/button"`,
    nativeImportCode: `import { Button } from "@carbonite/native"`,
    Examples: ButtonExamples,
    Usage: ButtonUsage,
    props: [
      { name: "variant", type: '"default" | "accent" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: "Visual emphasis of the button." },
      { name: "size", type: '"sm" | "default" | "lg" | "icon" | "icon-sm"', default: '"default"', description: "Height and padding. Large is 48px for touch targets." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as the child element, for example a router Link." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and lowers opacity." },
    ],
    a11y: [
      "Uses a native <button> element, so it's keyboard focusable and activates with Enter and Space.",
      "Icon-only buttons must have an aria-label (web) or accessibilityLabel (native).",
      "Focus ring is a 3px Carbonite Blue halo with at least 3:1 contrast against all surfaces.",
      "Minimum touch target is 44×44pt on iOS and 48×48dp on Android; use size=\"lg\" or padding to reach it.",
    ],
    Thumb: () => (
      <div className="flex gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Secondary
        </Button>
      </div>
    ),
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown menu",
    category: "Actions",
    status: "stable",
    summary: "A menu of actions or options that opens from a trigger button.",
    platforms: ["web", "ios", "android"],
    importCode: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"`,
    nativeImportCode: `import { ActionSheet } from "@carbonite/native"`,
    Examples: DropdownExamples,
    props: [
      { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment of the menu relative to its trigger." },
      { name: "variant (item)", type: '"destructive"', description: "Styles an item as a destructive action." },
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Controlled open state." },
    ],
    a11y: [
      "Built on Radix: arrow keys move focus, Enter selects, Escape closes and returns focus to the trigger.",
      "Typeahead jumps to items by their first letter.",
      "On native, the ActionSheet uses the platform sheet so VoiceOver and TalkBack announce it correctly.",
    ],
    Thumb: () => (
      <div className="w-36 rounded-lg border bg-popover p-1 text-xs shadow-overlay">
        <div className="rounded px-2 py-1 bg-accent text-accent-foreground">Rename</div>
        <div className="px-2 py-1">Restore files</div>
        <div className="px-2 py-1 text-destructive">Remove</div>
      </div>
    ),
  },
]
