import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'
import { enrichTestRequest } from '@/services/enrich'
import { TEST_REQUEST_STATUS } from '@/constants'

function enrichOrder(order) {
  const testRequests = mockDb.testRequests
    .list()
    .filter((tr) => tr.orderId === order.id)
    .map(enrichTestRequest)
  return { ...order, testRequests }
}

export const ordersApi = {
  listForCustomer: (customerId) =>
    API_ENABLED
      ? apiClient.get('/orders/', { params: { customerId } }).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.orders
            .list()
            .filter((o) => o.customerId === customerId)
            .map(enrichOrder)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ),

  get: (id) =>
    API_ENABLED
      ? apiClient.get(`/orders/${id}/`).then((r) => r.data)
      : simulateRequest(() => {
          const order = mockDb.orders.get(id)
          if (!order) throw new Error('Order not found')
          return enrichOrder(order)
        }),

  create: ({ customerId, testTypeIds, createdBy }) =>
    API_ENABLED
      ? apiClient.post('/orders/', { customerId, testTypeIds, createdBy }).then((r) => r.data)
      : simulateRequest(() => {
          const order = mockDb.orders.insert({
            orderNumber: mockDb.nextOrderNumber(),
            customerId,
            createdBy,
            createdAt: new Date().toISOString(),
          })
          const testRequests = testTypeIds.map((testTypeId) =>
            mockDb.testRequests.insert({
              orderId: order.id,
              customerId,
              testTypeId,
              status: TEST_REQUEST_STATUS.PENDING,
              values: {},
              updatedAt: new Date().toISOString(),
            }),
          )
          return { ...order, testRequests }
        }),
}
