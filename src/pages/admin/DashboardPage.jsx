import { Link } from '@tanstack/react-router'
import { Users, ClipboardList, CheckCircle2, FileText, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/custom/PageHeader'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    { label: 'Pending Test Requests', value: pendingCount, icon: ClipboardList, href: ROUTES.ADMIN_WORKLIST },
    { label: 'Completed Today', value: completedToday, icon: CheckCircle2, href: ROUTES.ADMIN_WORKLIST },
    { label: 'Total Customers', value: customers?.length ?? 0, icon: Users, href: ROUTES.ADMIN_CUSTOMERS },
    { label: 'Reports This Month', value: reportsThisMonth, icon: FileText, href: ROUTES.ADMIN_REPORTS },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" description="Today's lab activity at a glance." />

      {isLoading ? (
        <LoadingSpinner className="py-16" />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Link key={stat.label} to={stat.href}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <stat.icon className="h-5 w-5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Needs Attention</CardTitle>
              <Link to={ROUTES.ADMIN_WORKLIST} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Worklist
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              {!needsAttention?.length ? (
                <EmptyState title="All caught up" description="No pending test requests right now." />
              ) : (
                <div className="divide-y">
                  {needsAttention.map((tr) => (
                    <Link
                      key={tr.id}
                      to={ROUTES.adminTestRequestDetail(tr.id)}
                      className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                    >
                      <div>
                        <p className="text-sm font-medium">{tr.testType?.name}</p>
                        <p className="text-xs text-muted-foreground">{tr.customer?.fullName}</p>
                      </div>
                      <StatusBadge status={tr.status} />
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
