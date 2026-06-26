import { ClipboardList, TestTube2, ScanSearch, FileCheck2 } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Order & register',
    text: 'Walk in or get referred. We register your details and the tests you need.',
  },
  {
    icon: TestTube2,
    title: 'Sample collection',
    text: 'Trained staff collect your sample safely, using the right tube for each test.',
  },
  {
    icon: ScanSearch,
    title: 'Lab analysis',
    text: 'Samples are processed on calibrated instruments using standardized methods.',
  },
  {
    icon: FileCheck2,
    title: 'Review & results',
    text: 'A biomedical scientist reviews every result before it reaches you or your doctor.',
  },
]

export function ProcessTimeline() {
  return (
    <section className="border-b bg-subtle">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-eyebrow">How It Works</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">From sample to results</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            A clear, careful process — most results are ready the same day you&apos;re tested.
          </p>
        </div>

        <ol className="relative mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-8 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border bg-surface text-primary shadow-sm">
                <step.icon className="h-5 w-5" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-2xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </span>
              <p className="mt-4 font-semibold tracking-tight">{step.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
