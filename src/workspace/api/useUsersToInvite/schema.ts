import { z } from 'zod'

import { User, Pagination } from 'common/schemas'

export const Query = z.object({
  limit: z.number(),
  page: z.number(),
  query: z.string(),
})

export const Response = z.object({
  users: User.array(),
  pagination: Pagination,
})

export const ErrorResponse = z.object({
  message: z.string(),
})

export type Query = z.infer<typeof Query>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
