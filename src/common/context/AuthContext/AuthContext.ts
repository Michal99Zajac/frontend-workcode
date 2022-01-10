import React from 'react'

import { AuthUser } from '../../types'

export interface AuthContextType {
  user: AuthUser | null
  token: string | null
  login: (user: AuthUser, token: string) => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
})

export default AuthContext
