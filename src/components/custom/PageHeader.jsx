import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Standard page header used across admin/portal pages.
 *
 * @param breadcrumbs  Array of { label, to? } — last item rendered as current.
 * @param eyebrow      Small overline above the title (optional).
 * @param action       Right-aligned actions (buttons, etc).
 */
export function PageHeader({ title, description, action, breadcrumbs, eyebrow, className }) {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      {breadcrumbs?.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {eyebrow && <p className="text-eyebrow mb-1.5">{eyebrow}</p>}
          <h1 className="text-h1 truncate">{title}</h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>
    </div>
  )
}

export function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-3', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.to && !isLast ? (
                <Link to={item.to} className="rounded transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && 'text-foreground')} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
