import { APP_SETTINGS } from '@/settings'

function randomDelay() {
  const [min, max] = APP_SETTINGS.api.mockDelay
  return min + Math.random() * (max - min)
}

// Wraps a synchronous mock handler so it behaves like a network call.
export function simulateRequest(handler) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(handler())
      } catch (err) {
        reject(err)
      }
    }, randomDelay())
  })
}
