import { z } from 'zod'

import { Contributor, UUID } from '../../../common/schemas'

export const Form = z.object({
  workspaceId: UUID,
})

export const Response = z.object({
  contributors: Contributor.array(),
})

export const Fail = z.object({
  error: z.string(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
