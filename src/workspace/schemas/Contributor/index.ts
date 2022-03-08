import { z } from 'zod'

import { User } from '../../../common/schemas'
import { WorkspaceRole } from '../WorkspaceRole'

export const Contributor = User.extend({
  role: WorkspaceRole,
})

export type Contributor = z.infer<typeof Contributor>
