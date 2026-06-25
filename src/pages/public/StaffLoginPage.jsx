import { AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { StaffLoginForm } from '@/features/auth/components/StaffLoginForm'

export function StaffLoginPage() {
  return (
    <AuthPageShell activeType="staff" title="Staff Login" description="Sign in to the admin portal">
      <StaffLoginForm />
    </AuthPageShell>
  )
}
