import { ReportHeader } from './ReportHeader'
import { DynamicResultForm } from '@/features/results/components/DynamicResultForm'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { formatDate, formatDateTime } from '@/utils/formatters'

export function ReportPreview({ report }) {
  const { testRequest } = report
  const { testType, customer, order } = testRequest

  return (
    <div className="rounded-lg border bg-card p-6 sm:p-8 print:border-0 print:p-0 print:shadow-none">
      <ReportHeader />

      <div className="mt-5 flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold tracking-tight">{testType.name}</h2>
        <span className="no-print">
          <StatusBadge status={report.status} />
        </span>
      </div>

      <div className="mt-4 grid gap-3 rounded-lg border bg-muted/30 p-4 text-sm sm:grid-cols-2">
        <div>
          <p className="text-muted-foreground">Patient</p>
          <p className="font-medium">{customer.fullName}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Date of Birth / Gender</p>
          <p className="font-medium">
            {formatDate(customer.dob)} &middot; {customer.gender}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Address</p>
          <p className="font-medium">{customer.address}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Report No. / Order No.</p>
          <p className="font-medium">
            {report.reportNumber} / {order.orderNumber}
          </p>
        </div>
        {testType.method && (
          <div className="sm:col-span-2">
            <p className="text-muted-foreground">Method</p>
            <p className="font-medium">{testType.method}</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <DynamicResultForm testType={testType} values={testRequest.values} readOnly gender={customer.gender} />
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Generated {formatDateTime(report.generatedAt)}</span>
        <span>Date: ………………… &nbsp;&nbsp; Signature: …………………</span>
      </div>
    </div>
  )
}
