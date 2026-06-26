export const ROUTES = {
  // Public
  HOME: '/',
  SERVICES: '/services',
  serviceDetail: (id) => `/services/${id}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  blogDetail: (slug) => `/blog/${slug}`,
  PRIVACY: '/privacy',
  TERMS: '/terms',
  LOGIN: '/login',

  // Customer portal
  PORTAL_REPORTS: '/portal/reports',
  portalReportDetail: (id) => `/portal/reports/${id}`,

  // Admin portal
  ADMIN_DASHBOARD: '/admin',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_CUSTOMER_NEW: '/admin/customers/new',
  adminCustomerDetail: (id) => `/admin/customers/${id}`,
  ADMIN_ORDER_NEW: '/admin/orders/new',
  ADMIN_WORKLIST: '/admin/worklist',
  adminTestRequestDetail: (id) => `/admin/test-requests/${id}`,
  ADMIN_REPORTS: '/admin/reports',
  adminReportDetail: (id) => `/admin/reports/${id}`,

  ADMIN_SERVICES: '/admin/services',
  ADMIN_SERVICE_NEW: '/admin/services/new',
  adminServiceEdit: (id) => `/admin/services/${id}/edit`,
  ADMIN_BLOG: '/admin/blog',
  ADMIN_BLOG_NEW: '/admin/blog/new',
  adminBlogEdit: (id) => `/admin/blog/${id}/edit`,
}


export const TEST_REQUEST_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}

export const TEST_REQUEST_STATUS_LABELS = {
  [TEST_REQUEST_STATUS.PENDING]: 'Pending',
  [TEST_REQUEST_STATUS.IN_PROGRESS]: 'In Progress',
  [TEST_REQUEST_STATUS.COMPLETED]: 'Completed',
}

export const REPORT_STATUS = {
  DRAFT: 'draft',
  FINAL: 'final',
}

export const REPORT_STATUS_LABELS = {
  [REPORT_STATUS.DRAFT]: 'Draft',
  [REPORT_STATUS.FINAL]: 'Final',
}

export const RESULT_TYPES = {
  PANEL: 'panel',
  FLAT_PANEL: 'flat-panel',
  QUALITATIVE_LIST: 'qualitative-list',
  NARRATIVE: 'narrative',
}

export const GENDER_OPTIONS = ['Male', 'Female']

export const QUERY_STALE_TIME = {
  SHORT: 1000 * 30,
  MEDIUM: 1000 * 60 * 5,
  LONG: 1000 * 60 * 60,
}
