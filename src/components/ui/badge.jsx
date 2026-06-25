import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border-strong text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        success: "border-transparent bg-success-subtle text-success-emphasis",
        warning: "border-transparent bg-warning-subtle text-warning-emphasis",
        info: "border-transparent bg-info-subtle text-info-emphasis",
        destructive: "border-transparent bg-destructive-subtle text-destructive-emphasis",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants }
