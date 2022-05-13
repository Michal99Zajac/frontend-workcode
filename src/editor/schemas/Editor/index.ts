import { z } from 'zod'

import { _ID } from 'common/schemas'
import { Workspace } from 'workspace/schemas'

export const Editor = z.object({
  _id: _ID,
  content: z.string(),
  workspace: Workspace,
})

export type Editor = z.infer<typeof Editor>
