import { ShieldCheck, Clock, HeartHandshake, Microscope } from 'lucide-react'
import { MEDIA, img } from '@/features/marketing/constants/media'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Accurate, standardized results',
    text: 'Calibrated instruments and clear reference ranges on every report.',
  },
  {
    icon: Clock,
    title: 'Fast turnaround',
    text: 'Most results are ready the same day you are tested.',
  },
  {
    icon: Microscope,
    title: 'Expert review',
    text: 'Qualified biomedical scientists review every result before release.',
  },
  {
    icon: HeartHandshake,
    title: 'Friendly, local service',
    text: 'A Gambian lab, for Gambians — walk in, get tested, get answers.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Imagery */}
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-2xl border shadow-lg">
            <img
              src={img(MEDIA.technician.id, { w: 900, h: 760, q: 70 })}
              alt={MEDIA.technician.alt}
              className="aspect-[6/5] w-full object-cover"
              loading="lazy"
            />
          </div>
         
        </div>

        {/* Copy + features */}
        <div>
          <p className="text-eyebrow">Why Choose HDL</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Diagnostics built on trust and precision
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every test is run and reviewed with one goal: results you and your doctor can rely on.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight">{feature.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
