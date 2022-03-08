import { z } from 'zod'

/**
 * describe location state from react-router
 */
export const LocationState = z
  .object({
    // check if user should wait for workspace access
    isWorkspacePending: z.boolean().nullish(),
  })
  .nullable()

export type LocationState = z.infer<typeof LocationState>
