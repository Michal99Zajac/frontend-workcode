import { z } from 'zod'

import { Workspace } from '../../schemas/Workspace'

export const Form = z.object({
  id: Workspace.shape.id,
  name: Workspace.shape.name
    .min(1, {
      message: 'Name should be at least one characters',
    })
    .max(255, { message: 'Name cant be longer then 255 characters' }),
  description: Workspace.shape.description
    .min(1, {
      message: 'Description should be at least one characters',
    })
    .max(255, { message: 'Description cant be longer then 255 characters' }),
  code: Workspace.shape.code,
})

export const Response = z.object({
  success: z.string(),
  workspace: Workspace,
})

export const Fail = z.object({
  error: z.string(),
})

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>