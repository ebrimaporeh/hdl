import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { testTypesApi } from '@/api/testTypesApi'
import { QUERY_STALE_TIME } from '@/constants'

export function useTestTypes() {
  return useQuery({
    queryKey: queryKeys.testTypes.all(),
    queryFn: testTypesApi.list,
    staleTime: QUERY_STALE_TIME.LONG,
  })
}

export function useTestType(id) {
  return useQuery({
    queryKey: queryKeys.testTypes.detail(id),
    queryFn: () => testTypesApi.get(id),
    enabled: Boolean(id),
    staleTime: QUERY_STALE_TIME.LONG,
  })
}

export function useCreateTestType() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: testTypesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testTypes.all() })
    },
  })
}

export function useUpdateTestType() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => testTypesApi.update(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testTypes.all() })
      if (updated?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.testTypes.detail(updated.id) })
      }
    },
  })
}
