import { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CustomerPicker } from '@/features/orders/components/CustomerPicker'
import { TestTypeSelector } from '@/features/test-catalog/components/TestTypeSelector'
import { useCustomer } from '@/hooks/useCustomers'
import { useTestTypes } from '@/hooks/useTestTypes'
import { useCreateOrder } from '@/hooks/useOrders'
import { staffSession } from '@/utils/session'

export function NewOrderPage() {
  const search = useSearch({ strict: false })
  const preselectedId = search?.customerId
  const { data: preselectedCustomer } = useCustomer(preselectedId)

  const [customer, setCustomer] = useState(null)
  const [selectedTestIds, setSelectedTestIds] = useState([])

  useEffect(() => {
    if (preselectedCustomer) setCustomer(preselectedCustomer)
  }, [preselectedCustomer])

  const { data: testTypes, isLoading: testTypesLoading } = useTestTypes()
  const createOrder = useCreateOrder()

  function toggleTest(id) {
    setSelectedTestIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]))
  }

  function handleSubmit() {
    const session = staffSession.get()
    createOrder.mutate({ customerId: customer.id, testTypeIds: selectedTestIds, createdBy: session?.id })
  }

  const canSubmit = Boolean(customer) && selectedTestIds.length > 0

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="New Order" description="Select a customer and the tests to run for this visit." />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">1. Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerPicker selectedCustomer={customer} onSelect={setCustomer} />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">2. Select Tests</CardTitle>
        </CardHeader>
        <CardContent>
          {testTypesLoading ? (
            <LoadingSpinner className="py-8" />
          ) : (
            <TestTypeSelector testTypes={testTypes} selectedIds={selectedTestIds} onToggle={toggleTest} />
          )}
        </CardContent>
      </Card>

      <Button size="lg" className="h-12 w-full" disabled={!canSubmit || createOrder.isPending} onClick={handleSubmit}>
        {createOrder.isPending
          ? 'Creating Order…'
          : `Create Order${selectedTestIds.length ? ` (${selectedTestIds.length} test${selectedTestIds.length > 1 ? 's' : ''})` : ''}`}
      </Button>
    </div>
  )
}
