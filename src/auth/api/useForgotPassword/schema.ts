import { z } from 'zod'

import { ApiError } from 'common/schemas'
import i18n from 'i18n'

export const Form = z.object({
  email: z
    .string({ required_error: i18n.t('auth.api.forgot_password.form.email') })
    .email(),
})

export const Response = z.object({
  message: z.string(),
})

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
