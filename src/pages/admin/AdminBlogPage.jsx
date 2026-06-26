import { useNavigate, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/custom/PageHeader'
import { DataTable } from '@/components/custom/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useBlogPosts } from '@/hooks/useBlog'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

const COLUMNS = [
  { key: 'title', header: 'Title', render: (p) => <span className="font-medium">{p.title}</span> },
  { key: 'category', header: 'Category', render: (p) => <Badge variant="muted">{p.category}</Badge> },
  { key: 'author', header: 'Author' },
  { key: 'publishedAt', header: 'Published', render: (p) => formatDate(p.publishedAt) },
]

export function AdminBlogPage() {
  const navigate = useNavigate()
  const { data: posts, isLoading } = useBlogPosts()

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Write and manage articles shown on the public blog."
        action={
          <Button asChild className="h-11 gap-2">
            <Link to={ROUTES.ADMIN_BLOG_NEW}>
              <Plus className="h-4 w-4" />
              New Post
            </Link>
          </Button>
        }
      />

      <DataTable
        columns={COLUMNS}
        rows={posts}
        isLoading={isLoading}
        emptyTitle="No posts yet"
        emptyDescription="Write your first article to get started."
        onRowClick={(p) => navigate({ to: ROUTES.adminBlogEdit(p.id) })}
      />
    </div>
  )
}
