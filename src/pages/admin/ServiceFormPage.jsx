import { useParams, useNavigate } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { ServiceForm } from '@/features/test-catalog/components/ServiceForm'
import { useTestType, useCreateTestType, useUpdateTestType } from '@/hooks/useTestTypes'
import { ROUTES } from '@/constants'

export function ServiceFormPage() {
  const { serviceId } = useParams({ strict: false })
  const isEdit = Boolean(serviceId)
  const navigate = useNavigate()

  const { data: service, isLoading } = useTestType(serviceId)
  const createService = useCreateTestType()
  const updateService = useUpdateTestType()

  function handleSubmit(data) {
    if (isEdit) {
      updateService.mutate(
        { id: serviceId, data },
        { onSuccess: () => navigate({ to: ROUTES.ADMIN_SERVICES }) },
      )
    } else {
      createService.mutate(data, { onSuccess: () => navigate({ to: ROUTES.ADMIN_SERVICES }) })
    }
  }

  if (isEdit && isLoading) return <LoadingSpinner className="py-16" />
  if (isEdit && !isLoading && !service) {
    return (
      <EmptyState
        title="Service not found"
        action={
          <Button onClick={() => navigate({ to: ROUTES.ADMIN_SERVICES })}>Back to services</Button>
        }
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        breadcrumbs={[{ label: 'Services', to: ROUTES.ADMIN_SERVICES }, { label: isEdit ? 'Edit' : 'New' }]}
        title={isEdit ? `Edit ${service?.name ?? 'service'}` : 'New Service'}
        description={
          isEdit
            ? 'Update the details shown on the public services pages.'
            : 'Add a new test to the catalogue. The result-entry template can be configured later.'
        }
      />

      <Card>
        <CardContent className="pt-6">
          <ServiceForm
            testType={service}
            onSubmit={handleSubmit}
            isSubmitting={createService.isPending || updateService.isPending}
            submitLabel={isEdit ? 'Save changes' : 'Create service'}
          />
        </CardContent>
      </Card>
    </div>
  )
}
