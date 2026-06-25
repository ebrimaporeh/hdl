import { useMutation } from '@tanstack/react-query'
import { customersApi } from '@/api/customersApi'
import { reportsApi } from '@/api/reportsApi'
import { REPORT_STATUS } from '@/constants'

// Public "Send Me My Reports" widget: looks the email up against existing
// customers and simulates emailing their finalized reports. No real email
// is sent — this is dummy-data only, per spec.
export function useSendReports() {
  return useMutation({
    mutationFn: async (email) => {
      const customer = await customersApi.findByEmail(email)
      if (!customer) {
        const error = new Error('NOT_FOUND')
        error.code = 'NOT_FOUND'
        throw error
      }
      const reports = await reportsApi.listForCustomer(customer.id, { status: REPORT_STATUS.FINAL })
      return { customer, reportCount: reports.length }
    },
  })
}
