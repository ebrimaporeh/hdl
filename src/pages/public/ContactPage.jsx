import { MapPin, Phone, Mail, Clock, Navigation, ChevronDown, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/features/marketing/components/ContactForm'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { APP_SETTINGS } from '@/settings'

const HOURS = [
  { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

const FAQS = [
  {
    q: 'How do I get my test results?',
    a: 'Results are available through the customer portal once they’re ready. You can also use the “Get My Reports” option on the home page to have them emailed to the address on file.',
  },
  {
    q: 'Do I need an appointment?',
    a: 'Walk-ins are welcome during opening hours. For certain specialist tests, calling ahead helps us prepare and reduces your wait.',
  },
  {
    q: 'How long do results take?',
    a: 'Most results are ready the same day you’re tested. A few specialist assays take longer — we’ll let you know the expected turnaround when you’re tested.',
  },
  {
    q: 'Can my doctor receive my results directly?',
    a: 'Yes. Let us know your referring doctor or clinic and we’ll share your results wherever you direct.',
  },
]

export function ContactPage() {
  const { branding } = APP_SETTINGS
  const mapsQuery = encodeURIComponent(branding.address)

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/40 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(hsl(var(--primary)/0.12)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-eyebrow">Get In Touch</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Us</h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Questions about a test, a result, or visiting the lab? Send us a message or reach out directly — we
              typically respond within one business day.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {/* ── Quick contact cards ────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-3">
          <QuickCard
            icon={Phone}
            title="Call us"
            lines={branding.phones}
            action={{ label: 'Call now', href: `tel:${branding.phones[0].replace(/\s/g, '')}` }}
          />
          <QuickCard
            icon={Mail}
            title="Email us"
            lines={[branding.email]}
            action={{ label: 'Send email', href: `mailto:${branding.email}` }}
          />
          <QuickCard
            icon={Clock}
            title="Opening hours"
            lines={['Mon–Fri: 8AM – 6PM', 'Sat: 9AM – 2PM']}
          />
        </div>

        {/* ── Form + details ─────────────────────────────────────── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <MessageSquare className="h-5 w-5 text-primary" />
                Send a message
              </CardTitle>
              <CardDescription>Fill in the form and we&apos;ll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Visit the lab</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{branding.address}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4" />
                    Get directions
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Opening hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y text-sm">
                  {HOURS.map((row) => (
                    <li key={row.day} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                      <span className="text-muted-foreground">{row.day}</span>
                      <span className={row.time === 'Closed' ? 'font-medium text-destructive-emphasis' : 'font-medium'}>
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Map ────────────────────────────────────────────────── */}
        <div className="mt-8 overflow-hidden rounded-2xl border shadow-sm">
          <iframe
            title="HDL location map"
            src={`https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`}
            className="h-80 w-full border-0 grayscale-[0.2]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="mt-16">
          <div className="max-w-2xl">
            <p className="text-eyebrow">FAQ</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Frequently asked questions</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Send us a message above.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border bg-card p-5 transition-colors open:border-border-strong open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function QuickCard({ icon: Icon, title, lines, action }) {
  return (
    <Card interactive className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-4 font-semibold tracking-tight">{title}</p>
        <div className="mt-1 space-y-0.5">
          {lines.map((line) => (
            <p key={line} className="text-sm text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
        {action && (
          <a
            href={action.href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {action.label}
          </a>
        )}
      </CardContent>
    </Card>
  )
}
