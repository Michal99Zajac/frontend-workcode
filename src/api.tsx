import React, { useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'common/store'
import { useToast } from 'common/hooks'

import { env } from './env'

export const api = axios.create({
  baseURL: env.API_URL,
})

export default api

// ================= PROVIDER =================
interface Props {
  children: React.ReactNode
  api: AxiosInstance
}

export function Api(props: Props): JSX.Element {
  const { children, api } = props
  const { logout, token } = useAuth((store) => ({
    logout: store.logout,
    token: store.token,
  }))
  const navigate = useNavigate()
  const runToast = useToast()

  // if 401 then clear user and redirect
  // if token then set up
  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        if (config.headers && token)
          config.headers['Authorization'] = `Bearer ${token}`
        return config
      },
      (error) => Promise.reject(error)
    )

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response.status === 401 &&
          error.config.url !== '/auth/signin'
        ) {
          runToast(
            { message: 'You are not logged' },
            'Authorization',
            'warning'
          )
          navigate('/auth/signin')
          logout()
        }
        return Promise.reject(error)
      }
    )
  }, [])

  return <>{children}</>
}
