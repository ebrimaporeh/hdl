import { FlaskConical, Droplet, ShieldCheck, TestTube2, ScanSearch, Microscope } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const CATEGORY_ICONS = {
  Chemistry: FlaskConical,
  Hematology: Droplet,
  Immunology: ShieldCheck,
  Toxicology: TestTube2,
  Cytology: ScanSearch,
}

export function ServiceCard({ testType }) {
  const Icon = CATEGORY_ICONS[testType.category] ?? Microscope

  return (
    <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Icon className="h-5 w-5" />
          </span>
          <Badge variant="outline" className="shrink-0 text-xs font-medium">
            {testType.category}
          </Badge>
        </div>
        <CardTitle className="pt-2 text-base font-semibold tracking-tight">{testType.name}</CardTitle>
        <CardDescription className="leading-relaxed">{testType.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-medium text-muted-foreground">Sample: {testType.sampleType}</p>
      </CardContent>
    </Card>
  )
}
