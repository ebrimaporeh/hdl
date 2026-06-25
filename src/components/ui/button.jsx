import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react"

import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border-strong bg-surface text-foreground shadow-xs hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground",
        subtle:
          "bg-accent text-accent-foreground hover:bg-accent/70",
        link:
          "text-primary underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        xs: "h-8 rounded-md px-2.5 text-xs gap-1.5 [&_svg]:size-3.5",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-lg px-6 text-sm",
        xl: "h-12 rounded-lg px-7 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9",
        "icon-xs": "h-8 w-8 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // When asChild, Radix Slot requires a single child — don't inject spinner markup.
    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
