import { cn } from "@/utils/cn"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.6s_infinite] after:bg-gradient-to-r after:from-transparent after:via-foreground/[0.04] after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
