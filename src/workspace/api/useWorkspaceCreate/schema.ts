import { z } from 'zod'

import { CodeType } from 'common/schemas'
import { Workspace } from 'workspace/schemas'

export const Form = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name should be at least one characters',
    })
    .max(255, { message: 'Name cant be longer then 255 characters' }),
  description: z
    .string()
    .min(1, {
      message: 'Description should be at least one characters',
    })
    .max(1000, { message: 'Description cant be longer then 1000 characters' }),
  code: CodeType,
})

export const Response = Workspace

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
