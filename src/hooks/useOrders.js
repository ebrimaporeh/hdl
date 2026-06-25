import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { queryKeys } from '@/api/queryKeys'
import { ordersApi } from '@/api/ordersApi'
import { ROUTES } from '@/constants'

export function useCustomerOrders(customerId) {
  return useQuery({
    queryKey: queryKeys.customers.history(customerId),
    queryFn: () => ordersApi.listForCustomer(customerId),
    enabled: Boolean(customerId),
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ordersApi.create,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testRequests.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.history(order.customerId) })
      navigate({ to: ROUTES.ADMIN_WORKLIST })
    },
  })
}
