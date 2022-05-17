import { useCallback, useMemo } from 'react'
import { useToast } from '@chakra-ui/react'
import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from './common/store'
import { RoleArrayType } from './role'

interface GuardianProps {
  children?: JSX.Element
  permissions?: RoleArrayType // permission to page
  redirect?: string // where to redirect
  notLogged?: boolean // should logged user have access
  auth?: boolean // should user be logged
  message?: string // message for no permissions user
  outlet?: boolean
}

export const Guardian = (props: GuardianProps): JSX.Element => {
  const { permissions, redirect, notLogged, auth, message, children, outlet } =
    props
  const { token, user } = useAuth()
  const hasPermission = useMemo<boolean>(
    () =>
      !auth || !permissions
        ? true
        : Boolean(
            user &&
              permissions?.some((permission) =>
                user?.roles.includes(permission)
              )
          ),
    [user, permissions]
  )
  const toast = useToast()

  const disallow = useCallback(() => {
    toast({
      title: 'Forbbiden',
      description: message,
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })

    return <Navigate to={redirect || '/'} />
  }, [message, redirect])

  /**
   * check if pathname will be changed
   */
  const guard = useCallback(() => {
    if (auth && token === null) return false

    if (notLogged && token !== null) return false

    if (!hasPermission) return false

    return true
  }, [])

  if (!guard()) return disallow()

  if (outlet) return <Outlet />

  if (!children) throw new Error('Guardian should set outlet or children prop')

  return children
}

export default Guardian
