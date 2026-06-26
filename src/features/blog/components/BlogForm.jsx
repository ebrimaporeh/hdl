import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// ── Body <-> text helpers ──────────────────────────────────────────────────
// The editor uses a tiny, friendly syntax so admins don't need to know JSON:
//   "## Heading"      → a heading
//   "- item" lines    → a bulleted list
//   anything else      → a paragraph (blank line separates blocks)
export function blocksToText(blocks = []) {
  return blocks
    .map((block) => {
      if (block.type === 'heading') return `## ${block.text}`
      if (block.type === 'list') return block.items.map((i) => `- ${i}`).join('\n')
      return block.text
    })
    .join('\n\n')
}

export function textToBlocks(text = '') {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean)
      if (lines.every((l) => l.startsWith('- '))) {
        return { type: 'list', items: lines.map((l) => l.replace(/^-\s+/, '')) }
      }
      if (lines.length === 1 && lines[0].startsWith('## ')) {
        return { type: 'heading', text: lines[0].replace(/^##\s+/, '') }
      }
      return { type: 'paragraph', text: lines.join(' ') }
    })
}

function toFormState(post) {
  return {
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    category: post?.category ?? '',
    author: post?.author ?? 'HDL Clinical Team',
    image: post?.image ?? '',
    readTime: post?.readTime ?? '',
    publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
    excerpt: post?.excerpt ?? '',
    body: blocksToText(post?.body),
  }
}

export function BlogForm({ post, onSubmit, isSubmitting, submitLabel = 'Save post' }) {
  const [form, setForm] = useState(() => toFormState(post))

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category.trim(),
      author: form.author.trim(),
      image: form.image.trim(),
      readTime: form.readTime.trim(),
      publishedAt: form.publishedAt,
      excerpt: form.excerpt.trim(),
      body: textToBlocks(form.body),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Title" htmlFor="post-title">
        <Input id="post-title" required value={form.title} onChange={(e) => handleChange('title', e.target.value)} className="h-12" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Slug" htmlFor="post-slug" hint="Optional — auto-generated from the title if blank.">
          <Input id="post-slug" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} className="h-12" placeholder="my-post-title" />
        </Field>
        <Field label="Category" htmlFor="post-category">
          <Input id="post-category" required value={form.category} onChange={(e) => handleChange('category', e.target.value)} className="h-12" placeholder="e.g. Health Tips" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Author" htmlFor="post-author">
          <Input id="post-author" value={form.author} onChange={(e) => handleChange('author', e.target.value)} className="h-12" />
        </Field>
        <Field label="Read time" htmlFor="post-read">
          <Input id="post-read" value={form.readTime} onChange={(e) => handleChange('readTime', e.target.value)} className="h-12" placeholder="e.g. 5 min read" />
        </Field>
        <Field label="Published date" htmlFor="post-date">
          <Input id="post-date" type="date" value={form.publishedAt} onChange={(e) => handleChange('publishedAt', e.target.value)} className="h-12" />
        </Field>
      </div>

      <Field label="Image ID" htmlFor="post-image" hint="Unsplash photo ID (e.g. 1532187863486-abf9dbad1b69).">
        <Input id="post-image" value={form.image} onChange={(e) => handleChange('image', e.target.value)} className="h-12" />
      </Field>

      <Field label="Excerpt" htmlFor="post-excerpt" hint="Short summary shown on cards and at the top of the article.">
        <Textarea id="post-excerpt" required rows={2} value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} />
      </Field>

      <Field
        label="Body"
        htmlFor="post-body"
        hint="Use “## ” for a heading and “- ” for bullet points. Separate paragraphs with a blank line."
      >
        <Textarea id="post-body" required rows={14} value={form.body} onChange={(e) => handleChange('body', e.target.value)} className="font-mono text-sm" />
      </Field>

      <Button type="submit" size="lg" className="h-12 w-full" disabled={isSubmitting || !form.category}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  )
}

function Field({ label, htmlFor, hint, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
