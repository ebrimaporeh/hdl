import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Printer, CheckCircle2, RotateCcw } from 'lucide-react'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { ConfirmDialog } from '@/components/custom/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { ReportPreview } from '@/features/reports/components/ReportPreview'
import { useReport, useFinalizeReport, useReopenReport } from '@/hooks/useReports'
import { REPORT_STATUS, ROUTES } from '@/constants'

export function ReportDetailPage() {
  const { reportId: id } = useParams({ strict: false })
  const navigate = useNavigate()
  const { data: report, isLoading } = useReport(id)
  const finalize = useFinalizeReport()
  const reopen = useReopenReport()
  const [reopenDialogOpen, setReopenDialogOpen] = useState(false)

  if (isLoading) return <LoadingSpinner className="py-16" />
  if (!report) return <EmptyState title="Report not found" />

  function handleReopen() {
    reopen.mutate(report.id, {
      onSuccess: () => {
        setReopenDialogOpen(false)
        navigate({ to: ROUTES.adminTestRequestDetail(report.testRequestId) })
      },
    })
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print mb-4 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" className="h-11 gap-2" onClick={() => window.print()}>
          <Printer className="h-4 w-4" />
          Print / Download
        </Button>
        {report.status === REPORT_STATUS.DRAFT ? (
          <Button className="h-11 gap-2" disabled={finalize.isPending} onClick={() => finalize.mutate(report.id)}>
            <CheckCircle2 className="h-4 w-4" />
            {finalize.isPending ? 'Finalizing…' : 'Finalize Report'}
          </Button>
        ) : (
          <Button variant="outline" className="h-11 gap-2" onClick={() => setReopenDialogOpen(true)}>
            <RotateCcw className="h-4 w-4" />
            Reopen &amp; Edit
          </Button>
        )}
      </div>

      <ReportPreview report={report} />

      <ConfirmDialog
        open={reopenDialogOpen}
        onOpenChange={setReopenDialogOpen}
        title="Reopen this report?"
        description="The report will move back to draft and the test request will reopen for editing."
        confirmLabel="Reopen & Edit"
        onConfirm={handleReopen}
        isLoading={reopen.isPending}
      />
    </div>
  )
}
