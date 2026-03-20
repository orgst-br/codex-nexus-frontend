import { useRouter } from 'next/navigation'

import { useLoginMutation } from '@/entities/session/api/mutations/loginMutation'
import type { LoginInput } from '@/entities/session/schema/SessionSchema'
import { useSessionStore } from '@/entities/session/store/useSessionStore'
import { isAdmin } from '@/shared/utils/roles'

export const useLogin = () => {
  const router = useRouter()
  const { mutateAsync, isPending, error } = useLoginMutation()
  const setSession = useSessionStore(s => s.setSession)

  const login = async (input: LoginInput) => {
    const session = await mutateAsync(input)
    setSession(session)
    document.cookie = `orgst-token=${session.accessToken}; path=/; SameSite=Lax`
    router.push(isAdmin(session.user.roles) ? '/admin' : '/portal/dashboard')
  }

  return { login, isPending, error }
}
