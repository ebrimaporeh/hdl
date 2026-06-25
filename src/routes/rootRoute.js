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
import { AboutPage } from '@/pages/public/AboutPage'
import { ContactPage } from '@/pages/public/ContactPage'
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
const aboutRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.ABOUT, component: AboutPage })
const contactRoute = createRoute({ getParentRoute: () => publicLayout, path: ROUTES.CONTACT, component: ContactPage })
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

// ─── Router ───────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([homeRoute, servicesRoute, aboutRoute, contactRoute, loginRoute]),
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
  ]),
])

export const router = createRouter({ routeTree })