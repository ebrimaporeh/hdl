import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import { TEST_REQUEST_STATUS_LABELS, REPORT_STATUS_LABELS } from '@/constants'

const STYLES = {
  pending: 'bg-muted text-muted-foreground border-transparent',
  in_progress: 'bg-warning/15 text-warning-foreground border-transparent',
  completed: 'bg-success/15 text-success border-transparent',
  draft: 'bg-warning/15 text-warning-foreground border-transparent',
  final: 'bg-success/15 text-success border-transparent',
}

const LABELS = { ...TEST_REQUEST_STATUS_LABELS, ...REPORT_STATUS_LABELS }

export function StatusBadge({ status, className }) {
  return (
    <Badge variant="outline" className={cn(STYLES[status], 'font-medium', className)}>
      {LABELS[status] ?? status}
    </Badge>
  )
}
