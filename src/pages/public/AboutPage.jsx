import { Link } from '@tanstack/react-router'
import {
  ShieldCheck,
  Clock,
  HeartHandshake,
  FlaskConical,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Microscope,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { APP_SETTINGS } from '@/settings'
import { ROUTES } from '@/constants'

const STATS = [
  { value: '5', label: 'Testing disciplines' },
  { value: 'Same-day', label: 'Typical turnaround' },
  { value: '2024', label: 'Serving Gambia since' },
  { value: '100%', label: 'On the lab’s own templates' },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Accurate results',
    text: 'Standardized methods and clear reference ranges on every report, so your doctor can act with confidence.',
  },
  {
    icon: Clock,
    title: 'Fast turnaround',
    text: 'Most results are ready the same day you are tested — no waiting days for answers.',
  },
  {
    icon: HeartHandshake,
    title: 'Friendly, local service',
    text: 'A Gambian lab, for Gambians — walk in, get tested, and get answers from people who care.',
  },
]

const DISCIPLINES = ['Clinical Chemistry', 'Hematology', 'Immunology', 'Toxicology', 'Cytology']

export function AboutPage() {
  const { branding } = APP_SETTINGS

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_-10%,hsl(var(--accent))_0%,transparent_60%)]"
        />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-eyebrow">Who We Are</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Diagnostics you can trust, close to home.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {branding.legalName} is a diagnostic laboratory on the Kotu Manjai Highway in KMC, Gambia — offering
              clinical chemistry, hematology, immunology, toxicology, and cytology testing for individuals, clinics,
              and employers.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to={ROUTES.SERVICES}>
                  Explore our services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={ROUTES.CONTACT}>Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="border-b bg-subtle">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-2 py-8 text-center sm:py-10">
              <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-eyebrow">Why HDL</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built for clarity and confidence
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every test is run and reviewed with one goal: results you and your doctor can rely on.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {VALUES.map((value) => (
            <Card key={value.title} interactive className="h-full">
              <CardContent className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
                  <value.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold tracking-tight">{value.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── What we test + Team ──────────────────────────────────────── */}
      <section className="border-y bg-subtle">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-eyebrow">What We Test</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">A full diagnostic menu</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              From routine screening panels to specialist assays, we cover five core disciplines — all reported on
              the lab’s own templates so the format matches what your doctor expects.
            </p>
            <ul className="mt-6 space-y-3">
              {DISCIPLINES.map((discipline) => (
                <li key={discipline} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{discipline}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="mt-4 h-auto p-0 text-primary">
              <Link to={ROUTES.SERVICES}>
                See all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div>
            <p className="text-eyebrow">Our Team</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Reviewed by experts</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Reports are reviewed by qualified biomedical scientists before they reach you.
            </p>
            <Card className="mt-6">
              <CardContent className="flex items-start gap-4 p-6">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
                  <Microscope className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold tracking-tight">Malamin Barrow</p>
                  <p className="text-sm text-muted-foreground">Lead Cytologist &amp; Biomedical Scientist</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    FIBMS, DIP Immunology — HCPC (UK) REG# BS33943
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Visit us ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-eyebrow">Visit Us</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Find the lab</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Walk in during opening hours, or reach out and we’ll help you plan your visit.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <MapPin className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold">Location</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{branding.address}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Phone className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold">Phone</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{branding.phones.join(' / ')}</p>
              <p className="mt-2 text-xs text-muted-foreground">Mon–Fri: 8:00 AM – 6:00 PM</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Mail className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold">Email</p>
              <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">{branding.email}</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA banner */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-secondary px-6 py-10 text-center sm:px-12 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,hsl(var(--primary)/0.35)_0%,transparent_70%)]"
          />
          <div className="relative">
            <FlaskConical className="mx-auto h-8 w-8 text-secondary-foreground/90" />
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-secondary-foreground sm:text-3xl">
              Ready to get tested?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-secondary-foreground/80">
              Browse our services or contact the lab — we’ll take care of the rest.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to={ROUTES.SERVICES}>
                  View services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <Link to={ROUTES.CONTACT}>Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
