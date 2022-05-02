import { z } from 'zod'

import { User, CodeType, Contributor } from '../../../common/schemas'

export const Workspace = z.object({
  id: z.string().uuid(),
  admin: User,
  name: z.string(),
  description: z.string(),
  code: CodeType,
  createdAt: z.date(),
  contributors: Contributor.array(),
})

export type Workspace = z.infer<typeof Workspace>
