import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAuth } from './common/hooks'

const guardRoutes = ['/workspace', '/config']

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
      guardRoutes.some((route) =>
        location.pathname.toLocaleLowerCase().includes(route)
      )

    if (isForbbiden) {
      toast({
        title: 'Forbbiden',
        description: 'sign in for access',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      navigation('/')
    }
  }, [location.pathname])

  return children
}

export default Guardian
