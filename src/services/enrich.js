import { mockDb } from '@/services/mockDb'

// Mirrors the joins a real backend would perform server-side for these
// nested-resource endpoints (test request -> test type/customer/order, etc).
export function enrichTestRequest(testRequest) {
  if (!testRequest) return testRequest
  return {
    ...testRequest,
    testType: mockDb.testTypes.get(testRequest.testTypeId),
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
