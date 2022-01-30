import { z } from 'zod'

export const LocationState = z
  .object({
    isWorkspacePending: z.boolean().nullish(),
  })
  .nullable()

export type LocationStateType = z.infer<typeof LocationState>
