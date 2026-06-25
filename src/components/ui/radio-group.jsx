import * as React from "react"

import { cn } from "@/utils/cn"

/**
 * Lightweight radio group built on native <input type="radio"> — no extra
 * dependency. Pairs with <Radio> for a styled, accessible single-select.
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} role="radiogroup" className={cn("grid gap-2", className)} {...props} />
))
RadioGroup.displayName = "RadioGroup"

const Radio = React.forwardRef(({ className, label, description, id, ...props }, ref) => {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  const control = (
    <span className="relative inline-flex">
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className={cn(
          "peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-input bg-surface shadow-xs transition-colors checked:border-primary hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-55",
          className
        )}
        {...props}
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-primary transition-transform peer-checked:scale-100" />
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
Radio.displayName = "Radio"

export { RadioGroup, Radio }
