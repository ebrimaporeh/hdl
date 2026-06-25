import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'
import { enrichTestRequest } from '@/services/enrich'
import { getTestTypeById } from '@/data/testTypes'
import { TEST_REQUEST_STATUS, REPORT_STATUS } from '@/constants'

function matchesFilters(testRequest, params) {
  if (params.status && testRequest.status !== params.status) return false
  if (params.testTypeId && testRequest.testTypeId !== params.testTypeId) return false
  if (params.search) {
    const q = params.search.toLowerCase()
    const customer = mockDb.customers.get(testRequest.customerId)
    const testType = getTestTypeById(testRequest.testTypeId)
    const haystack = [customer?.fullName, customer?.customerId, testType?.name].join(' ').toLowerCase()
    if (!haystack.includes(q)) return false
  }
  return true
}

export const testRequestsApi = {
  list: (params = {}) =>
    API_ENABLED
      ? apiClient.get('/test-requests/', { params }).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.testRequests
            .list()
            .filter((tr) => matchesFilters(tr, params))
            .map(enrichTestRequest)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
        ),

  get: (id) =>
    API_ENABLED
      ? apiClient.get(`/test-requests/${id}/`).then((r) => r.data)
      : simulateRequest(() => {
          const testRequest = mockDb.testRequests.get(id)
          if (!testRequest) throw new Error('Test request not found')
          return enrichTestRequest(testRequest)
        }),

  saveProgress: (id, values) =>
    API_ENABLED
      ? apiClient.patch(`/test-requests/${id}/`, { values, status: TEST_REQUEST_STATUS.IN_PROGRESS }).then((r) => r.data)
      : simulateRequest(() =>
          enrichTestRequest(
            mockDb.testRequests.update(id, {
              values,
              status: TEST_REQUEST_STATUS.IN_PROGRESS,
              updatedAt: new Date().toISOString(),
            }),
          ),
        ),

  markComplete: (id, values) =>
    API_ENABLED
      ? apiClient.post(`/test-requests/${id}/complete/`, { values }).then((r) => r.data)
      : simulateRequest(() => {
          const testRequest = mockDb.testRequests.update(id, {
            values,
            status: TEST_REQUEST_STATUS.COMPLETED,
            updatedAt: new Date().toISOString(),
          })
          let report = mockDb.reports.list().find((r) => r.testRequestId === id)
          if (!report) {
            report = mockDb.reports.insert({
              reportNumber: mockDb.nextReportNumber(),
              testRequestId: id,
              status: REPORT_STATUS.DRAFT,
              generatedAt: new Date().toISOString(),
              finalizedAt: null,
            })
          }
          return { ...enrichTestRequest(testRequest), report }
        }),
}
