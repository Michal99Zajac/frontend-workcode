import { z } from 'zod'

import { UserSchema as User } from '../../../common/schemas'
import { CodeType } from '../CodeType'

export const Workspace = z.object({
  id: z.string().uuid(),
  admin: User,
  name: z.string(),
  description: z.string(),
  code: CodeType,
  createdAt: z.date(),
})

export type WorkspaceType = z.infer<typeof Workspace>
