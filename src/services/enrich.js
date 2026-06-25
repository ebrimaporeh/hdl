import { mockDb } from '@/services/mockDb'
import { getTestTypeById } from '@/data/testTypes'

// Mirrors the joins a real backend would perform server-side for these
// nested-resource endpoints (test request -> test type/customer/order, etc).
export function enrichTestRequest(testRequest) {
  if (!testRequest) return testRequest
  return {
    ...testRequest,
    testType: getTestTypeById(testRequest.testTypeId),
    customer: mockDb.customers.get(testRequest.customerId),
    order: mockDb.orders.get(testRequest.orderId),
    report: mockDb.reports.list().find((r) => r.testRequestId === testRequest.id) ?? null,
  }
}

export function enrichReport(report) {
  if (!report) return report
  const testRequest = mockDb.testRequests.get(report.testRequestId)
  return { ...report, testRequest: enrichTestRequest(testRequest) }
}
