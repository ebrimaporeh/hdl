import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ShieldCheck, ClipboardCheck, Microscope, Lock, FlaskConical } from 'lucide-react'
import { ServiceCard } from '@/features/marketing/components/ServiceCard'
import { ProcessTimeline } from '@/features/marketing/components/ProcessTimeline'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useTestTypes } from '@/hooks/useTestTypes'
import { MEDIA, img } from '@/features/marketing/constants/media'
import { APP_SETTINGS } from '@/settings'
import { ROUTES } from '@/constants'

const QUALITY = [
  {
    icon: ClipboardCheck,
    title: 'Standardized methods',
    text: 'Every assay follows validated, documented procedures for consistent, comparable results.',
  },
  {
    icon: ShieldCheck,
    title: 'Internal quality control',
    text: 'Control samples are run alongside your tests to verify instrument accuracy on every batch.',
  },
  {
    icon: Microscope,
    title: 'Expert review',
    text: 'Qualified biomedical scientists review and sign off on results before they are released.',
  },
  {
    icon: Lock,
    title: 'Confidential & secure',
    text: 'Your health information is handled privately and shared only with you and your doctor.',
  },
]

export function ServicesPage() {
  const { data: testTypes, isLoading } = useTestTypes()
  const categories = APP_SETTINGS.reportTypes.categories

  return (
    <div>
      {/* ── Hero header ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-secondary text-secondary-foreground">
        <img
          src={img(MEDIA.pinkPipette.id, { w: 1600, h: 700, q: 60 })}
          alt={MEDIA.pinkPipette.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="eager"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/60"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-foreground/80">
              What We Offer
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Our Services</h1>
            <p className="mt-4 text-lg leading-relaxed text-secondary-foreground/85">
              Every test we run is built on the lab&apos;s own reporting templates — so the results you receive
              always match the format your doctor expects.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service cards ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(testTypes ?? []).map((testType, i) => (
              <motion.div
                key={testType.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: Math.min(i, 5) * 0.05 }}
              >
                <ServiceCard testType={testType} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── Testing workflow ─────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── Quality assurance & standards ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-eyebrow">Quality Assurance</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Standards you can rely on
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Accuracy isn&apos;t an afterthought — it&apos;s built into every step of how we test and report.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY.map((item) => (
            <Card key={item.title} interactive className="h-full">
              <CardContent className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
                  <item.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold tracking-tight">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA banner */}
        <div className="relative mt-14 overflow-hidden rounded-2xl bg-secondary px-6 py-12 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,hsl(var(--primary)/0.35)_0%,transparent_70%)]"
          />
          <div className="relative">
            <FlaskConical className="mx-auto h-8 w-8 text-secondary-foreground/90" />
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-secondary-foreground sm:text-3xl">
              Need a test done?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-secondary-foreground/80">
              Walk in during opening hours or get in touch — we&apos;ll help you find the right test.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to={ROUTES.CONTACT}>
                  Contact the lab
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link to={ROUTES.ABOUT}>About us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
