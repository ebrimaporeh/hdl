import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { StatusBadge } from '@/components/custom/StatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DynamicResultForm } from '@/features/results/components/DynamicResultForm'
import { useTestRequest, useSaveResultProgress, useCompleteTestRequest } from '@/hooks/useTestRequests'
import { formatDate } from '@/utils/formatters'
import { TEST_REQUEST_STATUS, ROUTES } from '@/constants'

export function ResultEntryPage() {
  const { testRequestId: id } = useParams({ strict: false })
  const navigate = useNavigate()
  const { data: testRequest, isLoading } = useTestRequest(id)
  const saveProgress = useSaveResultProgress()
  const markComplete = useCompleteTestRequest()

  const [values, setValues] = useState({})

  useEffect(() => {
    if (testRequest) setValues(testRequest.values ?? {})
  }, [testRequest])

  if (isLoading) return <LoadingSpinner className="py-16" />
  if (!testRequest) return <EmptyState title="Test request not found" />

  if (testRequest.status === TEST_REQUEST_STATUS.COMPLETED && testRequest.report) {
    return (
      <EmptyState
        title="This test has already been completed"
        description="Open the report to view results, or reopen it to make changes."
        action={
          <Button asChild>
            <Link to={ROUTES.adminReportDetail(testRequest.report.id)}>View Report</Link>
          </Button>
        }
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={testRequest.testType?.name}
        description={`${testRequest.order?.orderNumber} · ${testRequest.testType?.sampleType}`}
        action={<StatusBadge status={testRequest.status} />}
      />

      <Card className="mb-6">
        <CardContent className="grid gap-3 pt-6 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Patient</p>
            <p className="font-medium">{testRequest.customer?.fullName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date of Birth / Gender</p>
            <p className="font-medium">
              {formatDate(testRequest.customer?.dob)} &middot; {testRequest.customer?.gender}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium">{testRequest.customer?.address}</p>
          </div>
          {testRequest.testType?.method && (
            <div>
              <p className="text-muted-foreground">Method</p>
              <p className="font-medium">{testRequest.testType.method}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <DynamicResultForm
        testType={testRequest.testType}
        values={values}
        onChange={setValues}
        gender={testRequest.customer?.gender}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          size="lg"
          className="h-12 flex-1"
          disabled={saveProgress.isPending}
          onClick={() => saveProgress.mutate({ id, values })}
        >
          {saveProgress.isPending ? 'Saving…' : 'Save Progress'}
        </Button>
        <Button
          size="lg"
          className="h-12 flex-1"
          disabled={markComplete.isPending}
          onClick={() =>
            markComplete.mutate(
              { id, values },
              { onSuccess: (result) => navigate({ to: ROUTES.adminReportDetail(result.report.id) }) },
            )
          }
        >
          {markComplete.isPending ? 'Completing…' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  )
}
