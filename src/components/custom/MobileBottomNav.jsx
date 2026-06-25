import { Link, useLocation } from '@tanstack/react-router'
import { cn } from '@/utils/cn'

export function MobileBottomNav({ items, className }) {
  const { pathname } = useLocation()

  return (
    <nav
      className={cn(
        'no-print fixed inset-x-0 bottom-0 z-40 flex border-t bg-card/95 backdrop-blur md:hidden',
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
              'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
