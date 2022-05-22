import { z } from 'zod'

import i18n from 'i18n'
import { User } from 'common/schemas'

export const Form = z.object({
  email: z
    .string({
      required_error: i18n.t('config.api.update_me.form.email.required'),
    })
    .email({ message: i18n.t('config.api.update_me.form.email.email') })
    .nonempty({ message: i18n.t('config.api.update_me.form.email.empty') }),
  name: z
    .string({
      required_error: i18n.t('config.api.update_me.form.name.required'),
    })
    .nonempty(),
  lastname: z
    .string({
      required_error: i18n.t('config.api.update_me.form.lastname.required'),
    })
    .nonempty(),
})

export const Response = User

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
