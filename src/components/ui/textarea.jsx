import * as React from "react"

import { cn } from "@/utils/cn"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[88px] w-full rounded-md border border-input bg-surface px-3 py-2.5 text-base shadow-xs transition-colors",
        "placeholder:text-muted-foreground/70",
        "hover:border-border-strong",
        "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/25",
        "md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
