export interface AuthUser {
  id: string
  username: string
  email: string | null
  roles: string[]
}

export interface Session {
  accessToken: string
  user: AuthUser
}
