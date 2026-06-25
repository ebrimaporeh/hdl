import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { SearchInput } from '@/components/custom/SearchInput'
import { DataTable } from '@/components/custom/DataTable'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTestRequests } from '@/hooks/useTestRequests'
import { formatDateTime } from '@/utils/formatters'
import { TEST_REQUEST_STATUS, ROUTES } from '@/constants'

const TABS = [
  { value: 'all', label: 'All' },
  { value: TEST_REQUEST_STATUS.PENDING, label: 'Pending' },
  { value: TEST_REQUEST_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TEST_REQUEST_STATUS.COMPLETED, label: 'Completed' },
]

const COLUMNS = [
  { key: 'customer', header: 'Customer', render: (tr) => tr.customer?.fullName },
  { key: 'testType', header: 'Test', render: (tr) => tr.testType?.name },
  { key: 'status', header: 'Status', render: (tr) => <StatusBadge status={tr.status} /> },
  { key: 'updatedAt', header: 'Updated', render: (tr) => formatDateTime(tr.updatedAt) },
]

export function WorklistPage() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { data: testRequests, isLoading } = useTestRequests({
    status: tab === 'all' ? undefined : tab,
    search,
  })

  return (
    <div>
      <PageHeader title="Worklist" description="Pending and in-progress test requests across all customers." />

      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by customer or test name…"
        className="mb-4 max-w-md"
      />

      <DataTable
        columns={COLUMNS}
        rows={testRequests}
        isLoading={isLoading}
        emptyTitle="No test requests"
        emptyDescription="Try a different filter or create a new order."
        onRowClick={(tr) =>
          navigate({
            to: tr.report ? ROUTES.adminReportDetail(tr.report.id) : ROUTES.adminTestRequestDetail(tr.id),
          })
        }
      />
    </div>
  )
}
