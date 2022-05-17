import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { AuthUser } from 'auth/schemas/AuthUser'

export interface AuthStore {
  user: AuthUser | null
  token: string | null
  login: (user: AuthUser, token: string) => void
  logout: () => void
}

export const useAuth = create<AuthStore>(
  devtools(
    (set) => ({
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
    }),
    {
      name: 'auth',
      serialize: {
        options: true,
      },
    }
  )
)

export default useAuth
