import { Permission } from '../../permissions'

export interface AuthUser {
  id: string
  email: string
  permissions: Permission[]
}

export default AuthUser
