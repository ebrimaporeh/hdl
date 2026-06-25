import { Link } from '@tanstack/react-router'
import { FileText, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

export function PortalReportCard({ report }) {
  const { testRequest } = report
  return (
    <Link
      to={ROUTES.portalReportDetail(report.id)}
      className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
    >
      <Card interactive>
        <CardContent className="flex items-center gap-4 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{testRequest.testType?.name}</p>
            <p className="text-sm text-muted-foreground">
              {report.reportNumber} &middot; {formatDate(report.generatedAt)}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
