import { z } from 'zod'

import { Workspace } from '../../schemas/Workspace'

export const Response = z.object({
  workspaces: Workspace.array(),
})

export const Fail = z.object({
  error: z.string(),
})

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
