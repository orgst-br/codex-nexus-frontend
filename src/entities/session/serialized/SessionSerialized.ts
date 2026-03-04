export interface TokenResponse {
  access: string
}

export interface MeResponse {
  id: string
  username: string
  email: string | null
  display_name: string | null
  roles: string[]
  is_staff: boolean
}
