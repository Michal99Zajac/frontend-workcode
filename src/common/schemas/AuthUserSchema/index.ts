import { z } from 'zod'

import { Permission } from '../../../permissions'

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  permissions: Permission.array(),
})

export type AuthUserType = z.infer<typeof AuthUserSchema>
