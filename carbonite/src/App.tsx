import type * as React from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/lib/theme"
import { DocsLayout, SiteLayout } from "@/components/site/layout"
import { HomePage } from "@/pages/home"

// Each docs section is its own chunk, loaded on first visit.
const mods = {
  F: () => import("@/pages/foundations"),
  G: () => import("@/pages/guides"),
  P: () => import("@/pages/patterns"),
  C: () => import("@/pages/components"),
}
const page = (mod: keyof typeof mods, name: string) => ({
  lazy: () => mods[mod]().then((m) => ({ Component: (m as unknown as Record<string, React.ComponentType>)[name] })),
})

const router = createBrowserRouter(
  [
    {
      element: <SiteLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          element: <DocsLayout />,
          children: [
            { path: "get-started", ...page("G", "GetStartedPage") },
            { path: "get-started/designers", ...page("G", "DesignersPage") },
            { path: "get-started/developers", ...page("G", "DevelopersPage") },
            { path: "get-started/contributing", ...page("G", "ContributingPage") },

            { path: "foundations", ...page("F", "FoundationsOverview") },
            { path: "foundations/color", ...page("F", "ColorPage") },
            { path: "foundations/typography", ...page("F", "TypographyPage") },
            { path: "foundations/spacing", ...page("F", "SpacingPage") },
            { path: "foundations/elevation", ...page("F", "ElevationPage") },
            { path: "foundations/radius", ...page("F", "RadiusPage") },
            { path: "foundations/iconography", ...page("F", "IconographyPage") },
            { path: "foundations/grid", ...page("F", "GridPage") },
            { path: "foundations/motion", ...page("F", "MotionPage") },
            { path: "foundations/accessibility", ...page("F", "AccessibilityPage") },
            { path: "foundations/platforms/web", ...page("F", "PlatformWebPage") },
            { path: "foundations/platforms/native", ...page("F", "PlatformNativePage") },

            { path: "tokens", ...page("G", "TokensOverviewPage") },
            { path: "tokens/all", ...page("G", "AllTokensPage") },

            { path: "components", ...page("C", "ComponentsOverviewPage") },
            { path: "components/:slug", ...page("C", "ComponentPage") },

            { path: "patterns", ...page("P", "PatternsOverviewPage") },
            { path: "patterns/forms", ...page("P", "FormsPatternPage") },
            { path: "patterns/protection-status", ...page("P", "ProtectionStatusPage") },
            { path: "patterns/empty-states", ...page("P", "EmptyStatesPatternPage") },
            { path: "patterns/messaging", ...page("P", "MessagingPatternPage") },
            { path: "patterns/mobile-shell", ...page("P", "MobileShellPage") },

            { path: "content", ...page("G", "ContentOverviewPage") },
            { path: "content/voice-and-tone", ...page("G", "VoiceTonePage") },
            { path: "content/writing-style", ...page("G", "WritingStylePage") },
            { path: "content/terminology", ...page("G", "TerminologyPage") },

            { path: "resources", ...page("G", "ResourcesOverviewPage") },
            { path: "resources/figma", ...page("G", "FigmaPage") },
            { path: "resources/icons", element: <Navigate to="/foundations/iconography" replace /> },
            { path: "resources/changelog", ...page("G", "ChangelogPage") },

            { path: "*", ...page("G", "NotFoundPage") },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") }
)

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  )
}
