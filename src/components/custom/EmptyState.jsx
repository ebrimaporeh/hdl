import { Inbox } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Empty / zero-data placeholder.
 * @param icon  A lucide icon component (defaults to Inbox).
 */
export function EmptyState({ title = 'No results', description, action, icon: Icon = Inbox, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground ring-8 ring-muted/40">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-base font-semibold text-foreground">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
