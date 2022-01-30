import { z } from 'zod'

import { UserWorkspaceStatus } from '../../schemas/UserWorkspaceStatus'

export const Form = z.object({
  workspaceId: z.string().uuid(),
})

export const Response = z.object({
  id: z.string().uuid(),
  status: UserWorkspaceStatus,
})

export const Fail = z.object({
  error: z.string(),
})

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
