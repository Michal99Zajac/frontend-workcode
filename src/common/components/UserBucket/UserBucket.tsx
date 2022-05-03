import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Flex,
  Heading,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  SkeletonCircle,
} from '@chakra-ui/react'

import { useAuth } from '../../store'
import { fetchUser } from '../../api'
import { User } from '../../schemas/User'

import { AvatarButtonStyle } from './styles'

export function UserBucket(): JSX.Element | null {
  const { user, logout } = useAuth((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!user) throw new Error('User is not logged')
      const response = await fetchUser({ id: user._id })

      setLoggedUser(response.user)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [user])

  const logoutUser = useCallback(async () => {
    logout()
    navigate('/')
  }, [user, logout])

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  if (isLoading) return <SkeletonCircle />

  return (
    <Menu placement="right-start">
      <MenuButton>
        <Avatar
          {...AvatarButtonStyle}
          src={loggedUser?.src || undefined}
          name={`${loggedUser?.name} ${loggedUser?.lastname}`}
        />
      </MenuButton>
      <MenuList zIndex="modal">
        <Flex py={2} px={3} alignItems="center">
          <Avatar
            size="sm"
            src={loggedUser?.src || undefined}
            name={`${loggedUser?.name} ${loggedUser?.lastname}`}
            mr={2}
          />
          <Stack spacing={0}>
            <Heading size="sm">{`${loggedUser?.name} ${loggedUser?.lastname}`}</Heading>
            <Text fontSize="xs">{loggedUser?.email}</Text>
          </Stack>
        </Flex>
        <MenuDivider />
        <MenuItem as={Link} to="/config">
          Configuration
        </MenuItem>
        <MenuItem as={Link} to="/workspace">
          Workspaces
        </MenuItem>
        <MenuItem as={Link} to="/">
          Menu
        </MenuItem>
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserBucket
