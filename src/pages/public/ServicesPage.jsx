import { motion } from 'framer-motion'
import { ServiceCard } from '@/features/marketing/components/ServiceCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useTestTypes } from '@/hooks/useTestTypes'

export function ServicesPage() {
  const { data: testTypes, isLoading } = useTestTypes()

  const byCategory = (testTypes ?? []).reduce((acc, t) => {
    acc[t.category] ??= []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">What We Offer</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Our Services</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every test we run is built on the lab&apos;s own reporting templates — so the results you receive always
          match the format your doctor expects.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      ) : (
        Object.entries(byCategory).map(([category, types]) => (
          <div key={category} className="mt-10">
            <h2 className="text-lg font-bold tracking-tight">{category}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {types.map((testType, i) => (
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
          </div>
        ))
      )}
    </div>
  )
}
