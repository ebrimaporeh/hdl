import { motion } from 'framer-motion'
import { Stethoscope, UserRound } from 'lucide-react'
import { BrandMark } from '@/components/custom/BrandMark'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { LoginTypeCard } from './LoginTypeCard'
import { ROUTES } from '@/constants'

export function AuthPageShell({ activeType, title, description, children }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-center">
        <div className="space-y-6">
          <BrandMark size="lg" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Choose how you&apos;d like to sign in.</p>
          </div>
          <div className="space-y-3">
            <LoginTypeCard
              to={ROUTES.STAFF_LOGIN}
              icon={Stethoscope}
              title="Staff"
              description="Admin & lab portal"
              active={activeType === 'staff'}
            />
            <LoginTypeCard
              to={ROUTES.CUSTOMER_LOGIN}
              icon={UserRound}
              title="Customer"
              description="View your reports"
              active={activeType === 'customer'}
            />
          </div>
        </div>

        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
