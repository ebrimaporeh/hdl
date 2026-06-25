import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/features/marketing/components/Hero'
import { SendReportsWidget } from '@/features/marketing/components/SendReportsWidget'
import { AboutSection } from '@/features/marketing/components/AboutSection'
import { ServiceCard } from '@/features/marketing/components/ServiceCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useTestTypes } from '@/hooks/useTestTypes'
import { APP_SETTINGS } from '@/settings'
import { ROUTES } from '@/constants'

export function HomePage() {
  const { data: testTypes, isLoading } = useTestTypes()
  const featured = testTypes?.filter((t) => APP_SETTINGS.services.featured.includes(t.id)) ?? []

  return (
    <div>
      <Hero />

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">What We Offer</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Our Services</h2>
              <p className="mt-2 text-muted-foreground">Laboratory testing across five core disciplines.</p>
            </div>
            <Link
              to={ROUTES.SERVICES}
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44" />)
              : featured.map((testType, i) => (
                  <motion.div
                    key={testType.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ServiceCard testType={testType} />
                  </motion.div>
                ))}
          </div>

          <Link
            to={ROUTES.SERVICES}
            className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SendReportsWidget />
      <AboutSection />
    </div>
  )
}
