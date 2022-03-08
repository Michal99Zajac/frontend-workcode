import { z } from 'zod'

import { Permission } from '../../../permissions'

export const AuthUser = z.object({
  id: z.string().uuid(),
  email: z.string(),
  permissions: Permission.array(),
})

export type AuthUser = z.infer<typeof AuthUser>
