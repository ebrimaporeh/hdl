import { useParams, useNavigate } from '@tanstack/react-router'
import { PageHeader } from '@/components/custom/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/custom/LoadingSpinner'
import { EmptyState } from '@/components/custom/EmptyState'
import { BlogForm } from '@/features/blog/components/BlogForm'
import { useBlogPost, useCreateBlogPost, useUpdateBlogPost } from '@/hooks/useBlog'
import { ROUTES } from '@/constants'

export function BlogFormPage() {
  const { blogId } = useParams({ strict: false })
  const isEdit = Boolean(blogId)
  const navigate = useNavigate()

  const { data: post, isLoading } = useBlogPost(blogId)
  const createPost = useCreateBlogPost()
  const updatePost = useUpdateBlogPost()

  function handleSubmit(data) {
    if (isEdit) {
      updatePost.mutate({ id: blogId, data }, { onSuccess: () => navigate({ to: ROUTES.ADMIN_BLOG }) })
    } else {
      createPost.mutate(data, { onSuccess: () => navigate({ to: ROUTES.ADMIN_BLOG }) })
    }
  }

  if (isEdit && isLoading) return <LoadingSpinner className="py-16" />
  if (isEdit && !isLoading && !post) {
    return (
      <EmptyState
        title="Post not found"
        action={<Button onClick={() => navigate({ to: ROUTES.ADMIN_BLOG })}>Back to blog</Button>}
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        breadcrumbs={[{ label: 'Blog', to: ROUTES.ADMIN_BLOG }, { label: isEdit ? 'Edit' : 'New' }]}
        title={isEdit ? 'Edit post' : 'New Post'}
        description="Articles appear on the public blog as soon as they are saved."
      />

      <Card>
        <CardContent className="pt-6">
          <BlogForm
            post={post}
            onSubmit={handleSubmit}
            isSubmitting={createPost.isPending || updatePost.isPending}
            submitLabel={isEdit ? 'Save changes' : 'Publish post'}
          />
        </CardContent>
      </Card>
    </div>
  )
}
