import * as React from "react"
import { BellIcon, HardDriveIcon, HomeIcon, LockIcon, SettingsIcon, ShieldCheckIcon, ShieldIcon, WifiIcon, ShieldAlertIcon, AlertTriangleIcon } from "lucide-react"
import { Preview } from "@/components/site/preview"
import { PhoneFrame } from "@/components/site/doc-parts"
import { Button } from "@/components/ui/button"
import { ListGroup, ListRow, NativeToggle, NavBar, SegmentedControl, StatusBar, StatusHero, TabBar, type ProtectionState } from "@/components/native"
import type { ComponentDoc } from "../types"

const tabs = [
  { label: "Home", icon: HomeIcon },
  { label: "Protection", icon: ShieldIcon, badge: 1 },
  { label: "Backup", icon: HardDriveIcon },
  { label: "Settings", icon: SettingsIcon },
]

function TabBarExamples() {
  const [active, setActive] = React.useState(0)
  return (
    <Preview
      title="Default"
      description="The tab bar holds an app's 3 to 5 top-level destinations. It stays visible on every top-level screen. Tap the tabs to switch."
      code={`// Web rendering used in docs and prototypes
<TabBar items={tabs} active={active} onChange={setActive} />`}
      nativeCode={`import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { tabBarOptions } from "@carbonite/native"

const Tab = createBottomTabNavigator()

export function AppTabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: HomeIcon }} />
      <Tab.Screen name="Protection" component={ProtectionScreen} options={{ tabBarIcon: ShieldIcon, tabBarBadge: 1 }} />
      <Tab.Screen name="Backup" component={BackupScreen} options={{ tabBarIcon: HardDriveIcon }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: SettingsIcon }} />
    </Tab.Navigator>
  )
}`}
    >
      <PhoneFrame label={tabs[active].label}>
        <StatusBar />
        <NavBar title={tabs[active].label} large />
        <div className="px-4 text-sm text-muted-foreground">Content for the {tabs[active].label.toLowerCase()} tab.</div>
        <TabBar items={tabs} active={active} onChange={setActive} />
      </PhoneFrame>
    </Preview>
  )
}

function ListRowExamples() {
  const [rt, setRt] = React.useState(true)
  const [wifi, setWifi] = React.useState(true)
  return (
    <Preview
      title="Settings list"
      description="Grouped list rows are the building block of native settings and detail screens. Rows are at least 48pt tall."
      code={`<ListGroup header="Protection">
  <ListRow icon={ShieldCheckIcon} iconBg="bg-success" title="Real-time protection"
    trailing={<NativeToggle on={rt} onChange={setRt} label="Real-time protection" />} />
  <ListRow icon={WifiIcon} title="Wi-Fi security" subtitle="Home network" chevron />
</ListGroup>`}
      nativeCode={`import { ListGroup, ListRow, Switch } from "@carbonite/native"

<ListGroup header="Protection" footer="Scans apps as they're installed.">
  <ListRow
    icon={<ShieldCheck />}
    iconColor="success"
    title="Real-time protection"
    trailing={<Switch value={rt} onValueChange={setRt} />}
  />
  <ListRow
    icon={<Wifi />}
    title="Wi-Fi security"
    subtitle="Home network"
    onPress={() => navigation.navigate("WifiSecurity")}
  />
</ListGroup>`}
    >
      <PhoneFrame>
        <div className="h-full bg-surface-sunken">
          <StatusBar />
          <NavBar title="Settings" large />
          <div className="grid gap-6 pt-2">
            <ListGroup header="Protection" footer="Scans apps as they're installed.">
              <ListRow icon={ShieldCheckIcon} iconBg="bg-success" title="Real-time protection" trailing={<NativeToggle on={rt} onChange={setRt} label="Real-time protection" />} />
              <ListRow icon={WifiIcon} title="Secure Wi-Fi" subtitle={wifi ? "Auto-connect on" : "Off"} trailing={<NativeToggle on={wifi} onChange={setWifi} label="Secure Wi-Fi" />} />
              <ListRow icon={LockIcon} iconBg="bg-navy-700" title="App lock" subtitle="Face ID" chevron />
            </ListGroup>
            <ListGroup header="General">
              <ListRow icon={BellIcon} iconBg="bg-[#E86F00]" title="Notifications" chevron />
              <ListRow icon={HardDriveIcon} iconBg="bg-[#52607A]" title="Backup" subtitle="Photos and contacts" chevron />
            </ListGroup>
          </div>
        </div>
      </PhoneFrame>
    </Preview>
  )
}

function StatusHeroExamples() {
  const [state, setState] = React.useState<ProtectionState>("protected")
  const [progress, setProgress] = React.useState<number | undefined>(undefined)
  const scan = () => {
    let p = 0
    setProgress(0)
    const t = setInterval(() => {
      p += 4
      if (p >= 100) {
        clearInterval(t)
        setProgress(undefined)
        setState("protected")
      } else setProgress(p)
    }, 90)
  }
  const Icon = state === "protected" ? ShieldCheckIcon : state === "at-risk" ? AlertTriangleIcon : ShieldAlertIcon
  return (
    <Preview
      title="Protection states"
      description="The status hero is the first thing people see in a Carbonite app. It shows one of three states, and animates during a scan. Pick a state or run a scan."
      code={`<StatusHero state="protected">
  <ShieldCheckIcon className="size-14 text-success" />
</StatusHero>

<StatusHero state="threat" />
<StatusHero state="protected" progress={scanProgress} />`}
      nativeCode={`import { StatusHero } from "@carbonite/native"

<StatusHero
  state={status} // "protected" | "at-risk" | "threat"
  progress={isScanning ? progress : undefined}
  onPressAction={startScan}
/>`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {(["protected", "at-risk", "threat"] as const).map((s) => (
            <Button key={s} size="sm" variant={state === s && progress === undefined ? "default" : "outline"} onClick={() => setState(s)} disabled={progress !== undefined}>
              {s === "protected" ? "Protected" : s === "at-risk" ? "At risk" : "Threat"}
            </Button>
          ))}
        </div>
        <PhoneFrame>
          <div className="h-full bg-surface-sunken">
            <div className="bg-navy-900">
              <StatusBar dark />
              <NavBar title="Protection" dark />
            </div>
            <StatusHero state={state} progress={progress}>
              <Icon className="size-14" style={{ color: state === "protected" ? "#1BA85E" : state === "at-risk" ? "#FFC233" : "#F04438" }} />
            </StatusHero>
            <div className="-mt-4 grid gap-3 px-4">
              <Button size="lg" className="w-full rounded-xl" onClick={scan} disabled={progress !== undefined}>
                {progress !== undefined ? "Scanning…" : state === "threat" ? "Review threat" : "Scan now"}
              </Button>
              <div className="rounded-xl bg-card p-3 text-[13px] text-muted-foreground shadow-raised">Last scan: today at 9:12 AM · 4,210 items checked</div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </Preview>
  )
}

function SegmentedExamples() {
  const [i, setI] = React.useState(0)
  return (
    <Preview
      title="Default"
      description="Segmented controls switch between 2 to 4 views within a single screen."
      code={`<SegmentedControl values={["Day", "Week", "Month"]} index={i} onChange={setI} />`}
      nativeCode={`import { SegmentedControl } from "@carbonite/native"

<SegmentedControl
  values={["Day", "Week", "Month"]}
  selectedIndex={index}
  onChange={setIndex}
/>`}
    >
      <div className="w-72">
        <SegmentedControl values={["Day", "Week", "Month"]} index={i} onChange={setI} />
        <p className="mt-3 text-center text-sm text-muted-foreground">{["14 threats blocked today", "86 threats blocked this week", "312 threats blocked this month"][i]}</p>
      </div>
    </Preview>
  )
}

const nativeA11y = [
  "Every interactive element sets accessibilityRole and accessibilityLabel.",
  "Supports Dynamic Type (iOS) and font scaling (Android) up to 200% without truncating key content.",
  "Touch targets are at least 44×44pt (iOS) and 48×48dp (Android).",
]

export const nativeDocs: ComponentDoc[] = [
  {
    slug: "tab-bar",
    name: "Tab bar",
    category: "Native",
    status: "native",
    summary: "The tab bar provides top-level navigation in Carbonite mobile apps.",
    platforms: ["ios", "android"],
    importCode: `import { TabBar } from "@/components/native"`,
    nativeImportCode: `import { tabBarOptions } from "@carbonite/native"`,
    Examples: TabBarExamples,
    props: [
      { name: "items", type: "{ label, icon, badge? }[]", description: "3 to 5 destinations." },
      { name: "active", type: "number", description: "Index of the active tab." },
      { name: "onChange", type: "(index: number) => void", description: "Called when a tab is pressed." },
    ],
    a11y: [...nativeA11y, "Badges are announced with the tab label, e.g. \"Protection, 1 alert\"."],
    Thumb: () => (
      <div className="flex w-44 justify-around rounded-md border bg-background py-1.5">
        {tabs.map((t, i) => (
          <t.icon key={t.label} className={`size-4 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
        ))}
      </div>
    ),
  },
  {
    slug: "list-row",
    name: "List row",
    category: "Native",
    status: "native",
    summary: "List rows display settings, navigation items, and records in grouped lists.",
    platforms: ["ios", "android"],
    importCode: `import { ListGroup, ListRow } from "@/components/native"`,
    nativeImportCode: `import { ListGroup, ListRow } from "@carbonite/native"`,
    Examples: ListRowExamples,
    props: [
      { name: "icon", type: "Icon", description: "Leading icon in a colored tile." },
      { name: "title / subtitle", type: "string", description: "Primary and secondary text." },
      { name: "trailing", type: "ReactNode", description: "Switch, badge, or value on the right." },
      { name: "onPress", type: "() => void", description: "Makes the row tappable and shows a chevron." },
    ],
    a11y: nativeA11y,
    Thumb: () => (
      <div className="w-44 divide-y rounded-lg border bg-card text-[11px]">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="size-4 rounded bg-success" /> Real-time
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="size-4 rounded bg-primary" /> Secure Wi-Fi
        </div>
      </div>
    ),
  },
  {
    slug: "status-hero",
    name: "Status hero",
    category: "Native",
    status: "native",
    summary: "The status hero shows device protection status at the top of the home screen.",
    platforms: ["ios", "android", "web"],
    importCode: `import { StatusHero } from "@/components/native"`,
    nativeImportCode: `import { StatusHero } from "@carbonite/native"`,
    Examples: StatusHeroExamples,
    props: [
      { name: "state", type: '"protected" | "at-risk" | "threat"', description: "Overall protection state." },
      { name: "progress", type: "number", description: "When set, shows scan progress from 0 to 100." },
    ],
    a11y: [...nativeA11y, "State changes are announced with a live region.", "Ring color is paired with an icon and a text label, never color alone."],
    Thumb: () => (
      <div className="flex size-16 items-center justify-center rounded-full border-[5px] border-success bg-navy-900">
        <ShieldCheckIcon className="size-6 text-success" />
      </div>
    ),
  },
  {
    slug: "segmented-control",
    name: "Segmented control",
    category: "Native",
    status: "native",
    summary: "Segmented controls switch between closely related views in one screen.",
    platforms: ["ios", "android"],
    importCode: `import { SegmentedControl } from "@/components/native"`,
    nativeImportCode: `import { SegmentedControl } from "@carbonite/native"`,
    Examples: SegmentedExamples,
    props: [
      { name: "values", type: "string[]", description: "2 to 4 short labels." },
      { name: "index", type: "number", description: "Selected segment." },
      { name: "onChange", type: "(index: number) => void", description: "Called on selection." },
    ],
    a11y: nativeA11y,
    Thumb: () => (
      <div className="flex w-40 rounded-md bg-secondary p-0.5 text-[10px]">
        <span className="flex-1 rounded bg-background py-1 text-center shadow-raised">Day</span>
        <span className="flex-1 py-1 text-center text-muted-foreground">Week</span>
        <span className="flex-1 py-1 text-center text-muted-foreground">Month</span>
      </div>
    ),
  },
]
