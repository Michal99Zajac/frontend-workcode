import { z } from 'zod'

import { CodeType } from '../../../common/schemas'
import { Workspace } from '../../schemas'

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

export type Form = z.infer<typeof Form>

export type FormCode = z.infer<typeof FormCode>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
