import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'

/**
 * Compact KPI / metric card.
 *
 * @param tone  Visual accent for the icon chip: primary | success | warning | info | destructive
 */
const TONES = {
  primary: 'bg-accent text-accent-foreground',
  success: 'bg-success-subtle text-success-emphasis',
  warning: 'bg-warning-subtle text-warning-emphasis',
  info: 'bg-info-subtle text-info-emphasis',
  destructive: 'bg-destructive-subtle text-destructive-emphasis',
}

export function StatCard({ label, value, icon: Icon, tone = 'primary', hint, asChild = false, className }) {
  return (
    <Card interactive={asChild} className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-overline mb-2 truncate">{label}</p>
          <p className="text-3xl font-bold leading-none tracking-tight tabular-nums">{value}</p>
          {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {Icon && (
          <span className={cn('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', TONES[tone])}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </Card>
  )
}
