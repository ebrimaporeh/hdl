import { FlaskConical, Clock, FileCheck2, Microscope } from 'lucide-react'

const STATS = [
  { icon: FlaskConical, value: '5', label: 'Testing disciplines' },
  { icon: Clock, value: 'Same-day', label: 'Typical turnaround' },
  { icon: FileCheck2, value: '100%', label: 'Expert-reviewed reports' },
  { icon: Microscope, value: '2024', label: 'Serving Gambia since' },
]

export function StatsBand() {
  return (
    <section className="border-b bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:py-14">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-secondary-foreground ring-1 ring-inset ring-white/15">
              <stat.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-sm text-secondary-foreground/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
