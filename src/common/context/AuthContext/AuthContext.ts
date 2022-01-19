import React from 'react'

import { AuthUserType } from '../../schemas'

export interface AuthContextType {
  user: AuthUserType | null
  token: string | null
  login: (user: AuthUserType, token: string) => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
})

export default AuthContext
