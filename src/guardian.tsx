import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from './common/hooks'

export const guardian = (page: JSX.Element, to?: string): JSX.Element => {
  const navigate = useNavigate()
  const { token, user } = useAuth()

  useEffect(() => {
    if (!token && !user) {
      navigate(to ? to : '/', { state: { triedWithoutLogin: true } })
    }
  }, [token, user])

  return page
}

export default guardian
