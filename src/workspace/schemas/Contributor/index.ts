import { z } from 'zod'

import { User } from '../../../common/schemas'
import { WorkspaceRole } from '../WorkspaceRole'

export const Contributor = User.extend({
  role: WorkspaceRole,
})

export type ContributorType = z.infer<typeof Contributor>
