import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { customersApi } from '@/api/customersApi'

export function useCustomers(params = {}) {
  return useQuery({
    queryKey: queryKeys.customers.list(params),
    queryFn: () => customersApi.list(params),
  })
}

export function useCustomer(id) {
  return useQuery({
    queryKey: queryKeys.customers.detail(id),
    queryFn: () => customersApi.get(id),
    enabled: Boolean(id),
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: customersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all() })
    },
  })
}
