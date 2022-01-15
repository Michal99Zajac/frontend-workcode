import { Permission } from '../../../permissions'

export interface Form {
  email: string
  password: string
}

export interface Response {
  id: string
  email: string
  token: string
  permissions: Permission[]
}

export interface Error {
  email?: string
  password?: string
}
