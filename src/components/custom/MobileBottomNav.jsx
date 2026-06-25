import { Link, useLocation } from '@tanstack/react-router'
import { cn } from '@/utils/cn'

export function MobileBottomNav({ items, className }) {
  const { pathname } = useLocation()

  return (
    <nav
      className={cn(
        'no-print fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/90 backdrop-blur-lg md:hidden',
        className,
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map((item) => {
        const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to)
        const Icon = item.icon
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'group relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-2xs font-semibold transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <span
              className={cn(
                'flex h-8 w-12 items-center justify-center rounded-full transition-colors',
                isActive && 'bg-accent',
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
