import { useState } from 'react'
import { PageHeader } from '@/components/custom/PageHeader'
import { SearchInput } from '@/components/custom/SearchInput'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { PortalReportCard } from '@/features/portal/components/PortalReportCard'
import { useCustomerMe } from '@/hooks/useCustomerAuth'
import { useCustomerReports } from '@/hooks/useReports'
import { REPORT_STATUS } from '@/constants'

export function MyReportsPage() {
  const [search, setSearch] = useState('')
  const { data: customer } = useCustomerMe()
  const { data: reports, isLoading } = useCustomerReports(customer?.id, {
    status: REPORT_STATUS.FINAL,
    search,
  })

  return (
    <div>
      <PageHeader title="My Reports" description="View, search, and download your lab reports." />

      <SearchInput value={search} onChange={setSearch} placeholder="Search your reports…" className="mb-4" />

      {isLoading ? (
        <LoadingSpinner className="py-16" />
      ) : !reports?.length ? (
        <EmptyState
          title="No reports yet"
          description={search ? 'Try a different search term.' : 'Your reports will appear here once they are ready.'}
        />
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <PortalReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
