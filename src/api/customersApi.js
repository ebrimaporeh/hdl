import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'

function matchesSearch(customer, search) {
  if (!search) return true
  const q = search.toLowerCase()
  return (
    customer.fullName.toLowerCase().includes(q) ||
    customer.email.toLowerCase().includes(q) ||
    customer.customerId.toLowerCase().includes(q) ||
    customer.phone.toLowerCase().includes(q)
  )
}

export const customersApi = {
  list: (params = {}) =>
    API_ENABLED
      ? apiClient.get('/customers/', { params }).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.customers
            .list()
            .filter((c) => matchesSearch(c, params.search))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ),

  get: (id) =>
    API_ENABLED
      ? apiClient.get(`/customers/${id}/`).then((r) => r.data)
      : simulateRequest(() => {
          const customer = mockDb.customers.get(id)
          if (!customer) throw new Error('Customer not found')
          return customer
        }),

  findByEmail: (email) =>
    API_ENABLED
      ? apiClient.get('/customers/', { params: { email } }).then((r) => r.data[0] ?? null)
      : simulateRequest(() => {
          const q = email.trim().toLowerCase()
          return mockDb.customers.list().find((c) => c.email.toLowerCase() === q) ?? null
        }),

  create: (data) =>
    API_ENABLED
      ? apiClient.post('/customers/', data).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.customers.insert({
            customerId: mockDb.nextCustomerId(),
            createdAt: new Date().toISOString(),
            ...data,
          }),
        ),
}
