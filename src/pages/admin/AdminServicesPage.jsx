import { useNavigate, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/custom/PageHeader'
import { DataTable } from '@/components/custom/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTestTypes } from '@/hooks/useTestTypes'
import { ROUTES } from '@/constants'

const COLUMNS = [
  { key: 'name', header: 'Service', render: (s) => <span className="font-medium">{s.name}</span> },
  { key: 'code', header: 'Code' },
  { key: 'category', header: 'Category', render: (s) => <Badge variant="muted">{s.category}</Badge> },
  { key: 'sampleType', header: 'Sample' },
  { key: 'turnaround', header: 'Turnaround', render: (s) => s.turnaround ?? '—' },
  { key: 'price', header: 'Price', render: (s) => s.price ?? '—' },
]

export function AdminServicesPage() {
  const navigate = useNavigate()
  const { data: services, isLoading } = useTestTypes()

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage the lab's test catalogue — what appears on the public services pages."
        action={
          <Button asChild className="h-11 gap-2">
            <Link to={ROUTES.ADMIN_SERVICE_NEW}>
              <Plus className="h-4 w-4" />
              New Service
            </Link>
          </Button>
        }
      />

      <DataTable
        columns={COLUMNS}
        rows={services}
        isLoading={isLoading}
        emptyTitle="No services yet"
        emptyDescription="Add your first service to populate the catalogue."
        onRowClick={(s) => navigate({ to: ROUTES.adminServiceEdit(s.id) })}
      />
    </div>
  )
}
