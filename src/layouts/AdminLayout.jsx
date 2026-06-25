import { Outlet, Link, useLocation } from '@tanstack/react-router'
import { LayoutDashboard, Users, ClipboardList, FileText, LogOut, Plus } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { MobileBottomNav } from '@/components/custom/MobileBottomNav'
import { Button } from '@/components/ui/button'
import { useStaffMe, useStaffLogout } from '@/hooks/useStaffAuth'
import { ROUTES } from '@/constants'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: ROUTES.ADMIN_CUSTOMERS, label: 'Customers', icon: Users },
  { to: ROUTES.ADMIN_WORKLIST, label: 'Worklist', icon: ClipboardList },
  { to: ROUTES.ADMIN_REPORTS, label: 'Reports', icon: FileText },
]

export function AdminLayout() {
  const { pathname } = useLocation()
  const { data: staff } = useStaffMe()
  const logout = useStaffLogout()

  return (
    <div className="min-h-screen bg-background md:flex md:h-screen md:overflow-hidden">
      <aside className="no-print hidden w-64 shrink-0 flex-col overflow-y-auto border-r bg-card md:flex">
        <div className="border-b p-5">
          <BrandMark />
        </div>
        <div className="p-4">
          <Button asChild className="h-11 w-full justify-start gap-2">
            <Link to={ROUTES.ADMIN_ORDER_NEW}>
              <Plus className="h-4 w-4" />
              New Order
            </Link>
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t p-4">
          <p className="truncate text-sm font-medium">{staff?.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{staff?.email}</p>
          <button
            onClick={() => logout.mutate()}
            className="mt-2 flex items-center gap-1.5 text-sm text-destructive hover:underline"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 md:h-screen md:overflow-y-auto">
        <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b bg-card/95 px-4 py-3.5 backdrop-blur md:hidden">
          <BrandMark size="sm" />
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="h-9 gap-1.5">
              <Link to={ROUTES.ADMIN_ORDER_NEW}>
                <Plus className="h-4 w-4" />
                New Order
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => logout.mutate()} aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="px-4 py-6 pb-24 sm:px-6 md:pb-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav items={NAV_ITEMS} />
    </div>
  )
}
