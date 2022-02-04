import { z } from 'zod'

import { Permission } from '../../../permissions'

export const AuthUser = z.object({
  id: z.string().uuid(),
  email: z.string(),
  permissions: Permission.array(),
})

export type AuthUserType = z.infer<typeof AuthUser>
