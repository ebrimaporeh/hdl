import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { blogApi } from '@/api/blogApi'
import { QUERY_STALE_TIME } from '@/constants'

export function useBlogPosts() {
  return useQuery({
    queryKey: queryKeys.blog.all(),
    queryFn: blogApi.list,
    staleTime: QUERY_STALE_TIME.MEDIUM,
  })
}

export function useBlogPost(slugOrId) {
  return useQuery({
    queryKey: queryKeys.blog.detail(slugOrId),
    queryFn: () => blogApi.get(slugOrId),
    enabled: Boolean(slugOrId),
    staleTime: QUERY_STALE_TIME.MEDIUM,
  })
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: blogApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.all() })
    },
  })
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => blogApi.update(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.all() })
      if (updated?.slug) {
        queryClient.invalidateQueries({ queryKey: queryKeys.blog.detail(updated.slug) })
      }
      if (updated?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.blog.detail(updated.id) })
      }
    },
  })
}
