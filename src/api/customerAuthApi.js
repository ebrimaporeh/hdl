import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'

// Customer portal authentication.
export const customerAuthApi = {
  login: ({ email, password }) =>
    API_ENABLED
      ? apiClient.post('/portal/auth/login/', { email, password }).then((r) => r.data)
      : simulateRequest(() => {
          const customer = mockDb.customers
            .list()
            .find((c) => c.email.toLowerCase() === email.trim().toLowerCase())
          if (!customer || customer.password !== password) {
            throw new Error('Invalid email or password.')
          }
          const { password: _password, ...user } = customer
          return { user, token: `mock-customer-token-${user.id}` }
        }),

  me: (customerId) =>
    API_ENABLED
      ? apiClient.get('/portal/auth/me/').then((r) => r.data)
      : simulateRequest(() => {
          const customer = mockDb.customers.get(customerId)
          if (!customer) throw new Error('Not authenticated')
          const { password: _password, ...user } = customer
          return user
        }),

  logout: () =>
    API_ENABLED ? apiClient.post('/portal/auth/logout/').then((r) => r.data) : simulateRequest(() => ({ ok: true })),
}
