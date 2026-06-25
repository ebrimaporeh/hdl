import { useParams, Link } from '@tanstack/react-router'
import { ArrowLeft, Download } from 'lucide-react'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { Button } from '@/components/ui/button'
import { ReportPreview } from '@/features/reports/components/ReportPreview'
import { useReport } from '@/hooks/useReports'
import { ROUTES } from '@/constants'

export function PortalReportDetailPage() {
  const { reportId: id } = useParams({ strict: false })
  const { data: report, isLoading } = useReport(id)

  if (isLoading) return <LoadingSpinner className="py-16" />
  if (!report) return <EmptyState title="Report not found" />

  return (
    <div>
      <div className="no-print mb-4 flex items-center justify-between">
        <Link
          to={ROUTES.PORTAL_REPORTS}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          My Reports
        </Link>
        <Button className="h-11 gap-2" onClick={() => window.print()}>
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      <ReportPreview report={report} />
    </div>
  )
}
