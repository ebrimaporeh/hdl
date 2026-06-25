import { Link } from '@tanstack/react-router'
import { Users, ClipboardList, CheckCircle2, FileText, ArrowRight, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/custom/PageHeader'
import { StatCard } from '@/components/custom/StatCard'
import { EmptyState } from '@/components/custom/EmptyState'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useCustomers } from '@/hooks/useCustomers'
import { useTestRequests } from '@/hooks/useTestRequests'
import { useReports } from '@/hooks/useReports'
import { TEST_REQUEST_STATUS } from '@/constants'
import { ROUTES } from '@/constants'

function isSameDay(a, b) {
  return new Date(a).toDateString() === new Date(b).toDateString()
}

function isSameMonth(a, b) {
  const da = new Date(a)
  const db = new Date(b)
  return da.getMonth() === db.getMonth() && da.getFullYear() === db.getFullYear()
}

export function DashboardPage() {
  const { data: customers, isLoading: customersLoading } = useCustomers()
  const { data: testRequests, isLoading: requestsLoading } = useTestRequests()
  const { data: reports, isLoading: reportsLoading } = useReports()

  const isLoading = customersLoading || requestsLoading || reportsLoading
  const now = new Date()

  const pendingCount = testRequests?.filter((tr) => tr.status !== TEST_REQUEST_STATUS.COMPLETED).length ?? 0
  const completedToday = testRequests?.filter((tr) => tr.status === TEST_REQUEST_STATUS.COMPLETED && isSameDay(tr.updatedAt, now)).length ?? 0
  const reportsThisMonth = reports?.filter((r) => isSameMonth(r.generatedAt, now)).length ?? 0

  const needsAttention = testRequests
    ?.filter((tr) => tr.status !== TEST_REQUEST_STATUS.COMPLETED)
    .slice(0, 6)

  const stats = [
    { label: 'Pending Requests', value: pendingCount, icon: ClipboardList, href: ROUTES.ADMIN_WORKLIST, tone: 'warning' },
    { label: 'Completed Today', value: completedToday, icon: CheckCircle2, href: ROUTES.ADMIN_WORKLIST, tone: 'success' },
    { label: 'Total Customers', value: customers?.length ?? 0, icon: Users, href: ROUTES.ADMIN_CUSTOMERS, tone: 'info' },
    { label: 'Reports This Month', value: reportsThisMonth, icon: FileText, href: ROUTES.ADMIN_REPORTS, tone: 'primary' },
  ]

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        eyebrow={new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)}
        title="Dashboard"
        description="Today's lab activity at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[116px] rounded-xl" />)
          : stats.map((stat) => (
              <Link
                key={stat.label}
                to={stat.href}
                className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
              >
                <StatCard label={stat.label} value={stat.value} icon={stat.icon} tone={stat.tone} asChild />
              </Link>
            ))}
      </div>

      <Card className="mt-6 lg:mt-8">
        <CardHeader className="flex-row items-center justify-between space-y-0 border-b py-4">
          <div className="space-y-0.5">
            <CardTitle className="text-base">Needs Attention</CardTitle>
            <p className="text-xs text-muted-foreground">Open test requests awaiting action</p>
          </div>
          <Link
            to={ROUTES.ADMIN_WORKLIST}
            className="inline-flex items-center gap-1 rounded-md text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            View worklist
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : !needsAttention?.length ? (
            <EmptyState
              icon={CheckCircle2}
              title="All caught up"
              description="No pending test requests right now. New orders will appear here."
            />
          ) : (
            <div className="divide-y">
              {needsAttention.map((tr) => (
                <Link
                  key={tr.id}
                  to={ROUTES.adminTestRequestDetail(tr.id)}
                  className="group flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-muted/50 sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{tr.testType?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{tr.customer?.fullName}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge status={tr.status} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
