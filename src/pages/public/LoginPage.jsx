// src/pages/public/LoginPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, UserRound, Sparkles } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCustomerLogin } from '@/hooks/useCustomerAuth'
import { useStaffLogin } from '@/hooks/useStaffAuth'
import { customers, DEMO_CUSTOMER_PASSWORD } from '@/data/customers'
import { staff, DEMO_STAFF_PASSWORD } from '@/data/staff'
import { cn } from '@/utils/cn'

// Demo user data with credentials
const DEMO_USERS = {
  customer: {
    ...customers[0],
    password: DEMO_CUSTOMER_PASSWORD,
    label: 'Customer'
  },
  staff: {
    ...staff[0],
    password: DEMO_STAFF_PASSWORD,
    label: 'Staff'
  }
}

export function LoginPage() {
  const [activeUserType, setActiveUserType] = useState(null) // 'customer' | 'staff' | null
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAutoLogging, setIsAutoLogging] = useState(false)
  
  const customerLogin = useCustomerLogin()
  const staffLogin = useStaffLogin()

  const isPending = customerLogin.isPending || staffLogin.isPending
  const isError = customerLogin.isError || staffLogin.isError
  const error = customerLogin.error || staffLogin.error

  // Auto-login with demo credentials
  const handleDemoLogin = (type) => {
    if (isAutoLogging) return
    
    const demoUser = DEMO_USERS[type]
    if (!demoUser) return

    setActiveUserType(type)
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setIsAutoLogging(true)

    // Small delay to let state update
    setTimeout(() => {
      if (type === 'customer') {
        customerLogin.mutate(
          { email: demoUser.email, password: demoUser.password },
          {
            onSettled: () => setIsAutoLogging(false)
          }
        )
      } else {
        staffLogin.mutate(
          { email: demoUser.email, password: demoUser.password },
          {
            onSettled: () => setIsAutoLogging(false)
          }
        )
      }
    }, 150)
  }

  // Manual form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!activeUserType) return
    
    if (activeUserType === 'customer') {
      customerLogin.mutate({ email, password })
    } else {
      staffLogin.mutate({ email, password })
    }
  }

  // Select user type and show their credentials
  const selectUserType = (type) => {
    setActiveUserType(type)
    const demoUser = DEMO_USERS[type]
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setIsAutoLogging(false)
    
    // Reset any previous errors
    if (customerLogin.reset) customerLogin.reset()
    if (staffLogin.reset) staffLogin.reset()
  }

  const currentDemoUser = activeUserType ? DEMO_USERS[activeUserType] : null

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          {/* Left column - Role selection */}
          <div className="space-y-6">
            <BrandMark size="lg" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
              <p className="mt-1 text-sm text-muted-foreground">Select a role to login with demo credentials.</p>
            </div>
            <div className="space-y-3">
              <LoginTypeCard
                icon={Stethoscope}
                title="Staff"
                description="Admin & lab portal"
                active={activeUserType === 'staff'}
                onClick={() => selectUserType('staff')}
                onDemoClick={() => handleDemoLogin('staff')}
                isLoggingIn={isAutoLogging && activeUserType === 'staff'}
              />
              <LoginTypeCard
                icon={UserRound}
                title="Customer"
                description="View your reports"
                active={activeUserType === 'customer'}
                onClick={() => selectUserType('customer')}
                onDemoClick={() => handleDemoLogin('customer')}
                isLoggingIn={isAutoLogging && activeUserType === 'customer'}
              />
            </div>
          </div>

          {/* Right column - Login form */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle>
                  {activeUserType === 'staff' ? 'Staff Login' : 
                   activeUserType === 'customer' ? 'Customer Portal' : 
                   'Select a role to get started'}
                </CardTitle>
                <CardDescription>
                  {activeUserType === 'staff' ? 'Demo credentials loaded for quick access' : 
                   activeUserType === 'customer' ? 'Demo credentials loaded for quick access' : 
                   'Click a role above to load demo credentials'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isError && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {error?.message || 'Login failed. Please try again.'}
                    </div>
                  )}

                  {isAutoLogging && (
                    <div className="rounded-md bg-primary/10 p-3 text-sm text-primary">
                      <Sparkles className="inline h-4 w-4 mr-1 animate-pulse" />
                      Logging in with demo account...
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="h-12"
                      disabled={isAutoLogging}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12"
                      disabled={isAutoLogging}
                      placeholder="Enter your password"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 w-full" 
                    disabled={isPending || isAutoLogging || !activeUserType}
                  >
                    {isPending || isAutoLogging ? 'Signing in…' : 'Sign in'}
                  </Button>

                  {currentDemoUser && (
                    <div className="rounded-md bg-muted p-3 text-center text-xs space-y-1">
                      <p className="font-medium text-foreground">Demo Account Loaded</p>
                      <p>
                        <span className="font-medium text-muted-foreground">Email:</span>{' '}
                        <span className="font-mono">{currentDemoUser.email}</span>
                      </p>
                      <p>
                        <span className="font-medium text-muted-foreground">Password:</span>{' '}
                        <span className="font-mono">{currentDemoUser.password}</span>
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <p className="text-[10px] text-muted-foreground">
                          Click the ✨ button or the role card to auto-login
                        </p>
                      </div>
                    </div>
                  )}

                  {!activeUserType && (
                    <p className="text-center text-xs text-muted-foreground">
                      Select a role above to load demo credentials
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Login Type Card Component
function LoginTypeCard({ icon: Icon, title, description, active, onClick, onDemoClick, isLoggingIn }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
          active
            ? 'border-primary bg-accent shadow-sm'
            : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40',
        )}
      >
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
            active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold tracking-tight">{title}</span>
          <span className="block text-xs text-muted-foreground">{description}</span>
        </span>
        {isLoggingIn && (
          <Sparkles className="h-4 w-4 animate-pulse text-primary" />
        )}
      </button>
      
      {/* Demo login button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDemoClick()
        }}
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all',
          'hover:bg-primary/10 hover:text-primary',
          active ? 'opacity-100 text-primary' : 'opacity-0 hover:opacity-100 focus:opacity-100'
        )}
        title={`Auto-login as ${title}`}
        disabled={isLoggingIn}
      >
        <Sparkles className={cn('h-4 w-4', isLoggingIn && 'animate-pulse')} />
      </button>
    </div>
  )
}