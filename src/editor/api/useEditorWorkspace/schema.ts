import { z } from 'zod'

import { ApiError } from 'common/schemas'
import { Editor } from 'editor/schemas'

export const Response = Editor

export const ErrorResponse = ApiError

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
