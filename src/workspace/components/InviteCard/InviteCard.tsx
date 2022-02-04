import React, { useState } from 'react'
import {
  Avatar,
  useColorMode,
  Heading,
  Text,
  Button,
  Stack,
  Tooltip,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { CheckIcon } from '@chakra-ui/icons'

import { UserType } from '../../../common/schemas'

import classes from './InviteCard.module.scss'

interface InviteCardProps {
  user: UserType
}

export function InviteCard(props: InviteCardProps): JSX.Element {
  const { user } = props
  const { colorMode } = useColorMode()
  const [isInvited, setIsInvited] = useState(false)
  const isDark = colorMode === 'dark'

  return (
    <Tooltip
      placement="top"
      label={
        <>
          <Text>
            {user.firstname} {user.lastname}
          </Text>
          <Text>{user.email}</Text>
        </>
      }
    >
      <Stack
        className={clsx(
          classes.card,
          isDark ? classes.darkCard : classes.lightCard,
          isInvited && (isDark ? classes.invitedDark : classes.invitedLight)
        )}
      >
        <Avatar
          src={user.src || undefined}
          name={`${user.firstname} ${user.lastname}`}
        />
        <Heading fontSize="sm" isTruncated width="100%" textAlign="center">
          {user.firstname} {user.lastname}
        </Heading>
        <Button
          width="70%"
          isDisabled={isInvited}
          onClick={() => setIsInvited(true)}
        >
          {isInvited ? <CheckIcon /> : 'invite'}
        </Button>
      </Stack>
    </Tooltip>
  )
}

export default InviteCard
