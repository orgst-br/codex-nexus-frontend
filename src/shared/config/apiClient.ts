import createClient from 'openapi-fetch'

const apiClient = createClient<any>({
  baseUrl: process.env['NEXT_PUBLIC_API_URL'] ?? 'http://127.0.0.1:8000/api/v1',
})

apiClient.use({
  async onRequest({ request }) {
    const { useSessionStore } = await import('@/entities/session/store/useSessionStore')
    const token = useSessionStore.getState().session?.accessToken
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
})

export default apiClient
