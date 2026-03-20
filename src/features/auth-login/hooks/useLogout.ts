import { useRouter } from 'next/navigation'

import { useSessionStore } from '@/entities/session/store/useSessionStore'

export const useLogout = () => {
  const router = useRouter()
  const clearSession = useSessionStore(s => s.clearSession)

  const logout = () => {
    clearSession()
    document.cookie = 'orgst-token=; path=/; max-age=0'
    router.push('/login')
  }

  return { logout }
}
