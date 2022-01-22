import create from 'zustand'

import { AuthUserType } from '../../schemas/AuthUserSchema'

export interface AuthStore {
  user: AuthUserType | null
  token: string | null
  login: (user: AuthUserType, token: string) => void
  logout: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: JSON.parse(window.localStorage.getItem('user') || 'null'),
  token: JSON.parse(window.localStorage.getItem('token') || 'null'),
  login: (user, token) => {
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('token', JSON.stringify(token))
    set({ user: user, token: token })
  },
  logout: () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))

export default useAuth
