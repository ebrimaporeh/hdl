import { apiClient, API_ENABLED } from './client'
import { simulateRequest } from '@/services/mockApi'
import { mockDb } from '@/services/mockDb'
import { RESULT_TYPES } from '@/constants'

export const testTypesApi = {
  list: () =>
    API_ENABLED
      ? apiClient.get('/test-types/').then((r) => r.data)
      : simulateRequest(() => mockDb.testTypes.list()),

  get: (id) =>
    API_ENABLED
      ? apiClient.get(`/test-types/${id}/`).then((r) => r.data)
      : simulateRequest(() => {
          const testType = mockDb.testTypes.get(id)
          if (!testType) throw new Error('Test type not found')
          return testType
        }),

  create: (data) =>
    API_ENABLED
      ? apiClient.post('/test-types/', data).then((r) => r.data)
      : simulateRequest(() =>
          mockDb.testTypes.insert({
            // New services capture the marketing/detail info; the structured
            // result template defaults to a simple narrative until configured.
            resultType: RESULT_TYPES.NARRATIVE,
            fields: [],
            ...data,
          }),
        ),

  update: (id, data) =>
    API_ENABLED
      ? apiClient.patch(`/test-types/${id}/`, data).then((r) => r.data)
      : simulateRequest(() => {
          const updated = mockDb.testTypes.update(id, data)
          if (!updated) throw new Error('Test type not found')
          return updated
        }),
}
