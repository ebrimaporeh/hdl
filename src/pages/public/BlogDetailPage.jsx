import { useParams, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/custom/EmptyState'
import { useBlogPost } from '@/hooks/useBlog'
import { img } from '@/features/marketing/constants/media'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

// Tailwind arbitrary variants style the HTML emitted by the rich text editor.
const PROSE = [
  'mt-6 max-w-none text-muted-foreground',
  '[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground',
  '[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground',
  '[&_p]:mt-5 [&_p]:leading-relaxed',
  '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5',
  '[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5',
  '[&_li]:leading-relaxed [&_li]:pl-1 [&_li]:marker:text-primary',
  '[&_strong]:font-semibold [&_strong]:text-foreground',
  '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2',
].join(' ')

export function BlogDetailPage() {
  const { slug } = useParams({ strict: false })
  const { data: post, isLoading, isError } = useBlogPost(slug)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="mt-4 h-64 w-full rounded-2xl" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          title="Article not found"
          description="This post doesn’t exist or may have been moved."
          action={
            <Button asChild>
              <Link to={ROUTES.BLOG}>Back to the blog</Link>
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <Link
        to={ROUTES.BLOG}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All articles
      </Link>

      <div className="mt-6">
        <Badge variant="muted">{post.category}</Badge>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.author && (
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {formatDate(post.publishedAt)}
          </span>
          {post.readTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          )}
        </div>
      </div>

      {post.image && (
        <div className="mt-8 overflow-hidden rounded-2xl border shadow-sm">
          <img
            src={img(post.image, { w: 1200, h: 600, q: 65 })}
            alt={post.title}
            className="aspect-[2/1] w-full object-cover"
            loading="eager"
          />
        </div>
      )}

      <div className="mt-8">
        {post.excerpt && (
          <p className="text-lg font-medium leading-relaxed text-foreground">{post.excerpt}</p>
        )}
        {typeof post.body === 'string' && (
          <div className={PROSE} dangerouslySetInnerHTML={{ __html: post.body }} />
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border bg-accent/40 p-6 sm:p-8">
        <h3 className="text-lg font-bold tracking-tight">Have a question about a test?</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Our team is happy to help you understand your results or book the right test.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link to={ROUTES.CONTACT}>
              Contact the lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={ROUTES.SERVICES}>Browse services</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
