import { Outlet, Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useCustomerMe, useCustomerLogout } from '@/hooks/useCustomerAuth'
import { ROUTES } from '@/constants'
import { initials } from '@/utils/formatters'

export function CustomerPortalLayout() {
  const { data: customer } = useCustomerMe()
  const logout = useCustomerLogout()

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-30 border-b bg-surface/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to={ROUTES.PORTAL_REPORTS} className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-tight">{customer?.fullName}</p>
              <p className="text-xs leading-tight text-muted-foreground">{customer?.customerId}</p>
            </div>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                {initials(customer?.fullName)}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon-sm" onClick={() => logout.mutate()} aria-label="Sign out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
