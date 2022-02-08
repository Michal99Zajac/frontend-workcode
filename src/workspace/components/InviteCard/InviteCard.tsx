import React, { useCallback, useState } from 'react'
import {
  Avatar,
  useColorMode,
  Heading,
  Button,
  Stack,
  Flex,
  Spacer,
  Tooltip,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { CheckIcon, QuestionOutlineIcon, RepeatIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserType } from '../../../common/schemas'
import { WorkspaceType } from '../../schemas'
import { Form, Fail, inviteContributor } from '../../api/inviteContributor'

import classes from './InviteCard.module.scss'
import { InviteStatusType } from './InviteStatus'

interface InviteCardProps {
  user: UserType
  workspace: WorkspaceType
}

export function InviteCard(props: InviteCardProps): JSX.Element {
  const { user, workspace } = props
  const { colorMode } = useColorMode()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<InviteStatusType>('NOT_INVITED')
  const [failMessage, setFailMessage] = useState('')
  const { handleSubmit } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      userId: user.id,
      workspaceId: workspace.id,
    },
  })

  // variables
  const isDark = colorMode === 'dark'

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await inviteContributor(data)
      setFailMessage('')
      setStatus('INVITED')
    } catch (error) {
      const fail = Fail.parse(error)
      setFailMessage(fail.error)
    }
    setIsLoading(false)
  })

  const getButtonMessage = useCallback(() => {
    if (failMessage) return 'try again'

    switch (status) {
      case 'NOT_INVITED':
        return 'invite'
      case 'INVITED':
        return 'repeat'
      default:
        throw new Error('isInvited is out of range')
    }
  }, [status, failMessage])

  return (
    <Flex
      className={clsx(
        classes.card,
        isDark ? classes.darkCard : classes.lightCard
      )}
    >
      <Avatar
        size="sm"
        src={
          status === 'NOT_INVITED' && !failMessage
            ? user.src || undefined
            : undefined
        }
        name={
          status === 'NOT_INVITED' && !failMessage
            ? `${user.firstname} ${user.lastname}`
            : undefined
        }
        icon={
          status === 'INVITED' || failMessage ? (
            failMessage ? (
              <RepeatIcon />
            ) : (
              <CheckIcon />
            )
          ) : undefined
        }
        className={clsx(
          classes.invitedAvatar,
          user.src && classes.isSrcAvatar,
          status === 'INVITED' &&
            (isDark ? classes.invitedAvatarDark : classes.invitedAvatarLight),
          failMessage && classes.failAvatar
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
      {failMessage && (
        <Tooltip label={failMessage}>
          <QuestionOutlineIcon alignSelf="center" m={2} />
        </Tooltip>
      )}
      <form onSubmit={onSubmit}>
        <Button width="150px" type="submit" isLoading={isLoading}>
          {getButtonMessage()}
        </Button>
      </form>
    </Flex>
  )
}

export default InviteCard
