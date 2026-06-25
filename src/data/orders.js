// One Order groups all TestRequests created for a customer in a single
// registration visit. Order status is derived from its TestRequests, not stored.
export const orders = [
  { id: 'ord_1', orderNumber: 'HDL-O-0001', customerId: 'cus_1', createdAt: '2026-06-10T10:00:00.000Z', createdBy: 'stf_2' },
  { id: 'ord_2', orderNumber: 'HDL-O-0002', customerId: 'cus_2', createdAt: '2026-06-12T11:30:00.000Z', createdBy: 'stf_2' },
  { id: 'ord_3', orderNumber: 'HDL-O-0003', customerId: 'cus_3', createdAt: '2026-06-20T09:15:00.000Z', createdBy: 'stf_1' },
  { id: 'ord_4', orderNumber: 'HDL-O-0004', customerId: 'cus_4', createdAt: '2026-06-24T14:00:00.000Z', createdBy: 'stf_2' },
  { id: 'ord_5', orderNumber: 'HDL-O-0005', customerId: 'cus_5', createdAt: '2026-06-18T08:45:00.000Z', createdBy: 'stf_1' },
  { id: 'ord_6', orderNumber: 'HDL-O-0006', customerId: 'cus_6', createdAt: '2026-06-21T13:20:00.000Z', createdBy: 'stf_2' },
  { id: 'ord_7', orderNumber: 'HDL-O-0007', customerId: 'cus_1', createdAt: '2026-06-23T10:10:00.000Z', createdBy: 'stf_1' },
  { id: 'ord_8', orderNumber: 'HDL-O-0008', customerId: 'cus_7', createdAt: '2026-06-25T08:00:00.000Z', createdBy: 'stf_2' },
]
