import React, { useCallback } from 'react'
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
} from '@chakra-ui/react'

import { useAuth } from 'common/store'

import { AvatarButtonStyle } from './styles'

export function UserBucket(): JSX.Element | null {
  const { user, logout } = useAuth((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const navigate = useNavigate()

  const logoutUser = useCallback(async () => {
    logout()
    navigate('/')
  }, [user, logout])

  if (!user) throw Error('User is not logged')

  return (
    <Menu placement="right-start">
      <MenuButton>
        <Avatar
          {...AvatarButtonStyle}
          src={user.src || undefined}
          name={`${user.name} ${user.lastname}`}
        />
      </MenuButton>
      <MenuList zIndex="modal">
        <Flex py={2} px={3} alignItems="center">
          <Avatar
            size="sm"
            src={user.src || undefined}
            name={`${user.name} ${user.lastname}`}
            mr={2}
          />
          <Stack spacing={0}>
            <Heading size="sm">{`${user.name} ${user.lastname}`}</Heading>
            <Text fontSize="xs">{user.email}</Text>
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
