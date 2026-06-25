import { storage } from '@/utils/storage'

const STAFF_KEY = 'hdl_staff_session'
const CUSTOMER_KEY = 'hdl_customer_session'

export const staffSession = {
  get: () => storage.get(STAFF_KEY),
  set: (session) => storage.set(STAFF_KEY, session),
  clear: () => storage.remove(STAFF_KEY),
}

export const customerSession = {
  get: () => storage.get(CUSTOMER_KEY),
  set: (session) => storage.set(CUSTOMER_KEY, session),
  clear: () => storage.remove(CUSTOMER_KEY),
}
