import { useMutation } from '@tanstack/react-query'

import SessionMapper from '@/entities/session/mapper/SessionMapper'
import type { Session } from '@/entities/session/model/Session'
import type { LoginInput } from '@/entities/session/schema/SessionSchema'
import type { MeResponse, TokenResponse } from '@/entities/session/serialized/SessionSerialized'
import apiClient from '@/shared/config/apiClient'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (input: LoginInput): Promise<Session> => {
      const { data: tokenData, error: tokenError } = await apiClient.POST(
        '/accounts/auth/token' as never,
        { body: input },
      )
      if (tokenError) {
        const detail = (tokenError as { detail?: string }).detail
        throw new Error(detail ?? 'Credenciais inválidas')
      }
      const token = tokenData as TokenResponse

      // Busca dados do usuário usando o token recém-emitido
      const { data: meData, error: meError } = await apiClient.GET('/accounts/me' as never, {
        headers: { Authorization: `Bearer ${token.access}` },
      })
      if (meError) throw new Error('Erro ao carregar dados do usuário')

      return SessionMapper.fromTokenAndMe(token, meData as MeResponse)
    },
  })
