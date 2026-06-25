import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { SearchInput } from '@/components/custom/SearchInput'
import { DataTable } from '@/components/custom/DataTable'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useReports } from '@/hooks/useReports'
import { formatDate } from '@/utils/formatters'
import { REPORT_STATUS, ROUTES } from '@/constants'

const TABS = [
  { value: 'all', label: 'All' },
  { value: REPORT_STATUS.DRAFT, label: 'Draft' },
  { value: REPORT_STATUS.FINAL, label: 'Final' },
]

const COLUMNS = [
  { key: 'reportNumber', header: 'Report No.', render: (r) => <span className="font-medium">{r.reportNumber}</span> },
  { key: 'customer', header: 'Customer', render: (r) => r.testRequest?.customer?.fullName },
  { key: 'testType', header: 'Test', render: (r) => r.testRequest?.testType?.name },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'generatedAt', header: 'Generated', render: (r) => formatDate(r.generatedAt) },
]

export function ReportsPage() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { data: reports, isLoading } = useReports({ status: tab === 'all' ? undefined : tab, search })

  return (
    <div>
      <PageHeader title="Reports" description="Generated reports across all customers." />

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
        placeholder="Search by customer, test, or report number…"
        className="mb-4 max-w-md"
      />

      <DataTable
        columns={COLUMNS}
        rows={reports}
        isLoading={isLoading}
        emptyTitle="No reports found"
        emptyDescription="Reports appear here once a test request is marked complete."
        onRowClick={(r) => navigate({ to: ROUTES.adminReportDetail(r.id) })}
      />
    </div>
  )
}
