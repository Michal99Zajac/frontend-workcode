import { z } from 'zod'

import { CodeType } from 'common/schemas'
import { Workspace } from 'workspace/schemas'

export const Code = z.enum([...CodeType.options, 'ALL'])

export const Form = z.object({
  name: z.string(),
  owner: z.string(),
  self: z.boolean().default(false),
  code: Code,
})

export const Response = Workspace.array()

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Code = z.infer<typeof Code>

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
