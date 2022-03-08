import { z } from 'zod'

import { Workspace } from '../../schemas/Workspace'

export const Form = z.object({
  workspaceId: z.string().uuid(),
})

export const Response = z.object({
  workspace: Workspace.nullable(),
})

export const Fail = z.object({
  error: z.string(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
