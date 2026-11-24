import * as React from "react"
import { CodeIcon, EyeIcon, MonitorIcon, SmartphoneIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/site/code-block"
import { cn } from "@/lib/utils"

type PreviewProps = {
  title?: string
  description?: React.ReactNode
  children: React.ReactNode
  code: string
  nativeCode?: string
  align?: "center" | "start"
  className?: string
}

/** Live demo with React (web) and React Native code tabs. */
export function Preview({ title, description, children, code, nativeCode, align = "center", className }: PreviewProps) {
  const id = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined
  return (
    <section className="mt-8 first:mt-0">
      {title && (
        <h3 id={id} className="mb-1 scroll-mt-24 text-lg font-semibold tracking-tight">
          {title}
        </h3>
      )}
      {description && <p className="mb-3 text-[15px] text-muted-foreground">{description}</p>}
      <Tabs defaultValue="preview" className="gap-0">
        <TabsList className="mb-2 h-9">
          <TabsTrigger value="preview" className="text-[13px]">
            <EyeIcon /> Preview
          </TabsTrigger>
          <TabsTrigger value="react" className="text-[13px]">
            <MonitorIcon /> React
          </TabsTrigger>
          {nativeCode && (
            <TabsTrigger value="native" className="text-[13px]">
              <SmartphoneIcon /> React Native
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="preview">
          <div
            className={cn(
              "flex min-h-40 flex-wrap gap-4 rounded-xl border bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[length:16px_16px] p-6 sm:p-10",
              align === "center" ? "items-center justify-center" : "items-start justify-start",
              className
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="react">
          <CodeBlock code={code} />
        </TabsContent>
        {nativeCode && (
          <TabsContent value="native">
            <CodeBlock code={nativeCode} />
          </TabsContent>
        )}
      </Tabs>
    </section>
  )
}

export function CodeTabs({ code, nativeCode }: { code: string; nativeCode?: string }) {
  return (
    <Tabs defaultValue="react" className="gap-0">
      <TabsList className="mb-2 h-9">
        <TabsTrigger value="react" className="text-[13px]">
          <CodeIcon /> React
        </TabsTrigger>
        {nativeCode && (
          <TabsTrigger value="native" className="text-[13px]">
            <SmartphoneIcon /> React Native
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="react">
        <CodeBlock code={code} />
      </TabsContent>
      {nativeCode && (
        <TabsContent value="native">
          <CodeBlock code={nativeCode} />
        </TabsContent>
      )}
    </Tabs>
  )
}
