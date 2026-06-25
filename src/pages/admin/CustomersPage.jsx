import { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/custom/PageHeader'
import { SearchInput } from '@/components/custom/SearchInput'
import { DataTable } from '@/components/custom/DataTable'
import { Button } from '@/components/ui/button'
import { useCustomers } from '@/hooks/useCustomers'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

const COLUMNS = [
  { key: 'customerId', header: 'Customer ID', render: (c) => <span className="font-medium">{c.customerId}</span> },
  { key: 'fullName', header: 'Name' },
  { key: 'phone', header: 'Phone' },
  { key: 'email', header: 'Email' },
  { key: 'gender', header: 'Gender' },
  { key: 'createdAt', header: 'Registered', render: (c) => formatDate(c.createdAt) },
]

export function CustomersPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { data: customers, isLoading } = useCustomers({ search })

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Search and manage registered customers."
        action={
          <Button asChild className="h-11 gap-2">
            <Link to={ROUTES.ADMIN_CUSTOMER_NEW}>
              <Plus className="h-4 w-4" />
              New Customer
            </Link>
          </Button>
        }
      />

      <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, phone, or customer ID…" className="mb-4 max-w-md" />

      <DataTable
        columns={COLUMNS}
        rows={customers}
        isLoading={isLoading}
        emptyTitle="No customers found"
        emptyDescription={search ? 'Try a different search term.' : 'Register your first customer to get started.'}
        onRowClick={(c) => navigate({ to: ROUTES.adminCustomerDetail(c.id) })}
      />
    </div>
  )
}
