import { AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { CustomerLoginForm } from '@/features/auth/components/CustomerLoginForm'

export function CustomerLoginPage() {
  return (
    <AuthPageShell activeType="customer" title="Customer Portal" description="Sign in to view your lab reports">
      <CustomerLoginForm />
    </AuthPageShell>
  )
}
