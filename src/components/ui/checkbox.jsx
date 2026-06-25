import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/utils/cn"

/**
 * Accessible checkbox built on a native <input> (no extra dependency).
 * The native control is visually hidden but remains the focus/interaction
 * target; the styled box mirrors its checked/focus/disabled state via peer-*.
 */
const Checkbox = React.forwardRef(({ className, label, description, id, ...props }, ref) => {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  const control = (
    <span className="relative inline-flex">
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={cn(
          "peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[6px] border border-input bg-surface shadow-xs transition-colors checked:border-primary checked:bg-primary hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-55",
          className
        )}
        {...props}
      />
      <Check
        className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-primary-foreground opacity-0 peer-checked:opacity-100"
        strokeWidth={3}
      />
    </span>
  )

  if (!label && !description) return control

  return (
    <label htmlFor={inputId} className="flex cursor-pointer items-start gap-2.5">
      {control}
      <span className="grid gap-0.5">
        {label && <span className="text-sm font-medium leading-tight">{label}</span>}
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </span>
    </label>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
