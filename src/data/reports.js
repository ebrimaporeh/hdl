import { REPORT_STATUS } from '@/constants'

// One Report is 1:1 with a completed TestRequest.
export const reports = [
  { id: 'rep_1', reportNumber: 'HDL-R-0001', testRequestId: 'tr_1', status: REPORT_STATUS.FINAL, generatedAt: '2026-06-10T15:05:00.000Z', finalizedAt: '2026-06-10T15:30:00.000Z' },
  { id: 'rep_2', reportNumber: 'HDL-R-0002', testRequestId: 'tr_2', status: REPORT_STATUS.FINAL, generatedAt: '2026-06-10T15:15:00.000Z', finalizedAt: '2026-06-10T15:30:00.000Z' },
  { id: 'rep_3', reportNumber: 'HDL-R-0003', testRequestId: 'tr_3', status: REPORT_STATUS.FINAL, generatedAt: '2026-06-12T16:05:00.000Z', finalizedAt: '2026-06-12T16:20:00.000Z' },
  { id: 'rep_4', reportNumber: 'HDL-R-0004', testRequestId: 'tr_6', status: REPORT_STATUS.DRAFT, generatedAt: '2026-06-18T11:05:00.000Z', finalizedAt: null },
  { id: 'rep_5', reportNumber: 'HDL-R-0005', testRequestId: 'tr_7', status: REPORT_STATUS.FINAL, generatedAt: '2026-06-21T17:05:00.000Z', finalizedAt: '2026-06-21T17:30:00.000Z' },
  { id: 'rep_6', reportNumber: 'HDL-R-0006', testRequestId: 'tr_8', status: REPORT_STATUS.FINAL, generatedAt: '2026-06-23T12:05:00.000Z', finalizedAt: '2026-06-23T12:20:00.000Z' },
]
