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
import { useTranslation } from 'react-i18next'

import { User } from 'common/schemas'
import { useAuth } from 'common/store'

import { AvatarButtonStyle } from './styles'

interface UserBucketProps {
  user: User
}

export function UserBucket(props: UserBucketProps): JSX.Element | null {
  const { user } = props
  const { t } = useTranslation()
  const logout = useAuth((store) => store.logout)
  const navigate = useNavigate()

  const logoutUser = useCallback(async () => {
    logout()
    navigate('/')
  }, [user, logout])

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
            src={user?.src || undefined}
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
          {t('common.components.user_bucket.options.configuration')}
        </MenuItem>
        <MenuItem as={Link} to="/workspace">
          {t('common.components.user_bucket.options.workspaces')}
        </MenuItem>
        <MenuItem as={Link} to="/">
          {t('common.components.user_bucket.options.menu')}
        </MenuItem>
        <MenuItem onClick={logoutUser}>
          {t('common.components.user_bucket.options.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserBucket
