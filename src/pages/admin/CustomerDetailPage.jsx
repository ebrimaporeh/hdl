import { useParams, Link } from '@tanstack/react-router'
import { Plus, Mail, Phone, MapPin, Cake } from 'lucide-react'
import { PageHeader } from '@/components/custom/PageHeader'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCustomer } from '@/hooks/useCustomers'
import { useCustomerOrders } from '@/hooks/useOrders'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

export function CustomerDetailPage() {
  const { customerId: id } = useParams({ strict: false })
  const { data: customer, isLoading: customerLoading } = useCustomer(id)
  const { data: orders, isLoading: ordersLoading } = useCustomerOrders(id)

  if (customerLoading) return <LoadingSpinner className="py-16" />
  if (!customer) return <EmptyState title="Customer not found" />

  return (
    <div>
      <PageHeader
        title={customer.fullName}
        description={customer.customerId}
        action={
          <Button asChild className="h-11 gap-2">
            <Link to={ROUTES.ADMIN_ORDER_NEW} search={{ customerId: customer.id }}>
              <Plus className="h-4 w-4" />
              New Order
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <Cake className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>
                {formatDate(customer.dob)} &middot; {customer.gender}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{customer.address}</span>
            </div>
            <p className="border-t pt-3 text-xs text-muted-foreground">
              Registered {formatDate(customer.createdAt)}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Visit History</h2>

          {ordersLoading ? (
            <LoadingSpinner className="py-12" />
          ) : !orders?.length ? (
            <EmptyState title="No orders yet" description="Create a new order to select tests for this customer." />
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-semibold">{order.orderNumber}</CardTitle>
                  <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
                </CardHeader>
                <CardContent className="divide-y pt-0">
                  {order.testRequests.map((tr) => (
                    <Link
                      key={tr.id}
                      to={
                        tr.report
                          ? ROUTES.adminReportDetail(tr.report.id)
                          : ROUTES.adminTestRequestDetail(tr.id)
                      }
                      className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                    >
                      <span className="text-sm font-medium">{tr.testType?.name}</span>
                      <StatusBadge status={tr.report ? tr.report.status : tr.status} />
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
