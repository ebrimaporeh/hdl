import { MapPin, Phone, Mail } from 'lucide-react'
import { AboutSection } from '@/features/marketing/components/AboutSection'
import { Card, CardContent } from '@/components/ui/card'
import { APP_SETTINGS } from '@/settings'

export function AboutPage() {
  const { branding } = APP_SETTINGS

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">Who We Are</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">About Us</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{branding.tagline}</p>
      </div>

      <AboutSection />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Our Team</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
          Reports are reviewed by qualified biomedical scientists, including our lead cytologist Malamin Barrow,
          FIBMS, DIP Immunology — HCPC (UK) REG# BS33943.
        </p>

        <Card className="mt-8">
          <CardContent className="grid gap-6 p-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">{branding.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">{branding.phones.join(' / ')}</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">{branding.email}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
