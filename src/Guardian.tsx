import { useEffect, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate, useLocation, matchPath } from 'react-router-dom'

import { useAuth } from './common/store'

import { routes, WorkcodeRouteObject } from './Routes'

interface GuardianProps {
  children: JSX.Element
}

export const Guardian = (props: GuardianProps): JSX.Element => {
  const { children } = props
  const { token, user } = useAuth()
  const navigation = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const guard = useCallback(
    (route: WorkcodeRouteObject): boolean => {
      if (route.auth) {
        return Boolean(
          user &&
            token &&
            route.forLogged &&
            route.permissions?.some((permission) =>
              user.permissions.includes(permission)
            )
        )
      } else {
        if (!route.forLogged) {
          return user === null && token === null
        } else {
          return true
        }
      }
    },
    [user, token]
  )

  useEffect(() => {
    const route = routes.find((route) =>
      matchPath(route.path, location.pathname)
    )

    if (!route) throw new Error('Unknown pathname')

    if (!guard(route)) {
      toast({
        title: 'Forbbiden',
        description: route.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      navigation(route.redirect || '/')
    }
  }, [location.pathname])

  return children
}

export default Guardian
