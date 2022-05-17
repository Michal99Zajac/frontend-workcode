import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'common/store'
import { useToast } from 'common/hooks'

import { env } from './env'

interface Props {
  children: React.ReactNode
}

export function Api(props: Props): JSX.Element {
  const { children } = props
  const { logout, token } = useAuth((store) => ({
    logout: store.logout,
    token: store.token,
  }))
  const navigate = useNavigate()
  const runToast = useToast()
  const [api, setApi] = useState<AxiosInstance | null>(null)

  useEffect(() => {
    setApi(() => {
      const headers: Record<string, string> = {
        'Accept-Language': 'pl',
      }

      if (token) headers['Authorization'] = `Bearer ${token}`

      const newApi = axios.create({
        baseURL: env.API_URL,
        headers: headers,
      })

      // if 401 then clear user and redirect
      newApi.interceptors.response.use(
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

      return newApi
    })
  }, [token])

  if (!api) return <div>Loading...</div>

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>
}

interface ApiContext {
  api: AxiosInstance
}

export const ApiContext = React.createContext<ApiContext>({
  api: axios.create({
    baseURL: env.API_URL,
  }),
})

export const useApi = () => {
  const { api } = useContext(ApiContext)

  if (!api) throw new Error('Api context is not provided')

  return api
}
