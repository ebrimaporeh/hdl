import { Link } from '@tanstack/react-router'
import { cn } from '@/utils/cn'

export function LoginTypeCard({ to, icon: Icon, title, description, active }) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
        active
          ? 'border-primary bg-accent shadow-sm'
          : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40',
      )}
    >
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
          active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold tracking-tight">{title}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
    </Link>
  )
}
