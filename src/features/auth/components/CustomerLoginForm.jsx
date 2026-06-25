import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCustomerLogin } from '@/hooks/useCustomerAuth'
import { DEMO_CUSTOMER_PASSWORD } from '@/data/customers'

export function CustomerLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useCustomerLogin()

  function handleSubmit(e) {
    e.preventDefault()
    login.mutate({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {login.isError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {login.error?.message || 'Login failed. Please try again.'}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="customer-email">Email</Label>
        <Input
          id="customer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@gmail.com"
          required
          className="h-12"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="customer-password">Password</Label>
        <Input
          id="customer-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12"
        />
      </div>

      <Button type="submit" size="lg" className="h-12 w-full" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="rounded-md bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
        Demo: <span className="font-medium">fatou.jallow@gmail.com</span> / {DEMO_CUSTOMER_PASSWORD}
      </p>
    </form>
  )
}
