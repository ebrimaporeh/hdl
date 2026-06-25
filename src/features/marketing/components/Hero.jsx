import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, FileSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { APP_SETTINGS } from '@/settings'

export function Hero() {
  return (
    <section className="border-b bg-gradient-to-b from-accent/40 to-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            {APP_SETTINGS.branding.shortName} &middot; The Gambia
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Accurate diagnostics.{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trusted care.
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {APP_SETTINGS.branding.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <Link to={ROUTES.SERVICES}>
                Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <Link to={ROUTES.HOME} hash="send-reports">
                <FileSearch className="h-4 w-4" />
                Get My Reports
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
