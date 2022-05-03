import { z } from 'zod'

import { User } from 'common/schemas/User'
import { RoleArray } from 'role'

export const AuthUser = z.intersection(z.object({ roles: RoleArray }), User)

export type AuthUser = z.infer<typeof AuthUser>
