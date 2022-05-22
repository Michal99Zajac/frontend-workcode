import { z } from 'zod'

export const InviteStatus = z.enum(['NOT_INVITED', 'INVITED'])

export type InviteStatusType = z.infer<typeof InviteStatus>
