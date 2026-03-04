import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { Session } from '@/entities/session/model/Session'

interface SessionStore {
  session: Session | null
  isAuthenticated: boolean
  setSession(s: Session): void
  clearSession(): void
}

export const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      set => ({
        session: null,
        isAuthenticated: false,
        setSession: session => set({ session, isAuthenticated: true }),
        clearSession: () => set({ session: null, isAuthenticated: false }),
      }),
      { name: 'orgst-session' },
    ),
    { name: 'session-store' },
  ),
)
