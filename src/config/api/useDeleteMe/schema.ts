import { z } from 'zod'

import i18n from 'i18n'

export const Form = z.object({
  password: z.string({
    required_error: i18n.t('config.api.delete_me.form.password.required'),
  }),
})

export const Response = z.object({
  message: z.string(),
})

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
