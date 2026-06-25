// src/pages/public/LoginPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, UserRound, Sparkles, AlertCircle, ShieldCheck, Clock, FileCheck2, ArrowRight } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCustomerLogin } from '@/hooks/useCustomerAuth'
import { useStaffLogin } from '@/hooks/useStaffAuth'
import { customers, DEMO_CUSTOMER_PASSWORD } from '@/data/customers'
import { staff, DEMO_STAFF_PASSWORD } from '@/data/staff'
import { MEDIA, img } from '@/features/marketing/constants/media'
import { cn } from '@/utils/cn'

// Demo user data with credentials
const DEMO_USERS = {
  customer: {
    ...customers[0],
    password: DEMO_CUSTOMER_PASSWORD,
    label: 'Customer',
  },
  staff: {
    ...staff[0],
    password: DEMO_STAFF_PASSWORD,
    label: 'Staff',
  },
}

const ROLES = [
  { key: 'staff', icon: Stethoscope, title: 'Staff', description: 'Admin & lab portal' },
  { key: 'customer', icon: UserRound, title: 'Customer', description: 'View your reports' },
]

const PANEL_POINTS = [
  { icon: ShieldCheck, label: 'Secure access to your reports' },
  { icon: FileCheck2, label: 'Results reviewed by experts' },
  { icon: Clock, label: 'Same-day turnaround' },
]

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

    setTimeout(() => {
      if (type === 'customer') {
        customerLogin.mutate(
          { email: demoUser.email, password: demoUser.password },
          { onSettled: () => setIsAutoLogging(false) },
        )
      } else {
        staffLogin.mutate(
          { email: demoUser.email, password: demoUser.password },
          { onSettled: () => setIsAutoLogging(false) },
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

  // Select user type and load their demo credentials
  const selectUserType = (type) => {
    setActiveUserType(type)
    const demoUser = DEMO_USERS[type]
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setIsAutoLogging(false)

    if (customerLogin.reset) customerLogin.reset()
    if (staffLogin.reset) staffLogin.reset()
  }

  const currentDemoUser = activeUserType ? DEMO_USERS[activeUserType] : null

  return (
    <div className="px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* ── Brand visual panel ─────────────────────────────── */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-secondary p-10 text-secondary-foreground lg:flex">
            <img
              src={img(MEDIA.technician.id, { w: 900, h: 1200, q: 60 })}
              alt={MEDIA.technician.alt}
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              loading="eager"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_90%_0%,hsl(var(--primary)/0.35),transparent)]"
            />

            <div className="relative">
              <BrandMark size="md" className="[&_span:last-child]:text-white" />
            </div>

            <div className="relative">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                Welcome back to your diagnostics portal.
              </h2>
              <p className="mt-3 max-w-sm leading-relaxed text-secondary-foreground/80">
                Sign in to access your lab reports, manage orders, and review results — all in one secure place.
              </p>
              <ul className="mt-8 space-y-3">
                {PANEL_POINTS.map((point) => (
                  <li key={point.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-inset ring-white/15">
                      <point.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{point.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="relative text-xs text-secondary-foreground/60">
              Healthscreen Diagnostic Lab — Kotu Manjai Highway, KMC, Gambia
            </p>
          </div>

          {/* ── Form panel ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-10"
          >
            <div className="lg:hidden">
              <BrandMark size="md" />
            </div>

            <div className="mt-6 lg:mt-0">
              <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose your role to continue — demo credentials are loaded for you.
              </p>
            </div>

            {/* Role selector */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const active = activeUserType === role.key
                return (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => selectUserType(role.key)}
                    aria-pressed={active}
                    className={cn(
                      'flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                      active
                        ? 'border-primary bg-accent shadow-sm'
                        : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <role.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold tracking-tight">{role.title}</span>
                      <span className="block text-xs text-muted-foreground">{role.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {isError && (
                <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive-subtle p-3 text-sm font-medium text-destructive-emphasis">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error?.message || 'Login failed. Please try again.'}</span>
                </div>
              )}

              {isAutoLogging && (
                <div className="flex items-center gap-2 rounded-lg border border-info/30 bg-info-subtle p-3 text-sm font-medium text-info-emphasis">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Logging in with demo account…
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
                loading={isPending || isAutoLogging}
                disabled={!activeUserType}
              >
                {isPending || isAutoLogging ? 'Signing in…' : 'Sign in'}
              </Button>

              {currentDemoUser ? (
                <div className="rounded-lg border bg-muted/50 p-3 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">Demo account loaded</p>
                    <button
                      type="button"
                      onClick={() => handleDemoLogin(activeUserType)}
                      disabled={isAutoLogging}
                      className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary-hover disabled:opacity-60"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Instant login
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="mt-2">
                    <span className="text-muted-foreground">Email:</span>{' '}
                    <span className="font-mono">{currentDemoUser.email}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Password:</span>{' '}
                    <span className="font-mono">{currentDemoUser.password}</span>
                  </p>
                </div>
              ) : (
                <p className="text-center text-xs text-muted-foreground">Select a role above to load demo credentials</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
