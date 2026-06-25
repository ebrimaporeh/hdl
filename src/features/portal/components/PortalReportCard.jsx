import { Link } from '@tanstack/react-router'
import { FileText, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

export function PortalReportCard({ report }) {
  const { testRequest } = report
  return (
    <Link to={ROUTES.portalReportDetail(report.id)}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{testRequest.testType?.name}</p>
            <p className="text-sm text-muted-foreground">
              {report.reportNumber} &middot; {formatDate(report.generatedAt)}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
