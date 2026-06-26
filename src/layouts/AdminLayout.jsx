import { Outlet, Link, useLocation } from '@tanstack/react-router'
import { LayoutDashboard, Users, ClipboardList, FileText, FlaskConical, Newspaper, LogOut, Plus, ChevronsUpDown } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { MobileBottomNav } from '@/components/custom/MobileBottomNav'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useStaffMe, useStaffLogout } from '@/hooks/useStaffAuth'
import { ROUTES } from '@/constants'
import { initials } from '@/utils/formatters'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: ROUTES.ADMIN_CUSTOMERS, label: 'Customers', icon: Users },
  { to: ROUTES.ADMIN_WORKLIST, label: 'Worklist', icon: ClipboardList },
  { to: ROUTES.ADMIN_REPORTS, label: 'Reports', icon: FileText },
  { to: ROUTES.ADMIN_SERVICES, label: 'Services', icon: FlaskConical },
  { to: ROUTES.ADMIN_BLOG, label: 'Blog', icon: Newspaper },
]

export function AdminLayout() {
  const { pathname } = useLocation()
  const { data: staff } = useStaffMe()
  const logout = useStaffLogout()

  return (
    <div className="min-h-screen bg-background md:flex md:h-screen md:overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="no-print hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <BrandMark />
        </div>

        <div className="p-3">
          <Button asChild className="h-10 w-full justify-center gap-2 shadow-sm">
            <Link to={ROUTES.ADMIN_ORDER_NEW}>
              <Plus className="h-4 w-4" />
              New Order
            </Link>
          </Button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          <p className="px-3 pb-2 pt-1 text-2xs font-semibold uppercase tracking-wider text-sidebar-muted">
            Workspace
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-muted hover:bg-muted hover:text-sidebar-foreground',
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : 'text-current')} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User menu */}
        <div className="border-t border-sidebar-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                  {initials(staff?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">{staff?.fullName}</p>
                <p className="truncate text-xs text-sidebar-muted">{staff?.email}</p>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-sidebar-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-semibold">{staff?.fullName}</p>
                <p className="text-xs font-normal text-muted-foreground">{staff?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => logout.mutate()}
                className="text-destructive focus:bg-destructive-subtle focus:text-destructive-emphasis"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Content column */}
      <div className="flex-1 md:h-screen md:overflow-y-auto">
        {/* Mobile top bar */}
        <header className="no-print sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-surface/90 px-4 backdrop-blur-lg md:hidden">
          <BrandMark size="sm" />
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="h-9 gap-1.5">
              <Link to={ROUTES.ADMIN_ORDER_NEW}>
                <Plus className="h-4 w-4" />
                New Order
              </Link>
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => logout.mutate()} aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 sm:px-6 md:pb-10 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav items={NAV_ITEMS} />
    </div>
  )
}
