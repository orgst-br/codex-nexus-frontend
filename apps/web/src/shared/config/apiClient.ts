import createClient from 'openapi-fetch'

// Quando os types forem gerados pelo script generate-api-types.sh,
// descomente a linha abaixo e remova o 'any':
// import type { paths } from '@/shared/types/api'

const apiClient = createClient({
  baseUrl: process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:8000/api/v1',
})

export default apiClient
