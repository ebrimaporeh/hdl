import { ShieldCheck, Clock, HeartHandshake } from 'lucide-react'
import { APP_SETTINGS } from '@/settings'

const POINTS = [
  { icon: ShieldCheck, title: 'Accurate results', text: 'Standardized methods and clear reference ranges on every report.' },
  { icon: Clock, title: 'Fast turnaround', text: 'Most results are ready the same day you are tested.' },
  { icon: HeartHandshake, title: 'Friendly, local service', text: 'A Gambian lab, for Gambians — walk in, get tested, get answers.' },
]

export function AboutSection() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">About Us</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            About {APP_SETTINGS.branding.shortName}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {APP_SETTINGS.branding.legalName} is a diagnostic laboratory based on the Kotu Manjai Highway in KMC,
            Gambia, offering clinical chemistry, hematology, immunology, toxicology, and cytology testing for
            individuals, clinics, and employers.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.title} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                <point.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-semibold tracking-tight">{point.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
