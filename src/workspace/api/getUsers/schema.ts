import { z } from 'zod'

import { User, Navigation, Pagination } from '../../../common/schemas'

export const Form = z.object({
  search: z.string(),
  page: z.number().optional(),
  pagination: Pagination.optional(),
  workspaceId: z.string().optional(),
})

export const Response = z.object({
  users: User.array(),
  count: z.number(),
  navigation: Navigation,
})

export const Fail = z.object({
  error: z.string(),
})

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>