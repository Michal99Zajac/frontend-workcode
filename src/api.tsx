import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'common/store'
import { useToast } from 'common/hooks'

import { env } from './env'

export let api = axios.create({
  baseURL: env.API_URL,
})

export default api

// ================= PROVIDER =================
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

  useEffect(() => {
    // create new instance of api
    const newApi = axios.create({
      baseURL: env.API_URL,
    })

    // if token then set up
    newApi.interceptors.request.use(
      (config) => {
        if (config.headers && token)
          config.headers['Authorization'] = `Bearer ${token}`
        return config
      },
      (error) => Promise.reject(error)
    )

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

    api = newApi
  }, [token])

  return <>{children}</>
}
