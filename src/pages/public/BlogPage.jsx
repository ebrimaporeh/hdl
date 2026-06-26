import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/custom/EmptyState'
import { useBlogPosts } from '@/hooks/useBlog'
import { img } from '@/features/marketing/constants/media'
import { formatDate } from '@/utils/formatters'
import { ROUTES } from '@/constants'

export function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts()

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/40 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(hsl(var(--primary)/0.12)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-eyebrow">Health & Lab Insights</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">The HDL Blog</h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Practical guides on tests, results and staying healthy — written by our clinical team to help you
              understand your health.
            </p>
          </div>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : !posts?.length ? (
          <EmptyState title="No posts yet" description="Check back soon for health tips and lab guides." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: Math.min(i, 5) * 0.05 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function BlogCard({ post }) {
  return (
    <Link
      to={ROUTES.blogDetail(post.slug)}
      className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={img(post.image, { w: 600, h: 380, q: 60 })}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
          <Badge
            variant="muted"
            className="absolute left-3 top-3 bg-surface/90 text-foreground shadow-sm backdrop-blur"
          >
            {post.category}
          </Badge>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            {post.readTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            )}
          </div>
          <h2 className="mt-2 text-base font-semibold leading-snug tracking-tight">{post.title}</h2>
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Read article
            <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
