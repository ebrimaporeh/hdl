import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import { queryClient } from '@/api/client'
import { queryKeys } from '@/api/queryKeys'
import { authApi } from '@/api/authApi'
import { customerAuthApi } from '@/api/customerAuthApi'
import { staffSession, customerSession } from '@/utils/session'

import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { CustomerPortalLayout } from '@/layouts/CustomerPortalLayout'

import { HomePage } from '@/pages/public/HomePage'
import { ServicesPage } from '@/pages/public/ServicesPage'
import { ServiceDetailPage } from '@/pages/public/ServiceDetailPage'
import { AboutPage } from '@/pages/public/AboutPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { BlogPage } from '@/pages/public/BlogPage'
import { BlogDetailPage } from '@/pages/public/BlogDetailPage'
import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage'
import { TermsOfServicePage } from '@/pages/public/TermsOfServicePage'
import { LoginPage } from '@/pages/public/LoginPage'

import { MyReportsPage } from '@/pages/portal/MyReportsPage'
import { PortalReportDetailPage } from '@/pages/portal/PortalReportDetailPage'

import { DashboardPage } from '@/pages/admin/DashboardPage'
import { CustomersPage } from '@/pages/admin/CustomersPage'
import { CustomerFormPage } from '@/pages/admin/CustomerFormPage'
import { CustomerDetailPage } from '@/pages/admin/CustomerDetailPage'
import { NewOrderPage } from '@/pages/admin/NewOrderPage'
import { WorklistPage } from '@/pages/admin/WorklistPage'
import { ResultEntryPage } from '@/pages/admin/ResultEntryPage'
import { ReportsPage } from '@/pages/admin/ReportsPage'
import { ReportDetailPage } from '@/pages/admin/ReportDetailPage'
import { AdminServicesPage } from '@/pages/admin/AdminServicesPage'
import { ServiceFormPage } from '@/pages/admin/ServiceFormPage'
import { AdminBlogPage } from '@/pages/admin/AdminBlogPage'
import { BlogFormPage } from '@/pages/admin/BlogFormPage'

import { ROUTES } from '@/constants'

const rootRoute = createRootRoute()

// ─── Auth Guards ──────────────────────────────────────────────────────────────

async function requireStaffAuth() {
  const session = staffSession.get()
  if (!session) throw redirect({ to: ROUTES.LOGIN })
  try {
    await queryClient.fetchQuery({ queryKey: queryKeys.staffAuth.me(), queryFn: () => authApi.me(session.id) })
  } catch {
    throw redirect({ to: ROUTES.LOGIN })
  }
}

async function requireCustomerAuth() {
  const session = customerSession.get()
  if (!session) throw redirect({ to: ROUTES.LOGIN })
  try {
    await queryClient.fetchQuery({
      queryKey: queryKeys.customerAuth.me(),
      queryFn: () => customerAuthApi.me(session.id),
    })
  } catch {
    throw redirect({ to: ROUTES.LOGIN })
  }
}

// ─── Public Routes ────────────────────────────────────────────────────────────

const publicLayout = createRoute({ getParentRoute: () => rootRoute, id: 'public', component: PublicLayout })

const homeRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.HOME, component: HomePage })
const servicesRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.SERVICES, component: ServicesPage })
const serviceDetailRoute = createRoute({ getParentRoute: () => publicLayout, path: '/services/$serviceId', component: ServiceDetailPage })
const aboutRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.ABOUT, component: AboutPage })
const contactRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.CONTACT, component: ContactPage })
const blogRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.BLOG, component: BlogPage })
const blogDetailRoute = createRoute({ getParentRoute: () => publicLayout, path: '/blog/$slug', component: BlogDetailPage })
const privacyRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.PRIVACY, component: PrivacyPolicyPage })
const termsRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.TERMS, component: TermsOfServicePage })
const loginRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.LOGIN, component: LoginPage })

// ─── Customer Portal Routes ───────────────────────────────────────────────────

const portalLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'portal',
  component: CustomerPortalLayout,
  beforeLoad: requireCustomerAuth,
})

const portalReportsRoute = createRoute({ getParentRoute: () => portalLayout, path: ROUTES.PORTAL_REPORTS, component: MyReportsPage })
const portalReportDetailRoute = createRoute({
  getParentRoute: () => portalLayout,
  path: '/portal/reports/$reportId',
  component: PortalReportDetailPage,
})

// ─── Admin Portal Routes ──────────────────────────────────────────────────────

const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin',
  component: AdminLayout,
  beforeLoad: requireStaffAuth,
})

const dashboardRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_DASHBOARD, component: DashboardPage })
const customersRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_CUSTOMERS, component: CustomersPage })
const customerNewRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_CUSTOMER_NEW, component: CustomerFormPage })
const customerDetailRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: '/admin/customers/$customerId',
  component: CustomerDetailPage,
})
const orderNewRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_ORDER_NEW, component: NewOrderPage })
const worklistRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_WORKLIST, component: WorklistPage })
const testRequestDetailRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: '/admin/test-requests/$testRequestId',
  component: ResultEntryPage,
})
const reportsRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_REPORTS, component: ReportsPage })
const reportDetailRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: '/admin/reports/$reportId',
  component: ReportDetailPage,
})
const adminServicesRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_SERVICES, component: AdminServicesPage })
const adminServiceNewRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_SERVICE_NEW, component: ServiceFormPage })
const adminServiceEditRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: '/admin/services/$serviceId/edit',
  component: ServiceFormPage,
})
const adminBlogRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_BLOG, component: AdminBlogPage })
const adminBlogNewRoute = createRoute({ getParentRoute: () => adminLayout, path: ROUTES.ADMIN_BLOG_NEW, component: BlogFormPage })
const adminBlogEditRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: '/admin/blog/$blogId/edit',
  component: BlogFormPage,
})

// ─── Router ───────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([
    homeRoute,
    servicesRoute,
    serviceDetailRoute,
    aboutRoute,
    contactRoute,
    blogRoute,
    blogDetailRoute,
    privacyRoute,
    termsRoute,
    loginRoute,
  ]),
  portalLayout.addChildren([portalReportsRoute, portalReportDetailRoute]),
  adminLayout.addChildren([
    dashboardRoute,
    customersRoute,
    customerNewRoute,
    customerDetailRoute,
    orderNewRoute,
    worklistRoute,
    testRequestDetailRoute,
    reportsRoute,
    reportDetailRoute,
    adminServicesRoute,
    adminServiceNewRoute,
    adminServiceEditRoute,
    adminBlogRoute,
    adminBlogNewRoute,
    adminBlogEditRoute,
  ]),
])

export const router = createRouter({ routeTree })