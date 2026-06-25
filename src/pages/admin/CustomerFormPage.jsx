import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { CustomerForm } from '@/features/customers/components/CustomerForm'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCreateCustomer } from '@/hooks/useCustomers'
import { generateTempPassword } from '@/utils/passwordGenerator'
import { ROUTES } from '@/constants'

export function CustomerFormPage() {
  const navigate = useNavigate()
  const createCustomer = useCreateCustomer()
  const [created, setCreated] = useState(null)

  function handleSubmit(form) {
    const password = generateTempPassword()
    createCustomer.mutate(
      { ...form, password },
      { onSuccess: (customer) => setCreated({ customer, password }) },
    )
  }

  function handleDone() {
    navigate({ to: ROUTES.adminCustomerDetail(created.customer.id) })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Register Customer" description="Capture the customer's details to start a new visit." />

      <Card>
        <CardContent className="pt-6">
          <CustomerForm onSubmit={handleSubmit} isSubmitting={createCustomer.isPending} />
        </CardContent>
      </Card>

      <Dialog open={Boolean(created)} onOpenChange={(open) => !open && handleDone()}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Customer Registered</DialogTitle>
            <DialogDescription>
              Share these portal login details with {created?.customer.fullName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 rounded-lg border bg-muted/40 p-4 text-sm">
            <p>
              <span className="text-muted-foreground">Customer ID:</span>{' '}
              <span className="font-semibold">{created?.customer.customerId}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span> {created?.customer.email}
            </p>
            <p>
              <span className="text-muted-foreground">Temporary Password:</span>{' '}
              <span className="font-semibold">{created?.password}</span>
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleDone} className="h-11 w-full">
              Continue to Customer Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
