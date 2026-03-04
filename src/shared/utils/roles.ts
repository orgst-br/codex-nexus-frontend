export const RoleKey = {
  ADMIN: 'admin',
  MENTOR: 'mentor',
  MENTORADO: 'mentorado',
} as const

export type RoleKeyType = (typeof RoleKey)[keyof typeof RoleKey]

export const isAdmin = (roles: string[]) => roles.includes(RoleKey.ADMIN)

export const isMentor = (roles: string[]) => roles.includes(RoleKey.MENTOR)

export const isMentorado = (roles: string[]) => roles.includes(RoleKey.MENTORADO)
