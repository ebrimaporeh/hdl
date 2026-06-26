import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, FileSearch, ShieldCheck, Clock, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { APP_SETTINGS } from '@/settings'
import { MEDIA, img } from '@/features/marketing/constants/media'

const TRUST = [
  { icon: ShieldCheck, label: 'Accredited methods' },
  { icon: Clock, label: 'Same-day results' },
  { icon: Award, label: 'Expert-reviewed' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/40 via-background to-background">
      {/* science dot-grid + brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:radial-gradient(hsl(var(--primary)/0.12)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_90%_-5%,hsl(var(--primary)/0.12),transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-24">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Accurate diagnostics.{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trusted care.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {APP_SETTINGS.branding.tagline} Clinical chemistry, hematology, immunology, toxicology and cytology —
            reported on the lab&apos;s own templates.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12">
              <Link to={ROUTES.SERVICES}>
                Explore our services
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

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Image composition ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border bg-surface shadow-xl">
              <img
                src={img(MEDIA.labRoom.id, { w: 900, h: 1000, q: 70 })}
                alt={MEDIA.labRoom.alt}
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
            </div>

            {/* floating accent photo */}
            <div className="absolute -bottom-6 -left-6 hidden w-40 overflow-hidden rounded-xl border-4 border-background shadow-lg sm:block">
              <img
                src={img(MEDIA.microscope.id, { w: 320, h: 240, q: 65 })}
                alt={MEDIA.microscope.alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>

           
          </div>
        </motion.div>
      </div>
    </section>
  )
}
