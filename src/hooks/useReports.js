import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { reportsApi } from '@/api/reportsApi'

export function useReports(params = {}) {
  return useQuery({
    queryKey: queryKeys.reports.list(params),
    queryFn: () => reportsApi.list(params),
  })
}

export function useReport(id) {
  return useQuery({
    queryKey: queryKeys.reports.detail(id),
    queryFn: () => reportsApi.get(id),
    enabled: Boolean(id),
  })
}

export function useCustomerReports(customerId, params = {}) {
  return useQuery({
    queryKey: queryKeys.reports.forCustomer(customerId, params),
    queryFn: () => reportsApi.listForCustomer(customerId, params),
    enabled: Boolean(customerId),
  })
}

function invalidateReport(queryClient, id) {
  queryClient.invalidateQueries({ queryKey: queryKeys.reports.all() })
  queryClient.invalidateQueries({ queryKey: queryKeys.reports.detail(id) })
  queryClient.invalidateQueries({ queryKey: queryKeys.testRequests.all() })
}

export function useFinalizeReport() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: reportsApi.finalize,
    onSuccess: (report) => invalidateReport(queryClient, report.id),
  })
}

export function useReopenReport() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: reportsApi.reopen,
    onSuccess: (report) => invalidateReport(queryClient, report.id),
  })
}
