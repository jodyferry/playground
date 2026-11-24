import type * as React from "react"
import type { PropDef, Status } from "@/components/site/doc-parts"

export type Platform = "web" | "ios" | "android"

export type ComponentDoc = {
  slug: string
  name: string
  category: string
  status: Status
  summary: string
  platforms: Platform[]
  importCode: string
  nativeImportCode?: string
  Examples: React.FC
  Usage?: React.FC
  props?: PropDef[]
  a11y?: string[]
  /** small static visual for the overview grid */
  Thumb?: React.FC
}
