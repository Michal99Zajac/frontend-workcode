import React, { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  useColorMode,
  Heading,
  Button,
  Stack,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { CheckIcon } from '@chakra-ui/icons'

import { UserType } from '../../../common/schemas'

import classes from './InviteCard.module.scss'

/**
 * isInvited statuses:
 *
 * -1 = invited
 * 0 = never invited invaited
 * 1 = invited once or more
 */
type IsInvited = -1 | 0 | 1

interface InviteCardProps {
  user: UserType
}

export function InviteCard(props: InviteCardProps): JSX.Element {
  const { user } = props
  const { colorMode } = useColorMode()
  const [isInvited, setIsInvited] = useState<IsInvited>(0)
  const isDark = colorMode === 'dark'
  const isNotInvited = isInvited !== -1

  const getInviteStatus = useCallback(() => {
    switch (isInvited) {
      case 0:
        return 'invite'
      case 1:
        return 'invite again'
      case -1:
        return 'invited'
      default:
        throw new Error('isInvited is out of range')
    }
  }, [isInvited])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isInvited) {
      timeout = setTimeout(() => {
        setIsInvited(1)
      }, 6000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isInvited])

  return (
    <Flex
      className={clsx(
        classes.card,
        isDark ? classes.darkCard : classes.lightCard,
        !isNotInvited && classes.cardInvited
      )}
    >
      <Avatar
        size="sm"
        src={isNotInvited ? user.src || undefined : undefined}
        name={isNotInvited ? `${user.firstname} ${user.lastname}` : undefined}
        icon={!isNotInvited ? <CheckIcon /> : undefined}
        className={clsx(
          classes.invitedAvatar,
          user.src && classes.isSrcAvatar,
          !isNotInvited &&
            (isDark ? classes.invitedAvatarDark : classes.invitedAvatarLight)
        )}
      />
      <Stack ml={2} spacing={0.5}>
        <Heading fontSize="sm" isTruncated>
          {user.firstname} {user.lastname}
        </Heading>
        <Heading fontSize="xx-small" isTruncated>
          {user.email}
        </Heading>
      </Stack>
      <Spacer />
      <Button
        width="min-content"
        isDisabled={isInvited === -1}
        onClick={() => setIsInvited(-1)}
        className={clsx(!isNotInvited && classes.invitedButton)}
      >
        {getInviteStatus()}
      </Button>
    </Flex>
  )
}

export default InviteCard
