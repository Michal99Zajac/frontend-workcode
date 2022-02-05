import React, { useEffect, useState } from 'react'
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

interface InviteCardProps {
  user: UserType
}

export function InviteCard(props: InviteCardProps): JSX.Element {
  const { user } = props
  const { colorMode } = useColorMode()
  const [isInvited, setIsInvited] = useState(false)
  const isDark = colorMode === 'dark'

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isInvited) {
      timeout = setTimeout(() => {
        setIsInvited(false)
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
        isInvited && classes.cardInvited
      )}
    >
      <Avatar
        size="sm"
        src={!isInvited ? user.src || undefined : undefined}
        name={!isInvited ? `${user.firstname} ${user.lastname}` : undefined}
        icon={isInvited ? <CheckIcon /> : undefined}
        className={clsx(
          classes.invitedAvatar,
          user.src && classes.isSrcAvatar,
          isInvited &&
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
        width="100px"
        isDisabled={isInvited}
        onClick={() => setIsInvited(true)}
        className={clsx(isInvited && classes.invitedButton)}
      >
        {isInvited ? 'invited' : 'invite'}
      </Button>
    </Flex>
  )
}

export default InviteCard
