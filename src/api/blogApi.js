import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'

function byDateDesc(a, b) {
  return new Date(b.publishedAt) - new Date(a.publishedAt)
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const blogApi = {
  list: () =>
    API_ENABLED
      ? apiClient.get('/blog/').then((r) => r.data)
      : simulateRequest(() => mockDb.blogPosts.list().sort(byDateDesc)),

  // Lookup accepts either the slug (public routes) or the id (admin editing).
  get: (slugOrId) =>
    API_ENABLED
      ? apiClient.get(`/blog/${slugOrId}/`).then((r) => r.data)
      : simulateRequest(() => {
          const post =
            mockDb.blogPosts.list().find((p) => p.slug === slugOrId) ?? mockDb.blogPosts.get(slugOrId)
          if (!post) throw new Error('Blog post not found')
          return post
        }),

  create: (data) =>
    API_ENABLED
      ? apiClient.post('/blog/', data).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.blogPosts.insert({
            slug: data.slug?.trim() || slugify(data.title),
            publishedAt: data.publishedAt || new Date().toISOString().slice(0, 10),
            body: data.body ?? [],
            ...data,
          }),
        ),

  update: (id, data) =>
    API_ENABLED
      ? apiClient.patch(`/blog/${id}/`, data).then((r) => r.data)
      : simulateRequest(() => {
          const patch = { ...data }
          if (patch.slug !== undefined) patch.slug = patch.slug?.trim() || slugify(patch.title || '')
          const updated = mockDb.blogPosts.update(id, patch)
          if (!updated) throw new Error('Blog post not found')
          return updated
        }),
}
