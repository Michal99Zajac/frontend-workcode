import { z } from 'zod'

import { User, CodeType, Contributor, _ID } from 'common/schemas'

export const Workspace = z.object({
  _id: _ID,
  name: z.string(),
  code: CodeType,
  createdAt: z.string(),
  author: User,
  contributors: Contributor.array(),
})

export type Workspace = z.infer<typeof Workspace>
