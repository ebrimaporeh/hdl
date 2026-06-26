import { useParams, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Tag,
  TestTube,
  Utensils,
  ClipboardList,
  ListChecks,
  Stethoscope,
  Users,
  FlaskConical,
  Microscope,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/custom/EmptyState'
import { CATEGORY_ICONS } from '@/features/marketing/components/ServiceCard'
import { serviceImage, img } from '@/features/marketing/constants/media'
import { useTestType } from '@/hooks/useTestTypes'
import { ROUTES } from '@/constants'

function measuredAnalytes(testType) {
  if (testType.groups?.length) {
    return testType.groups.map((g) => ({ group: g.group, items: g.fields.map((f) => f.label) }))
  }
  if (testType.fields?.length) {
    return [{ group: null, items: testType.fields.map((f) => f.label) }]
  }
  return []
}

export function ServiceDetailPage() {
  const { serviceId } = useParams({ strict: false })
  const { data: testType, isLoading, isError } = useTestType(serviceId)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-96 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (isError || !testType) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          title="Service not found"
          description="The test you’re looking for doesn’t exist or may have been moved."
          action={
            <Button asChild>
              <Link to={ROUTES.SERVICES}>Back to all services</Link>
            </Button>
          }
        />
      </div>
    )
  }

  const Icon = CATEGORY_ICONS[testType.category] ?? Microscope
  const image = serviceImage(testType)
  const analytes = measuredAnalytes(testType)

  const facts = [
    { icon: TestTube, label: 'Sample', value: testType.sampleType },
    { icon: Clock, label: 'Turnaround', value: testType.turnaround },
    { icon: Tag, label: 'Price', value: testType.price },
    { icon: Utensils, label: 'Fasting', value: testType.fasting ? 'Required' : 'Not required' },
  ].filter((f) => f.value)

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-secondary text-secondary-foreground">
        <img
          src={img(image.id, { w: 1600, h: 720, q: 60 })}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="eager"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <nav className="flex items-center gap-1.5 text-sm text-secondary-foreground/70">
            <Link to={ROUTES.SERVICES} className="inline-flex items-center gap-1 hover:text-secondary-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              All services
            </Link>
          </nav>

          <div className="mt-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/15">
                <Icon className="h-6 w-6" />
              </span>
              <Badge variant="muted" className="bg-white/10 text-white backdrop-blur">
                {testType.category}
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{testType.name}</h1>
            <p className="mt-3 text-lg leading-relaxed text-secondary-foreground/85">
              {testType.overview ?? testType.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to={ROUTES.CONTACT}>
                  Book this test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link to={ROUTES.SERVICES}>Other tests</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Main column ─────────────────────────────────────── */}
          <div className="space-y-10 lg:col-span-2">
            {testType.preparation?.length > 0 && (
              <Section icon={ClipboardList} title="How to prepare">
                <ul className="space-y-2.5">
                  {testType.preparation.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {testType.procedure?.length > 0 && (
              <Section icon={ListChecks} title="What to expect">
                <ol className="space-y-4">
                  {testType.procedure.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground ring-1 ring-inset ring-primary/10">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {analytes.length > 0 && (
              <Section icon={FlaskConical} title="What this test measures">
                <div className="space-y-5">
                  {analytes.map((group, i) => (
                    <div key={group.group ?? i}>
                      {group.group && (
                        <p className="mb-2 text-sm font-semibold tracking-tight text-foreground">{group.group}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {testType.clinicalInfo && (
              <Section icon={Stethoscope} title="Why it matters">
                <p className="text-sm leading-relaxed text-muted-foreground">{testType.clinicalInfo}</p>
              </Section>
            )}

            {testType.whoFor && (
              <Section icon={Users} title="Who it’s for">
                <p className="text-sm leading-relaxed text-muted-foreground">{testType.whoFor}</p>
              </Section>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <div className="space-y-6">
            <Card className="lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">At a glance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <dl className="space-y-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
                        <fact.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">{fact.label}</dt>
                        <dd className="text-sm font-semibold tracking-tight">{fact.value}</dd>
                      </div>
                    </div>
                  ))}
                  {testType.method && (
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
                        <Microscope className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">Method</dt>
                        <dd className="text-sm font-semibold leading-snug tracking-tight">{testType.method}</dd>
                      </div>
                    </div>
                  )}
                </dl>

                <div className="border-t pt-4">
                  <Button asChild className="w-full">
                    <Link to={ROUTES.CONTACT}>
                      Book this test
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Walk-ins welcome during opening hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <section>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}
