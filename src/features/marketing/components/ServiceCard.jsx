import { Link } from '@tanstack/react-router'
import { FlaskConical, Droplet, ShieldCheck, TestTube2, ScanSearch, Microscope, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { serviceImage, img } from '@/features/marketing/constants/media'
import { ROUTES } from '@/constants'

export const CATEGORY_ICONS = {
  Chemistry: FlaskConical,
  Hematology: Droplet,
  Immunology: ShieldCheck,
  Toxicology: TestTube2,
  Cytology: ScanSearch,
}

export function ServiceCard({ testType }) {
  const Icon = CATEGORY_ICONS[testType.category] ?? Microscope
  const image = serviceImage(testType)

  return (
    <Link
      to={ROUTES.serviceDetail(testType.id)}
      className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <Card interactive className="flex h-full flex-col overflow-hidden">
        {/* Image banner */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={img(image.id, { w: 600, h: 380, q: 60 })}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          <Badge
            variant="muted"
            className="absolute right-3 top-3 bg-surface/90 text-foreground shadow-sm backdrop-blur"
          >
            {testType.category}
          </Badge>
          {/* overlapping icon chip */}
          <span className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl border bg-surface text-primary shadow-md">
            <Icon className="h-5 w-5" />
          </span>
        </div>

        <CardHeader className="pt-8">
          <CardTitle className="text-base font-semibold tracking-tight">{testType.name}</CardTitle>
          <CardDescription className="leading-relaxed">{testType.description}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">
            {testType.price ? testType.price : `Sample: ${testType.sampleType}`}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            View details
            <ArrowRight className="h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
