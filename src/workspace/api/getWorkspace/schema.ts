import { z } from 'zod'

import { Workspace } from '../../schemas/Workspace'

export const Form = z.object({
  workspaceId: z.string().uuid(),
})

export const Response = z.object({
  workspace: Workspace,
})

export const Fail = z.object({
  error: z.string(),
})

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
