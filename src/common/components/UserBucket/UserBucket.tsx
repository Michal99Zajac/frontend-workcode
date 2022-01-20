import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useColorMode,
  Spinner,
} from '@chakra-ui/react'

import { useAuth } from '../../store'
import { fetchUser } from '../../api'

import { LoggedUser } from './types'
import classes from './UserBucket.module.scss'

export function UserBucket(): JSX.Element | null {
  const { colorMode } = useColorMode()
  const { user, logout } = useAuth((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isDark = colorMode === 'dark'

  const fetchImage = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!user) throw new Error('User is not logged')
      const response = await fetchUser({ id: user.id })

      setLoggedUser({
        email: response.email,
        fullname: `${response.name} ${response.lastname}`,
        id: response.id,
        src: response.src,
      })
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    fetchImage()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <Menu>
      <MenuButton
        className={clsx(
          classes.menu,
          isDark ? classes.darkMenu : classes.lightMenu
        )}
      >
        <Avatar
          size="sm"
          fontSize="1.2rem"
          src={loggedUser?.src}
          name={loggedUser?.fullname}
          className={clsx(isDark ? classes.darkAvatar : classes.lightAvatar)}
        />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/config">
          {loggedUser?.email}
        </MenuItem>
        <MenuItem as={Link} to="/workspace/menu">
          menu
        </MenuItem>
        <MenuItem onClick={logout}>logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserBucket
