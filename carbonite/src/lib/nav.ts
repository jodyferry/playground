export type NavItem = { title: string; href: string; badge?: string }
export type NavSection = { title: string; items: NavItem[] }

export const topNav = [
  { title: "Get started", href: "/get-started" },
  { title: "Foundations", href: "/foundations" },
  { title: "Tokens", href: "/tokens" },
  { title: "Components", href: "/components" },
  { title: "Patterns", href: "/patterns" },
  { title: "Content", href: "/content" },
  { title: "Resources", href: "/resources" },
]

export const sidebars: Record<string, NavSection[]> = {
  "get-started": [
    {
      title: "Get started",
      items: [
        { title: "Overview", href: "/get-started" },
        { title: "For designers", href: "/get-started/designers" },
        { title: "For developers", href: "/get-started/developers" },
        { title: "Contributing", href: "/get-started/contributing" },
      ],
    },
  ],
  foundations: [
    {
      title: "Foundations",
      items: [
        { title: "Overview", href: "/foundations" },
        { title: "Color", href: "/foundations/color" },
        { title: "Typography", href: "/foundations/typography" },
        { title: "Spacing", href: "/foundations/spacing" },
        { title: "Elevation", href: "/foundations/elevation" },
        { title: "Radius", href: "/foundations/radius" },
        { title: "Iconography", href: "/foundations/iconography" },
        { title: "Grid and layout", href: "/foundations/grid" },
        { title: "Motion", href: "/foundations/motion" },
        { title: "Accessibility", href: "/foundations/accessibility" },
      ],
    },
    {
      title: "Platforms",
      items: [
        { title: "Web apps", href: "/foundations/platforms/web" },
        { title: "Native apps", href: "/foundations/platforms/native" },
      ],
    },
  ],
  tokens: [
    {
      title: "Tokens",
      items: [
        { title: "Overview", href: "/tokens" },
        { title: "All tokens", href: "/tokens/all" },
      ],
    },
  ],
  patterns: [
    {
      title: "Patterns",
      items: [
        { title: "Overview", href: "/patterns" },
        { title: "Forms", href: "/patterns/forms" },
        { title: "Protection status", href: "/patterns/protection-status" },
        { title: "Empty states", href: "/patterns/empty-states" },
        { title: "Messaging and errors", href: "/patterns/messaging" },
        { title: "Mobile app shell", href: "/patterns/mobile-shell" },
      ],
    },
  ],
  content: [
    {
      title: "Content",
      items: [
        { title: "Overview", href: "/content" },
        { title: "Voice and tone", href: "/content/voice-and-tone" },
        { title: "Writing style", href: "/content/writing-style" },
        { title: "Terminology", href: "/content/terminology" },
      ],
    },
  ],
  resources: [
    {
      title: "Resources",
      items: [
        { title: "Overview", href: "/resources" },
        { title: "Figma libraries", href: "/resources/figma" },
        { title: "Icons", href: "/resources/icons" },
        { title: "Changelog", href: "/resources/changelog" },
      ],
    },
  ],
}
