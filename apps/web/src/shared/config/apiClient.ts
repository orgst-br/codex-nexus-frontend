import createClient from 'openapi-fetch'

// Quando os types forem gerados pelo script generate-api-types.sh,
// descomente a linha abaixo e remova o 'any':
// import type { paths } from '@/shared/types/api'

const apiClient = createClient<any>({
  baseUrl: process.env['NEXT_PUBLIC_API_URL'] ?? 'http://127.0.0.1:8000/api/v1',
})

// Middleware JWT: injeta Authorization em toda request autenticada.
// Zustand permite ler o store fora do React com getState().
apiClient.use({
  async onRequest({ request }) {
    // Import dinâmico evita dependência circular (shared → entities é proibido em FSD).
    // O middleware roda em runtime, não em tempo de módulo.
    const { useSessionStore } = await import('@/entities/session/store/useSessionStore')
    const token = useSessionStore.getState().session?.accessToken
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
})

export default apiClient
