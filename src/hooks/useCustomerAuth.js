import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { queryKeys } from '@/api/queryKeys'
import { customerAuthApi } from '@/api/customerAuthApi'
import { ROUTES } from '@/constants'
import { customerSession } from '@/utils/session'

export function useCustomerMe() {
  const session = customerSession.get()
  return useQuery({
    queryKey: queryKeys.customerAuth.me(),
    queryFn: () => customerAuthApi.me(session?.id),
    enabled: Boolean(session),
    retry: false,
  })
}

export function useCustomerLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: customerAuthApi.login,
    onSuccess: ({ user, token }) => {
      customerSession.set({ id: user.id, token })
      queryClient.setQueryData(queryKeys.customerAuth.me(), user)
      navigate({ to: ROUTES.PORTAL_REPORTS })
    },
  })
}

export function useCustomerLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: customerAuthApi.logout,
    onSettled: () => {
      customerSession.clear()
      queryClient.removeQueries({ queryKey: queryKeys.customerAuth.me() })
      navigate({ to: ROUTES.CUSTOMER_LOGIN })
    },
  })
}
