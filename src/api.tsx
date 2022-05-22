import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAuth } from 'common/store'
import { useToast } from 'common/hooks'
import { FullLoading } from 'common/components'

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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const runToast = useToast()
  const [api, setApi] = useState<AxiosInstance | null>(null)
  const { i18n } = useTranslation()

  useEffect(() => {
    setApi(() => {
      const headers: Record<string, string> = {
        'Accept-Language': i18n.language,
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
              { message: t('api.toast.warning.message') },
              t('api.toast.warning.title'),
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
  }, [token, i18n.language])

  if (!api) return <FullLoading />

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
