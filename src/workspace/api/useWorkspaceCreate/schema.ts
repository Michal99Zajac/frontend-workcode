import { z } from 'zod'

import { CodeType, ApiError } from 'common/schemas'
import { Workspace } from 'workspace/schemas'

export const Form = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name should be at least one characters',
    })
    .max(255, { message: 'Name cant be longer then 255 characters' }),
  code: CodeType,
})

export const Response = Workspace

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
