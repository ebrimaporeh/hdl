import { Outlet, Link, useLocation } from '@tanstack/react-router'
import { Home, FlaskConical, Info, Phone, LogIn, MapPin, Mail, Clock, Shield, BookOpen } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { MobileBottomNav } from '@/components/custom/MobileBottomNav'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { APP_SETTINGS } from '@/settings'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.SERVICES, label: 'Services' },
  { to: ROUTES.BLOG, label: 'Blog' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.CONTACT, label: 'Contact' },
]

const MOBILE_NAV_ITEMS = [
  { to: ROUTES.HOME, label: 'Home', icon: Home, exact: true },
  { to: ROUTES.SERVICES, label: 'Services', icon: FlaskConical },
  { to: ROUTES.BLOG, label: 'Blog', icon: BookOpen },
  { to: ROUTES.ABOUT, label: 'About', icon: Info },
  { to: ROUTES.CONTACT, label: 'Contact', icon: Phone },
  { to: ROUTES.LOGIN, label: 'Login', icon: LogIn },
]

// Footer link groups
const FOOTER_LINKS = {
  quickLinks: NAV_LINKS,
}

export function PublicLayout() {
  const { pathname } = useLocation()
  const { branding } = APP_SETTINGS

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="no-print sticky top-0 z-30 border-b bg-surface/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to={ROUTES.HOME} className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link to={ROUTES.LOGIN}>Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={ROUTES.SERVICES}>Our Services</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <footer className="no-print border-t bg-gradient-to-b from-card to-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {/* Main footer grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-10">
            {/* Brand - spans full width on mobile */}
            <div className="col-span-2 md:col-span-1">
              <BrandMark />
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {branding.tagline}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>Trusted since 2024</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Links
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {FOOTER_LINKS.quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact - spans full width on mobile */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contact Us
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs leading-relaxed">{branding.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">{branding.phones.join(' / ')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">{branding.email}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">Mon-Fri: 8:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer bottom bar with improved design */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {branding.legalName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to={ROUTES.PRIVACY} className="hover:text-foreground hover:underline underline-offset-2">
                Privacy Policy
              </Link>
              <span className="text-border">|</span>
              <Link to={ROUTES.TERMS} className="hover:text-foreground hover:underline underline-offset-2">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomNav items={MOBILE_NAV_ITEMS} />
    </div>
  )
}