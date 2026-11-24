import * as React from "react"
import { Highlight, type PrismTheme } from "prism-react-renderer"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const carboniteCode: PrismTheme = {
  plain: { color: "#dbe5f5", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6f84a8", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#9fb0cc" } },
    { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: "#7cb6ff" } },
    { types: ["boolean", "number"], style: { color: "#ffb26b" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#8ee0b0" } },
    { types: ["operator", "entity", "url"], style: { color: "#c3d0e6" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#ff9d4d" } },
    { types: ["function", "class-name"], style: { color: "#ffd479" } },
    { types: ["regex", "important", "variable"], style: { color: "#f7a8c8" } },
  ],
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-[#9fb0cc] transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 outline-none",
        className
      )}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
    </button>
  )
}

export function CodeBlock({ code, language = "tsx", className, title }: { code: string; language?: string; className?: string; title?: string }) {
  const trimmed = code.trim()
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-code text-[13px]", className)}>
      {title && <div className="border-b border-white/10 px-4 py-2 font-mono text-xs text-[#9fb0cc]">{title}</div>}
      <CopyButton value={trimmed} className="absolute top-2 right-2" />
      <Highlight code={trimmed} language={language} theme={carboniteCode}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 pr-12 font-mono leading-6">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
