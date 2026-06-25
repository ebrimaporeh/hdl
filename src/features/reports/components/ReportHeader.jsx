import { Microscope } from 'lucide-react'
import { APP_SETTINGS } from '@/settings'

export function ReportHeader() {
  const { branding } = APP_SETTINGS
  return (
    <div className="flex items-start gap-4 border-b pb-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Microscope className="h-7 w-7" />
      </span>
      <div>
        <h1 className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">{branding.legalName}</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{branding.tagline}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {branding.address} &middot; {branding.phones.join(' / ')} &middot; {branding.email}
        </p>
      </div>
    </div>
  )
}
