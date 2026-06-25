import { Outlet, Link, useLocation } from '@tanstack/react-router'
import { Home, FlaskConical, Info, Phone, LogIn, MapPin, Mail } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { MobileBottomNav } from '@/components/custom/MobileBottomNav'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { APP_SETTINGS } from '@/settings'

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.SERVICES, label: 'Services' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.CONTACT, label: 'Contact' },
]

const MOBILE_NAV_ITEMS = [
  { to: ROUTES.HOME, label: 'Home', icon: Home, exact: true },
  { to: ROUTES.SERVICES, label: 'Services', icon: FlaskConical },
  { to: ROUTES.ABOUT, label: 'About', icon: Info },
  { to: ROUTES.CONTACT, label: 'Contact', icon: Phone },
  { to: ROUTES.CUSTOMER_LOGIN, label: 'Login', icon: LogIn },
]

export function PublicLayout() {
  const { pathname } = useLocation()
  const { branding } = APP_SETTINGS

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="no-print sticky top-0 z-30 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to={ROUTES.HOME}>
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.to ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link to={ROUTES.STAFF_LOGIN}>Staff Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={ROUTES.CUSTOMER_LOGIN}>Customer Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <footer className="no-print border-t bg-card pb-20 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <BrandMark />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{branding.tagline}</p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide">Quick Links</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide">Account</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to={ROUTES.CUSTOMER_LOGIN} className="text-muted-foreground hover:text-foreground">
                    Customer Portal
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.STAFF_LOGIN} className="text-muted-foreground hover:text-foreground">
                    Staff Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide">Get in Touch</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{branding.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{branding.phones.join(' / ')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{branding.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t pt-6 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {branding.legalName}. All rights reserved.
          </div>
        </div>
      </footer>

      <MobileBottomNav items={MOBILE_NAV_ITEMS} />
    </div>
  )
}
