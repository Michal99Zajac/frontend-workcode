import { z } from 'zod'

import i18n from 'i18n'
import { CodeType, ApiError } from 'common/schemas'
import { Workspace } from 'workspace/schemas'

export const Form = z.object({
  name: z
    .string()
    .min(1, {
      message: i18n.t('workspace.api.create_workspace.form.name.min'),
    })
    .max(255, {
      message: i18n.t('workspace.api.create_workspace.form.name.max'),
    }),
  code: CodeType,
})

export const Response = Workspace

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
