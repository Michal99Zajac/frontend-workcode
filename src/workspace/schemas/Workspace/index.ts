import { z } from 'zod'

import { User } from '../../../common/schemas'
import { Contributor } from '../Contributor'
import { CodeType } from '../CodeType'

export const Workspace = z.object({
  id: z.string().uuid(),
  admin: User,
  name: z.string(),
  description: z.string(),
  code: CodeType,
  createdAt: z.date(),
  contributors: Contributor.array(),
})

export type WorkspaceType = z.infer<typeof Workspace>
