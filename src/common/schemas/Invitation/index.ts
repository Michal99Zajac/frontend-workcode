import { z } from 'zod'

import { Workspace } from 'workspace/schemas'
import { _ID } from 'common/schemas'

export const Invitation = z.object({
  _id: _ID,
  guest: _ID,
  workspace: Workspace,
  createdAt: z.string(),
})

export type Invitation = z.infer<typeof Invitation>
