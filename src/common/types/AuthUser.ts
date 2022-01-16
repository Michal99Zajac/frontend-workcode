import { Permission } from '../../permissions'

/**
 * Authenticated user interface.
 * Used for AuthProvider.
 */
export interface AuthUser {
  id: string
  email: string
  permissions: Permission[]
}

export default AuthUser
