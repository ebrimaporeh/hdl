import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'

// Staff (admin portal) authentication.
export const authApi = {
  login: ({ email, password }) =>
    API_ENABLED
      ? apiClient.post('/auth/login/', { email, password }).then((r) => r.data)
      : simulateRequest(() => {
          const staff = mockDb.staff.list().find((s) => s.email.toLowerCase() === email.trim().toLowerCase())
          if (!staff || staff.password !== password) {
            throw new Error('Invalid email or password.')
          }
          const { password: _password, ...user } = staff
          return { user, token: `mock-staff-token-${user.id}` }
        }),

  me: (staffId) =>
    API_ENABLED
      ? apiClient.get('/auth/me/').then((r) => r.data)
      : simulateRequest(() => {
          const staff = mockDb.staff.get(staffId)
          if (!staff) throw new Error('Not authenticated')
          const { password: _password, ...user } = staff
          return user
        }),

  logout: () => (API_ENABLED ? apiClient.post('/auth/logout/').then((r) => r.data) : simulateRequest(() => ({ ok: true }))),
}
