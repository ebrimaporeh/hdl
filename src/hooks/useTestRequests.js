import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { testRequestsApi } from '@/api/testRequestsApi'

export function useTestRequests(params = {}) {
  return useQuery({
    queryKey: queryKeys.testRequests.list(params),
    queryFn: () => testRequestsApi.list(params),
  })
}

export function useTestRequest(id) {
  return useQuery({
    queryKey: queryKeys.testRequests.detail(id),
    queryFn: () => testRequestsApi.get(id),
    enabled: Boolean(id),
  })
}

function invalidateTestRequest(queryClient, id) {
  queryClient.invalidateQueries({ queryKey: queryKeys.testRequests.all() })
  queryClient.invalidateQueries({ queryKey: queryKeys.testRequests.detail(id) })
  queryClient.invalidateQueries({ queryKey: queryKeys.reports.all() })
}

export function useSaveResultProgress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }) => testRequestsApi.saveProgress(id, values),
    onSuccess: (_, { id }) => invalidateTestRequest(queryClient, id),
  })
}

export function useCompleteTestRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }) => testRequestsApi.markComplete(id, values),
    onSuccess: (_, { id }) => invalidateTestRequest(queryClient, id),
  })
}
