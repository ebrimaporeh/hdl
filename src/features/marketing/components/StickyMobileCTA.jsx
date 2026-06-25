import { Link } from '@tanstack/react-router'
import { FileSearch, Phone } from 'lucide-react'
import { ROUTES } from '@/constants'
import { APP_SETTINGS } from '@/settings'

export function StickyMobileCTA() {
  const phone = APP_SETTINGS.branding.phones[0]

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t bg-card/95 p-3 backdrop-blur md:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <Link
        to={ROUTES.HOME}
        hash="send-reports"
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground"
      >
        <FileSearch className="h-4 w-4" />
        Get My Reports
      </Link>
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border bg-background text-sm font-medium"
      >
        <Phone className="h-4 w-4" />
        Call Us
      </a>
    </div>
  )
}
