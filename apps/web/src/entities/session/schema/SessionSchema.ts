import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Informe seu email ou usuário'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>
