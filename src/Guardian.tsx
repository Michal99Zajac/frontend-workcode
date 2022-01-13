import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAuth } from './common/hooks'

import { routes } from './Routes'

interface GuardianProps {
  children: JSX.Element
}

export const Guardian = (props: GuardianProps): JSX.Element => {
  const { children } = props
  const { token, user } = useAuth()
  const navigation = useNavigate()
  const location = useLocation()
  const toast = useToast()

  useEffect(() => {
    const isForbbiden =
      !token &&
      !user &&
      routes.some((route) =>
        location.pathname.toLocaleLowerCase().includes(route.path)
      )

    if (isForbbiden) {
      toast({
        title: 'Forbbiden',
        description: 'sign in for access',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      navigation('/')
    }
  }, [location.pathname])

  return children
}

export default Guardian
