import { AlertTriangle, HelpCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
  variant = 'default',
}) {
  const isDestructive = variant === 'destructive'
  const Icon = isDestructive ? AlertTriangle : HelpCircle

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex-row items-start gap-4 space-y-0 text-left">
          <span
            className={cn(
              'mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
              isDestructive ? 'bg-destructive-subtle text-destructive-emphasis' : 'bg-accent text-accent-foreground',
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div className="space-y-1.5">
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={isLoading}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
