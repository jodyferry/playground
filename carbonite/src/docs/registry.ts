import type { ComponentDoc } from "./types"
import { actionDocs } from "./components/actions"
import { formDocs } from "./components/forms"
import { feedbackDocs } from "./components/feedback"
import { navigationDocs } from "./components/navigation"
import { overlayDocs } from "./components/overlays"
import { dataDocs } from "./components/data"
import { nativeDocs } from "./components/native"

export const componentCategories = ["Actions", "Forms", "Feedback", "Navigation", "Overlays", "Data display", "Native"]

export const componentDocs: ComponentDoc[] = [
  ...actionDocs,
  ...formDocs,
  ...feedbackDocs,
  ...navigationDocs,
  ...overlayDocs,
  ...dataDocs,
  ...nativeDocs,
]

export const getComponentDoc = (slug: string) => componentDocs.find((c) => c.slug === slug)
