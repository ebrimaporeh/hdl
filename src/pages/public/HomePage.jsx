import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/features/marketing/components/Hero'
import { StatsBand } from '@/features/marketing/components/StatsBand'
import { ProcessTimeline } from '@/features/marketing/components/ProcessTimeline'
import { WhyChooseUs } from '@/features/marketing/components/WhyChooseUs'
import { SendReportsWidget } from '@/features/marketing/components/SendReportsWidget'
import { ServiceCard } from '@/features/marketing/components/ServiceCard'
import { Button } from '@/components/ui/button'
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
      <StatsBand />

      {/* Featured services */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-eyebrow">What We Offer</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Our Services</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Laboratory testing across five core disciplines — each reported on the lab&apos;s own templates.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden shrink-0 sm:inline-flex">
              <Link to={ROUTES.SERVICES}>
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)
              : featured.map((testType, i) => (
                  <motion.div
                    key={testType.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 5) * 0.05 }}
                  >
                    <ServiceCard testType={testType} />
                  </motion.div>
                ))}
          </div>

          <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
            <Link to={ROUTES.SERVICES}>
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <ProcessTimeline />
      <WhyChooseUs />
      <SendReportsWidget />
    </div>
  )
}
