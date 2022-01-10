import { useContext } from 'react'

import { AuthContext, AuthContextType } from '../../context/AuthContext'

export const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext)

  if (!auth) throw new Error('Auth Context is not provided')

  return auth
}

export default useAuth
