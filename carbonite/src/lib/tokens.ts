export const palettes: { name: string; token: string; swatches: [string, string][] }[] = [
  {
    name: "Carbonite Blue",
    token: "blue",
    swatches: [
      ["50", "#EEF5FF"], ["100", "#D9E8FF"], ["200", "#B3D1FF"], ["300", "#80B3FF"], ["400", "#4D94FF"],
      ["500", "#2F7BF5"], ["600", "#0B5FD1"], ["700", "#0A4BA6"], ["800", "#0C3A7D"], ["900", "#0B2A5A"],
    ],
  },
  { name: "Navy", token: "navy", swatches: [["700", "#1B3766"], ["800", "#132B54"], ["900", "#0B1E3F"], ["950", "#071327"]] },
  { name: "Signal Orange", token: "orange", swatches: [["50", "#FFF5EB"], ["100", "#FFE9D4"], ["300", "#FFBD7A"], ["500", "#FF8A1F"], ["600", "#E86F00"], ["700", "#B95700"]] },
  {
    name: "Neutral",
    token: "neutral",
    swatches: [
      ["0", "#FFFFFF"], ["50", "#F7F8FA"], ["100", "#EEF1F5"], ["200", "#E3E7EE"], ["300", "#CBD2DD"], ["400", "#9AA6B8"],
      ["500", "#6B7890"], ["600", "#52607A"], ["700", "#3A4760"], ["800", "#243149"], ["900", "#141D30"],
    ],
  },
  { name: "Green", token: "green", swatches: [["50", "#ECFBF2"], ["500", "#1BA85E"], ["600", "#138A4B"], ["700", "#0E6B3A"]] },
  { name: "Amber", token: "amber", swatches: [["50", "#FFF8E6"], ["400", "#FFC233"], ["700", "#9A5B00"]] },
  { name: "Red", token: "red", swatches: [["50", "#FFF0EF"], ["500", "#F04438"], ["600", "#D92D20"], ["700", "#B42318"]] },
]

export type SemanticToken = { name: string; cssVar: string; light: string; dark: string; usage: string; group: string }

export const semanticTokens: SemanticToken[] = [
  { group: "Surface", name: "color.background", cssVar: "--background", light: "#FFFFFF", dark: "#071327", usage: "Default page background." },
  { group: "Surface", name: "color.surface.card", cssVar: "--card", light: "#FFFFFF", dark: "#0E1F3D", usage: "Cards and raised containers." },
  { group: "Surface", name: "color.surface.sunken", cssVar: "--surface-sunken", light: "#F7F8FA", dark: "#091730", usage: "Wells, demo areas, and page sections." },
  { group: "Surface", name: "color.surface.overlay", cssVar: "--popover", light: "#FFFFFF", dark: "#102447", usage: "Menus, popovers, and dialogs." },
  { group: "Surface", name: "color.surface.brand", cssVar: "--surface-brand", light: "#0B1E3F", dark: "#0E2347", usage: "Brand hero areas and the native status hero." },
  { group: "Text", name: "color.text", cssVar: "--foreground", light: "#0B1E3F", dark: "#EEF2F8", usage: "Primary text and headings." },
  { group: "Text", name: "color.text.subtle", cssVar: "--muted-foreground", light: "#52607A", dark: "#9AA8C0", usage: "Secondary text, descriptions, and captions." },
  { group: "Interactive", name: "color.interactive.primary", cssVar: "--primary", light: "#0B5FD1", dark: "#4D94FF", usage: "Primary buttons, links, and selected states." },
  { group: "Interactive", name: "color.interactive.accent", cssVar: "--brand-accent", light: "#FF8A1F", dark: "#FF8A1F", usage: "Upgrade and marketing emphasis. Use sparingly." },
  { group: "Interactive", name: "color.interactive.selected", cssVar: "--accent", light: "#EEF5FF", dark: "#15305C", usage: "Hover and selected backgrounds." },
  { group: "Interactive", name: "color.focus.ring", cssVar: "--ring", light: "#2F7BF5", dark: "#4D94FF", usage: "Keyboard focus indicator." },
  { group: "Border", name: "color.border", cssVar: "--border", light: "#E3E7EE", dark: "#1F3358", usage: "Dividers and container borders." },
  { group: "Border", name: "color.border.input", cssVar: "--input", light: "#CBD2DD", dark: "#2A426B", usage: "Form field borders (3:1 against background)." },
  { group: "Status", name: "color.status.success", cssVar: "--success", light: "#138A4B", dark: "#1BA85E", usage: "Protected, complete, and up to date." },
  { group: "Status", name: "color.status.warning", cssVar: "--warning", light: "#FFC233", dark: "#FFC233", usage: "At risk; action recommended." },
  { group: "Status", name: "color.status.danger", cssVar: "--destructive", light: "#D92D20", dark: "#F04438", usage: "Threats, errors, and destructive actions." },
  { group: "Status", name: "color.status.info", cssVar: "--info-subtle", light: "#EEF5FF", dark: "#10284F", usage: "Informational message backgrounds." },
]

export const spacing = [
  ["space.025", "2px", "0.5"], ["space.050", "4px", "1"], ["space.100", "8px", "2"], ["space.150", "12px", "3"], ["space.200", "16px", "4"],
  ["space.300", "24px", "6"], ["space.400", "32px", "8"], ["space.500", "40px", "10"], ["space.600", "48px", "12"], ["space.800", "64px", "16"], ["space.1000", "80px", "20"],
]

export const radii = [
  ["radius.small", "6px", "rounded-sm", "Badges inside dense tables, checkboxes"],
  ["radius.medium", "8px", "rounded-md", "Buttons, inputs, menu items"],
  ["radius.large", "10px", "rounded-lg", "Alerts, popovers, menus"],
  ["radius.xlarge", "14px", "rounded-xl", "Cards, dialogs, code blocks"],
  ["radius.2xlarge", "18px", "rounded-2xl", "Feature tiles, bottom sheets"],
  ["radius.full", "9999px", "rounded-full", "Avatars, pills, switches"],
]

export const typeScale = [
  ["font.display", "48 / 52", "700", "-0.02em", "text-5xl font-bold tracking-tight", "Marketing and hero headlines"],
  ["font.heading.xl", "36 / 40", "700", "-0.02em", "text-4xl font-bold tracking-tight", "Page titles"],
  ["font.heading.lg", "24 / 32", "600", "-0.01em", "text-2xl font-semibold tracking-tight", "Section headings"],
  ["font.heading.md", "20 / 28", "600", "-0.01em", "text-xl font-semibold", "Card and dialog titles"],
  ["font.heading.sm", "16 / 24", "600", "0", "text-base font-semibold", "Group labels"],
  ["font.body.lg", "18 / 28", "400", "0", "text-lg", "Lead paragraphs"],
  ["font.body", "15 / 24", "400", "0", "text-[15px]", "Default body text"],
  ["font.body.sm", "13 / 20", "400", "0", "text-[13px]", "Secondary text, table cells"],
  ["font.caption", "12 / 16", "500", "0.01em", "text-xs font-medium", "Captions and metadata"],
  ["font.code", "13 / 24", "400", "0", "font-mono text-[13px]", "Code and technical values"],
]

function lum(hex: string) {
  const v = hex.replace("#", "").match(/.{2}/g)!.map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
}
export function contrast(a: string, b: string) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}
export const bestText = (hex: string) => (contrast(hex, "#FFFFFF") >= contrast(hex, "#0B1E3F") ? "#FFFFFF" : "#0B1E3F")
