import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import { TEST_REQUEST_STATUS_LABELS, REPORT_STATUS_LABELS } from '@/constants'

/** Map each domain status to a semantic badge variant + dot colour. */
const STATUS_CONFIG = {
  pending: { variant: 'muted', dot: 'bg-muted-foreground' },
  in_progress: { variant: 'warning', dot: 'bg-warning' },
  completed: { variant: 'success', dot: 'bg-success' },
  draft: { variant: 'warning', dot: 'bg-warning' },
  final: { variant: 'success', dot: 'bg-success' },
}

const LABELS = { ...TEST_REQUEST_STATUS_LABELS, ...REPORT_STATUS_LABELS }

export function StatusBadge({ status, className, withDot = true }) {
  const config = STATUS_CONFIG[status] ?? { variant: 'muted', dot: 'bg-muted-foreground' }

  return (
    <Badge variant={config.variant} className={cn('whitespace-nowrap', className)}>
      {withDot && <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />}
      {LABELS[status] ?? status}
    </Badge>
  )
}
