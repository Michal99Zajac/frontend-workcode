import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  Avatar,
  useColorMode,
  Spinner,
  Flex,
  Heading,
  Box,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Accordion, AccordionItem } from '../Accordion'
import { MenuWindow } from '../MenuWindow'
import { useAuth } from '../../store'
import { fetchUser } from '../../api'
import { UserType } from '../../schemas/UserSchema'

import classes from './UserBucket.module.scss'

export function UserBucket(): JSX.Element | null {
  const { colorMode } = useColorMode()
  const { user, logout } = useAuth((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isDark = colorMode === 'dark'

  const fetchImage = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!user) throw new Error('User is not logged')
      const response = await fetchUser({ id: user.id })

      setLoggedUser(response)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    fetchImage()
  }, [])

  const logoutUser = useCallback(async () => {
    logout()
    navigate('/')
  }, [user, logout])

  const menuButton = useMemo(
    () => (
      <Avatar
        size="sm"
        fontSize="1.2rem"
        src={loggedUser?.src || undefined}
        name={`${loggedUser?.firstname} ${loggedUser?.lastname}`}
        className={clsx(isDark ? classes.darkAvatar : classes.lightAvatar)}
      />
    ),
    [loggedUser]
  )

  if (isLoading) return <Spinner />

  return (
    <MenuWindow
      title="User"
      placement="right-end"
      menuButton={menuButton}
      menuButtonClassName={clsx(
        classes.menu,
        isDark ? classes.darkMenu : classes.lightMenu
      )}
    >
      <Flex py={2} px={3} alignItems="center">
        <Avatar
          size="xs"
          fontSize="1.2rem"
          src={loggedUser?.src || undefined}
          name={`${loggedUser?.firstname} ${loggedUser?.lastname}`}
          className={clsx(isDark ? classes.darkAvatar : classes.lightAvatar)}
          mr={2}
        />
        <Stack spacing={0}>
          <Heading size="sm">{`${loggedUser?.firstname} ${loggedUser?.lastname}`}</Heading>
          <Text fontSize="xs">{loggedUser?.email}</Text>
        </Stack>
      </Flex>
      <Accordion isInitialOpen title="Actions">
        <AccordionItem isClickable>
          <Box fontSize="xs" as={Link} to="/config">
            config
          </Box>
        </AccordionItem>
        <AccordionItem isClickable>
          <Box fontSize="xs" as={Link} to="/workspace/menu">
            menu
          </Box>
        </AccordionItem>
        <AccordionItem isClickable={true}>
          <Box fontSize="xs" onClick={logoutUser}>
            logout
          </Box>
        </AccordionItem>
      </Accordion>
    </MenuWindow>
  )
}

export default UserBucket
