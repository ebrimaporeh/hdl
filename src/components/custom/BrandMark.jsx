import { Microscope } from 'lucide-react'
import { cn } from '@/utils/cn'
import { APP_SETTINGS } from '@/settings'

const SIZES = {
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4', text: 'text-sm' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-lg' },
  lg: { box: 'h-14 w-14', icon: 'h-7 w-7', text: 'text-2xl' },
}

export function BrandMark({ size = 'md', withText = true, className }) {
  const s = SIZES[size]
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-sm ring-1 ring-inset ring-white/15',
          s.box,
        )}
      >
        <Microscope className={s.icon} />
      </span>
      {withText && (
        <span className={cn('font-extrabold leading-tight tracking-tight text-foreground', s.text)}>
          {APP_SETTINGS.branding.shortName}
        </span>
      )}
    </div>
  )
}
