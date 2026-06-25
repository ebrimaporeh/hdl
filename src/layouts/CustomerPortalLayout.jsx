import { Outlet, Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { Button } from '@/components/ui/button'
import { useCustomerMe, useCustomerLogout } from '@/hooks/useCustomerAuth'
import { ROUTES } from '@/constants'

export function CustomerPortalLayout() {
  const { data: customer } = useCustomerMe()
  const logout = useCustomerLogout()

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-30 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to={ROUTES.PORTAL_REPORTS}>
            <BrandMark />
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight">{customer?.fullName}</p>
              <p className="text-xs leading-tight text-muted-foreground">{customer?.customerId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => logout.mutate()} aria-label="Sign out">
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
