import { z } from 'zod'

export const Role = z.enum(['USER', 'ADMIN'])

export const RoleArray = Role.array()

export type RoleType = z.infer<typeof Role>

export type RoleArrayType = z.infer<typeof RoleArray>

export default Role
