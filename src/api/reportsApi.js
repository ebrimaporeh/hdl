import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'
import { enrichReport } from '@/services/enrich'
import { TEST_REQUEST_STATUS, REPORT_STATUS } from '@/constants'

function matchesFilters(report, params) {
  if (params.status && report.status !== params.status) return false
  if (params.search) {
    const q = params.search.toLowerCase()
    const enriched = enrichReport(report)
    const haystack = [
      report.reportNumber,
      enriched.testRequest?.customer?.fullName,
      enriched.testRequest?.customer?.customerId,
      enriched.testRequest?.testType?.name,
    ]
      .join(' ')
      .toLowerCase()
    if (!haystack.includes(q)) return false
  }
  return true
}

export const reportsApi = {
  list: (params = {}) =>
    API_ENABLED
      ? apiClient.get('/reports/', { params }).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.reports
            .list()
            .filter((r) => matchesFilters(r, params))
            .map(enrichReport)
            .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt)),
        ),

  get: (id) =>
    API_ENABLED
      ? apiClient.get(`/reports/${id}/`).then((r) => r.data)
      : simulateRequest(() => {
          const report = mockDb.reports.get(id)
          if (!report) throw new Error('Report not found')
          return enrichReport(report)
        }),

  listForCustomer: (customerId, params = {}) =>
    API_ENABLED
      ? apiClient.get('/reports/', { params: { customerId, ...params } }).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.reports
            .list()
            .map(enrichReport)
            .filter((r) => r.testRequest?.customerId === customerId)
            .filter((r) => !params.status || r.status === params.status)
            .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt)),
        ),

  finalize: (id) =>
    API_ENABLED
      ? apiClient.post(`/reports/${id}/finalize/`).then((r) => r.data)
      : simulateRequest(() =>
          enrichReport(
            mockDb.reports.update(id, { status: REPORT_STATUS.FINAL, finalizedAt: new Date().toISOString() }),
          ),
        ),

  reopen: (id) =>
    API_ENABLED
      ? apiClient.post(`/reports/${id}/reopen/`).then((r) => r.data)
      : simulateRequest(() => {
          const report = mockDb.reports.update(id, { status: REPORT_STATUS.DRAFT, finalizedAt: null })
          mockDb.testRequests.update(report.testRequestId, {
            status: TEST_REQUEST_STATUS.IN_PROGRESS,
            updatedAt: new Date().toISOString(),
          })
          return enrichReport(report)
        }),
}
