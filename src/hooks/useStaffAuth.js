import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { queryKeys } from '@/api/queryKeys'
import { authApi } from '@/api/authApi'
import { ROUTES } from '@/constants'
import { staffSession } from '@/utils/session'

export function useStaffMe() {
  const session = staffSession.get()
  return useQuery({
    queryKey: queryKeys.staffAuth.me(),
    queryFn: () => authApi.me(session?.id),
    enabled: Boolean(session),
    retry: false,
  })
}

export function useStaffLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ user, token }) => {
      staffSession.set({ id: user.id, token })
      queryClient.setQueryData(queryKeys.staffAuth.me(), user)
      navigate({ to: ROUTES.ADMIN_DASHBOARD })
    },
  })
}

export function useStaffLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      staffSession.clear()
      queryClient.removeQueries({ queryKey: queryKeys.staffAuth.me() })
      navigate({ to: ROUTES.STAFF_LOGIN })
    },
  })
}
