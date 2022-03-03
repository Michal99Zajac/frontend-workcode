import { z } from 'zod'

import { Workspace, CodeType } from '../../schemas'

export const FormCode = z.enum([...CodeType.options, 'ALL'])

export const Form = z.object({
  workspace: z.string(),
  owner: z.string(),
  self: z.boolean().default(false),
  code: FormCode,
})

export const Response = z.object({
  workspaces: Workspace.array(),
})

export const Fail = z.object({
  error: z.string(),
})

export type FormType = z.infer<typeof Form>

export type FormCodeType = z.infer<typeof FormCode>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
