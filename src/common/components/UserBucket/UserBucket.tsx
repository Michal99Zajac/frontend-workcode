import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

  if (isLoading) return <Spinner />

  return (
    <Menu placement="right-end">
      <MenuButton
        className={clsx(
          classes.menu,
          isDark ? classes.darkMenu : classes.lightMenu
        )}
      >
        <Avatar
          size="sm"
          fontSize="1.2rem"
          src={loggedUser?.src || undefined}
          name={`${loggedUser?.firstname} ${loggedUser?.lastname}`}
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
        <MenuItem onClick={logoutUser}>logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserBucket
