import { z } from 'zod'

import { User } from '../../../common/schemas'

export const Contributor = User

export type Contributor = z.infer<typeof Contributor>
