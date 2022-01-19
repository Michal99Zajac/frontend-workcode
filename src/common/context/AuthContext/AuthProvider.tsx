import React, { useReducer, useCallback } from 'react'

import { AuthUserType } from '../../schemas'

import AuthContext from './AuthContext'
import { authReducer, initialAuth } from './reducer'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const { children } = props
  const [state, dispatch] = useReducer(authReducer, initialAuth, () => {
    return {
      user: JSON.parse(window.localStorage.getItem('user') || 'null'),
      token: JSON.parse(window.localStorage.getItem('token') || 'null'),
    }
  })

  const login = useCallback((user: AuthUserType, token: string) => {
    dispatch({ type: 'SET_USER', user: user })
    dispatch({ type: 'SET_TOKEN', token: token })

    // save to local storage
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('token', JSON.stringify(token))
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'SET_USER', user: null })
    dispatch({ type: 'SET_TOKEN', token: null })

    // delete data from local storage
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
