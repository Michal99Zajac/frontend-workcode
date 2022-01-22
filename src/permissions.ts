import { z } from 'zod'

export const Permission = z.enum(['USER', 'ADMIN'])

export const PermissionArray = Permission.array()

export type PermissionType = z.infer<typeof Permission>

export type PermissionArrayType = z.infer<typeof PermissionArray>

export default Permission
