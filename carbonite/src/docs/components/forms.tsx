import * as React from "react"
import { MailIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Preview } from "@/components/site/preview"
import { DoDont, DoDontGrid, H2, Lead } from "@/components/site/doc-parts"
import type { ComponentDoc } from "../types"

function TextFieldExamples() {
  const [email, setEmail] = React.useState("jody@example")
  const invalid = email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  return (
    <>
      <Preview
        title="Default"
        description="Always pair a field with a visible label. Helper text sits below the field."
        code={`<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="device-name">Device name</Label>
  <Input id="device-name" placeholder="e.g. Office laptop" />
  <p className="text-sm text-muted-foreground">Shown in your device list.</p>
</div>`}
        nativeCode={`import { TextField } from "@carbonite/native"

<TextField
  label="Device name"
  placeholder="e.g. Office laptop"
  helperText="Shown in your device list."
  value={name}
  onChangeText={setName}
/>`}
      >
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="device-name">Device name</Label>
          <Input id="device-name" placeholder="e.g. Office laptop" />
          <p className="text-sm text-muted-foreground">Shown in your device list.</p>
        </div>
      </Preview>
      <Preview
        title="Validation"
        description="Validate on blur or submit, then update live as people fix the error. Try typing a valid email."
        code={`const invalid = !isEmail(email)

<Label htmlFor="email">Email address</Label>
<Input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  aria-invalid={invalid}
  aria-describedby="email-error"
/>
{invalid && (
  <p id="email-error" className="text-sm text-destructive">
    Enter an email address like name@example.com
  </p>
)}`}
        nativeCode={`<TextField
  label="Email address"
  keyboardType="email-address"
  autoCapitalize="none"
  value={email}
  onChangeText={setEmail}
  error={invalid ? "Enter an email address like name@example.com" : undefined}
/>`}
      >
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={invalid} aria-describedby="email-error" />
          {invalid ? (
            <p id="email-error" className="text-sm text-destructive">
              Enter an email address like name@example.com
            </p>
          ) : (
            <p className="text-sm text-success">Looks good.</p>
          )}
        </div>
      </Preview>
      <Preview
        title="With icon"
        code={`<div className="relative">
  <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search files" />
</div>`}
        nativeCode={`<TextField leadingIcon={<Search />} placeholder="Search files" />`}
      >
        <div className="grid w-full max-w-sm gap-3">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search files" />
          </div>
          <div className="relative">
            <MailIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="you@company.com" />
          </div>
        </div>
      </Preview>
      <Preview
        title="Text area"
        code={`<Label htmlFor="msg">Describe the issue</Label>
<Textarea id="msg" placeholder="What happened?" rows={4} />`}
        nativeCode={`<TextField label="Describe the issue" multiline numberOfLines={4} />`}
      >
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="msg">Describe the issue</Label>
          <Textarea id="msg" placeholder="What happened?" rows={4} />
        </div>
      </Preview>
      <Preview
        title="Disabled"
        code={`<Input disabled value="Managed by your administrator" />`}
        nativeCode={`<TextField editable={false} value="Managed by your administrator" />`}
      >
        <Input disabled value="Managed by your administrator" className="max-w-sm" />
      </Preview>
    </>
  )
}

function TextFieldUsage() {
  return (
    <>
      <H2>Labels and placeholders</H2>
      <Lead>Labels are always visible. Placeholder text shows an example format and disappears on input, so it must never carry essential instructions.</Lead>
      <DoDontGrid>
        <DoDont
          kind="do"
          example={
            <div className="grid w-56 gap-1.5">
              <Label>Backup name</Label>
              <Input placeholder="e.g. Photos 2026" />
            </div>
          }
        >
          Use a persistent label plus an example placeholder.
        </DoDont>
        <DoDont kind="dont" example={<Input className="w-56" placeholder="Backup name" />}>
          Don't use the placeholder as the label.
        </DoDont>
      </DoDontGrid>
      <H2>Error messages</H2>
      <Lead>Say what went wrong and how to fix it. "Enter an email address like name@example.com" beats "Invalid input".</Lead>
    </>
  )
}

function CheckboxExamples() {
  const [items, setItems] = React.useState({ docs: true, photos: true, music: false })
  const all = Object.values(items).every(Boolean)
  const some = Object.values(items).some(Boolean)
  return (
    <>
      <Preview
        title="Default"
        code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Email me when a backup fails</Label>
</div>`}
        nativeCode={`<Checkbox
  label="Email me when a backup fails"
  checked={notify}
  onValueChange={setNotify}
/>`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="notify" defaultChecked />
          <Label htmlFor="notify">Email me when a backup fails</Label>
        </div>
      </Preview>
      <Preview
        title="Group with select all"
        description="A parent checkbox shows an indeterminate state when only some children are selected."
        align="start"
        code={`const all = Object.values(items).every(Boolean)
const some = Object.values(items).some(Boolean)

<Checkbox
  checked={all ? true : some ? "indeterminate" : false}
  onCheckedChange={(v) => setItems({ docs: !!v, photos: !!v, music: !!v })}
/>`}
        nativeCode={`<CheckboxGroup
  label="Folders to back up"
  selectAll
  options={[
    { value: "docs", label: "Documents" },
    { value: "photos", label: "Photos" },
    { value: "music", label: "Music" },
  ]}
  value={selected}
  onChange={setSelected}
/>`}
      >
        <fieldset className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="all"
              checked={all ? true : some ? "indeterminate" : false}
              onCheckedChange={(v) => setItems({ docs: !!v, photos: !!v, music: !!v })}
            />
            <Label htmlFor="all" className="font-semibold">
              Folders to back up
            </Label>
          </div>
          {(["docs", "photos", "music"] as const).map((k) => (
            <div key={k} className="ml-6 flex items-center gap-2">
              <Checkbox id={k} checked={items[k]} onCheckedChange={(v) => setItems({ ...items, [k]: !!v })} />
              <Label htmlFor={k}>{{ docs: "Documents", photos: "Photos", music: "Music" }[k]}</Label>
            </div>
          ))}
        </fieldset>
      </Preview>
    </>
  )
}

function RadioExamples() {
  return (
    <Preview
      title="Default"
      description="Use radios when people choose exactly one option from a small set, and all options should be visible."
      align="start"
      code={`<RadioGroup defaultValue="daily">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="continuous" id="r1" />
    <Label htmlFor="r1">Continuous</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="daily" id="r2" />
    <Label htmlFor="r2">Once a day</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="weekly" id="r3" />
    <Label htmlFor="r3">Once a week</Label>
  </div>
</RadioGroup>`}
      nativeCode={`<RadioGroup
  label="Backup frequency"
  value={frequency}
  onValueChange={setFrequency}
  options={[
    { value: "continuous", label: "Continuous" },
    { value: "daily", label: "Once a day" },
    { value: "weekly", label: "Once a week" },
  ]}
/>`}
    >
      <RadioGroup defaultValue="daily" aria-label="Backup frequency">
        {[
          ["continuous", "Continuous", "Back up files as soon as they change"],
          ["daily", "Once a day", "Runs at 2:00 AM local time"],
          ["weekly", "Once a week", "Runs Sundays at 2:00 AM"],
        ].map(([v, l, d]) => (
          <div key={v} className="flex items-start gap-3">
            <RadioGroupItem value={v} id={`r-${v}`} className="mt-0.5" />
            <div className="grid gap-0.5">
              <Label htmlFor={`r-${v}`}>{l}</Label>
              <span className="text-sm text-muted-foreground">{d}</span>
            </div>
          </div>
        ))}
      </RadioGroup>
    </Preview>
  )
}

function SwitchExamples() {
  const [on, setOn] = React.useState(true)
  return (
    <>
      <Preview
        title="Default"
        description="Switches apply a setting immediately. If a change needs confirming with a Save button, use a checkbox instead."
        code={`<div className="flex items-center justify-between gap-6">
  <Label htmlFor="realtime">Real-time protection</Label>
  <Switch id="realtime" checked={on} onCheckedChange={setOn} />
</div>`}
        nativeCode={`<SettingRow
  title="Real-time protection"
  trailing={<Switch value={on} onValueChange={setOn} />}
/>`}
      >
        <div className="w-full max-w-sm rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between gap-6">
            <div className="grid gap-0.5">
              <Label htmlFor="realtime">Real-time protection</Label>
              <span className="text-sm text-muted-foreground">{on ? "On. Threats are blocked as they appear." : "Off. Your device is at risk."}</span>
            </div>
            <Switch id="realtime" checked={on} onCheckedChange={setOn} />
          </div>
        </div>
      </Preview>
      <Preview title="Disabled" code={`<Switch disabled defaultChecked />`} nativeCode={`<Switch disabled value />`}>
        <Switch disabled defaultChecked aria-label="Disabled on" />
        <Switch disabled aria-label="Disabled off" />
      </Preview>
    </>
  )
}

function SelectExamples() {
  return (
    <Preview
      title="Default"
      description="Use a select for 5 to 15 options. For fewer, use radio buttons; for more, use a searchable combobox."
      code={`<Select defaultValue="30">
  <SelectTrigger className="w-64" aria-label="Retention">
    <SelectValue placeholder="Keep versions for…" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Version retention</SelectLabel>
      <SelectItem value="7">7 days</SelectItem>
      <SelectItem value="30">30 days</SelectItem>
      <SelectItem value="90">90 days</SelectItem>
      <SelectItem value="365">1 year</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
      nativeCode={`// Opens the platform picker (iOS wheel / Android dialog)
<Select
  label="Keep versions for"
  value={retention}
  onValueChange={setRetention}
  options={[
    { value: "7", label: "7 days" },
    { value: "30", label: "30 days" },
    { value: "90", label: "90 days" },
    { value: "365", label: "1 year" },
  ]}
/>`}
    >
      <div className="grid gap-2">
        <Label>Keep file versions for</Label>
        <Select defaultValue="30">
          <SelectTrigger className="w-64" aria-label="Retention">
            <SelectValue placeholder="Choose…" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Version retention</SelectLabel>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Preview>
  )
}

function SliderExamples() {
  const [v, setV] = React.useState([60])
  return (
    <Preview
      title="Default"
      code={`const [limit, setLimit] = useState([60])

<Label>Bandwidth limit: {limit[0]}%</Label>
<Slider value={limit} onValueChange={setLimit} max={100} step={5} />`}
      nativeCode={`<Slider
  label="Bandwidth limit"
  value={limit}
  onValueChange={setLimit}
  minimumValue={0}
  maximumValue={100}
  step={5}
/>`}
    >
      <div className="grid w-full max-w-sm gap-3">
        <div className="flex justify-between text-sm">
          <Label>Bandwidth limit</Label>
          <span className="font-mono text-muted-foreground">{v[0]}%</span>
        </div>
        <Slider value={v} onValueChange={setV} max={100} step={5} aria-label="Bandwidth limit" />
      </div>
    </Preview>
  )
}

const labelA11y = "Every control has a programmatic label: <Label htmlFor> on web, accessibilityLabel on native."

export const formDocs: ComponentDoc[] = [
  {
    slug: "text-field",
    name: "Text field",
    category: "Forms",
    status: "stable",
    summary: "Text fields let people enter and edit text, from a single line to a long message.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"`,
    nativeImportCode: `import { TextField } from "@carbonite/native"`,
    Examples: TextFieldExamples,
    Usage: TextFieldUsage,
    props: [
      { name: "type", type: "string", default: '"text"', description: "Native input type. Use email, tel, or password to get the right mobile keyboard." },
      { name: "aria-invalid", type: "boolean", description: "Shows the error style and tells assistive tech the value is invalid." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents editing." },
      { name: "error (native)", type: "string", description: "Error message shown below the field on native." },
    ],
    a11y: [labelA11y, "Error messages are linked with aria-describedby so they're read with the field.", "Don't rely on red alone; error text and an icon carry the meaning."],
    Thumb: () => (
      <div className="grid w-44 gap-1.5">
        <div className="h-2 w-16 rounded bg-foreground/70" />
        <div className="h-8 rounded-md border border-input bg-background" />
      </div>
    ),
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    status: "stable",
    summary: "Checkboxes let people select any number of options from a list.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Checkbox } from "@/components/ui/checkbox"`,
    nativeImportCode: `import { Checkbox, CheckboxGroup } from "@carbonite/native"`,
    Examples: CheckboxExamples,
    props: [
      { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled checked state." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Called when the state changes." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
    ],
    a11y: [labelA11y, "Space toggles a focused checkbox.", "Groups use a <fieldset> with a legend or a labelled group role."],
    Thumb: () => (
      <div className="flex items-center gap-2">
        <Checkbox checked aria-label="example" />
        <div className="h-2 w-20 rounded bg-foreground/60" />
      </div>
    ),
  },
  {
    slug: "radio-group",
    name: "Radio group",
    category: "Forms",
    status: "stable",
    summary: "Radio buttons let people choose one option from a short list.",
    platforms: ["web", "ios", "android"],
    importCode: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    nativeImportCode: `import { RadioGroup } from "@carbonite/native"`,
    Examples: RadioExamples,
    props: [
      { name: "value / defaultValue", type: "string", description: "Selected option." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when selection changes." },
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout and arrow-key direction." },
    ],
    a11y: [labelA11y, "Tab moves into the group; arrow keys move between options.", "Give the group a name with aria-label or a visible legend."],
    Thumb: () => (
      <div className="grid gap-1.5">
        {[1, 0].map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full border border-input">{c ? <span className="size-2 rounded-full bg-primary" /> : null}</span>
            <div className="h-2 w-16 rounded bg-foreground/60" />
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    status: "stable",
    summary: "Switches turn a single setting on or off, and take effect immediately.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Switch } from "@/components/ui/switch"`,
    nativeImportCode: `import { Switch } from "@carbonite/native"`,
    Examples: SwitchExamples,
    props: [
      { name: "checked", type: "boolean", description: "Controlled on/off state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when toggled." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
    ],
    a11y: [labelA11y, "Exposes role=\"switch\" with aria-checked.", "Native maps to the platform switch for familiar VoiceOver/TalkBack behavior."],
    Thumb: () => <Switch checked aria-label="example" />,
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    status: "stable",
    summary: "Select lets people choose one option from a collapsed list.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"`,
    nativeImportCode: `import { Select } from "@carbonite/native"`,
    Examples: SelectExamples,
    props: [
      { name: "value / defaultValue", type: "string", description: "Selected value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called on selection." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
    ],
    a11y: [labelA11y, "Opens with Enter, Space, or arrow keys; typeahead selects matching options.", "Native uses platform pickers for screen reader support."],
    Thumb: () => (
      <div className="flex h-8 w-40 items-center justify-between rounded-md border border-input bg-background px-2 text-xs">
        30 days <span className="text-muted-foreground">▾</span>
      </div>
    ),
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Forms",
    status: "beta",
    summary: "Sliders let people pick a value from a continuous range.",
    platforms: ["web", "ios", "android"],
    importCode: `import { Slider } from "@/components/ui/slider"`,
    nativeImportCode: `import { Slider } from "@carbonite/native"`,
    Examples: SliderExamples,
    props: [
      { name: "value", type: "number[]", description: "Current value(s). Pass two values for a range." },
      { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Range and increment." },
      { name: "onValueChange", type: "(value: number[]) => void", description: "Called while dragging." },
    ],
    a11y: ["Arrow keys change by one step, Page Up/Down by ten, Home/End jump to min/max.", "Always show the current value as text next to the slider."],
    Thumb: () => (
      <div className="relative h-1.5 w-40 rounded-full bg-secondary">
        <div className="h-full w-3/5 rounded-full bg-primary" />
        <div className="absolute top-1/2 left-3/5 size-4 -translate-1/2 rounded-full border-2 border-primary bg-background" />
      </div>
    ),
  },
]
