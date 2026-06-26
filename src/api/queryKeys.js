export const queryKeys = {
  staffAuth: {
    me: () => ['staffAuth', 'me'],
  },
  customerAuth: {
    me: () => ['customerAuth', 'me'],
  },
  customers: {
    all: () => ['customers'],
    list: (params) => ['customers', 'list', params],
    detail: (id) => ['customers', 'detail', id],
    history: (id) => ['customers', 'history', id],
  },
  testTypes: {
    all: () => ['testTypes'],
    detail: (id) => ['testTypes', 'detail', id],
  },
  blog: {
    all: () => ['blog'],
    detail: (slug) => ['blog', 'detail', slug],
  },
  orders: {
    all: () => ['orders'],
    detail: (id) => ['orders', 'detail', id],
  },
  testRequests: {
    all: () => ['testRequests'],
    list: (params) => ['testRequests', 'list', params],
    detail: (id) => ['testRequests', 'detail', id],
  },
  reports: {
    all: () => ['reports'],
    list: (params) => ['reports', 'list', params],
    detail: (id) => ['reports', 'detail', id],
    forCustomer: (customerId, params) => ['reports', 'customer', customerId, params],
  },
}
