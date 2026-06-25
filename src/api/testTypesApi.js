import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { testTypes, getTestTypeById } from '@/data/testTypes'

export const testTypesApi = {
  list: () =>
    API_ENABLED
      ? apiClient.get('/test-types/').then((r) => r.data)
      : simulateRequest(() => testTypes),

  get: (id) =>
    API_ENABLED
      ? apiClient.get(`/test-types/${id}/`).then((r) => r.data)
      : simulateRequest(() => {
          const testType = getTestTypeById(id)
          if (!testType) throw new Error('Test type not found')
          return testType
        }),
}
