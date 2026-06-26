import { nanoid } from 'nanoid'
import { customers as seedCustomers } from '@/data/customers'
import { staff as seedStaff } from '@/data/staff'
import { orders as seedOrders } from '@/data/orders'
import { testRequests as seedTestRequests } from '@/data/testRequests'
import { reports as seedReports } from '@/data/reports'
import { testTypes as seedTestTypes } from '@/data/testTypes'
import { blogPosts as seedBlogPosts } from '@/data/blog'

const STORAGE_KEY = 'hdl_mock_db_v2'

function seedState() {
  return {
    customers: seedCustomers,
    staff: seedStaff,
    orders: seedOrders,
    testRequests: seedTestRequests,
    reports: seedReports,
    testTypes: seedTestTypes,
    blogPosts: seedBlogPosts,
    counters: {
      customer: seedCustomers.length,
      order: seedOrders.length,
      report: seedReports.length,
    },
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt storage, fall back to seed
  }
  return seedState()
}

let state = loadState()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage full/unavailable — mock data stays in-memory only for this session
  }
}

function makeCollection(key) {
  return {
    list: () => [...state[key]],
    get: (id) => state[key].find((r) => r.id === id),
    insert: (record) => {
      const withId = { id: nanoid(10), ...record }
      state = { ...state, [key]: [...state[key], withId] }
      persist()
      return withId
    },
    update: (id, patch) => {
      let updated
      const next = state[key].map((r) => {
        if (r.id !== id) return r
        updated = { ...r, ...patch }
        return updated
      })
      state = { ...state, [key]: next }
      persist()
      return updated
    },
  }
}

function nextSequence(counterKey, prefix) {
  state = { ...state, counters: { ...state.counters, [counterKey]: state.counters[counterKey] + 1 } }
  persist()
  return `${prefix}-${String(state.counters[counterKey]).padStart(4, '0')}`
}

export const mockDb = {
  customers: makeCollection('customers'),
  staff: makeCollection('staff'),
  orders: makeCollection('orders'),
  testRequests: makeCollection('testRequests'),
  reports: makeCollection('reports'),
  testTypes: makeCollection('testTypes'),
  blogPosts: makeCollection('blogPosts'),
  nextCustomerId: () => nextSequence('customer', 'HDL-C'),
  nextOrderNumber: () => nextSequence('order', 'HDL-O'),
  nextReportNumber: () => nextSequence('report', 'HDL-R'),
  reset: () => {
    state = seedState()
    persist()
  },
}
