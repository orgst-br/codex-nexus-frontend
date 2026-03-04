import type { Session } from '@/entities/session/model/Session'
import type { MeResponse, TokenResponse } from '@/entities/session/serialized/SessionSerialized'

const fromTokenAndMe = (token: TokenResponse, me: MeResponse): Session => ({
  accessToken: token.access,
  user: { id: me.id, username: me.username, email: me.email, roles: me.roles },
})

const SessionMapper = { fromTokenAndMe }
export default SessionMapper
