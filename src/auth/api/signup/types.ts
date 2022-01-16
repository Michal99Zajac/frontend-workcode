export interface Form {
  email: string
  firstname: string
  lastname: string
  password: string
}

export interface Response {
  id: string
}

export interface FormError {
  email?: string
  password?: string
  firstname?: string
  lastname?: string
}
