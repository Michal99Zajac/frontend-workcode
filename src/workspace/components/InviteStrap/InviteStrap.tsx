import React, { useState } from 'react'
import {
  Avatar,
  Heading,
  Stack,
  Flex,
  Spacer,
  Tooltip,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { AddIcon, QuestionOutlineIcon, RepeatIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

import { errorConnect } from 'common/utils'
import { User } from 'common/schemas'
import { Form, useInvite } from 'workspace/api/useInvite'

import { InviteStatusType } from './InviteStatus'

interface InviteStrapProps {
  user: User
  workspaceId: string
}

export function InviteStrap(props: InviteStrapProps): JSX.Element {
  const errorBG = useColorModeValue('red.50', 'red.300')
  const hoverStrap = useColorModeValue('gray.50', 'gray.600')

  const { user, workspaceId } = props
  const { t } = useTranslation()
  const [status, setStatus] = useState<InviteStatusType>('NOT_INVITED')
  const { mutate, isLoading, error } = useInvite(workspaceId)
  const { handleSubmit } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      _id: user._id,
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        setStatus('INVITED')
      },
    })
  })

  return (
    <Flex
      alignItems="center"
      bg={error ? errorBG : undefined}
      p={2}
      transition="all 0.6s"
      borderRadius={4}
      _hover={{ bg: hoverStrap }}
    >
      <Avatar
        size="sm"
        src={user.src || undefined}
        name={`${user.name} ${user.lastname}`}
      />
      <Stack ml={2} spacing={0.5}>
        <Heading fontSize="sm" isTruncated>
          {user.name} {user.lastname}
        </Heading>
        <Heading fontSize="xx-small" isTruncated>
          {user.email}
        </Heading>
      </Stack>
      <Spacer />
      {error && (
        <Tooltip
          label={
            error.error.key
              ? t('workspace.components.invite_strap.error')
              : errorConnect(error.error)
          }
        >
          <QuestionOutlineIcon alignSelf="center" m={2} />
        </Tooltip>
      )}
      <form onSubmit={onSubmit}>
        <IconButton
          colorScheme="gray"
          aria-label="add user"
          size="sm"
          icon={status === 'NOT_INVITED' ? <AddIcon /> : <RepeatIcon />}
          variant="ghost"
          type="submit"
          isLoading={isLoading}
        />
      </form>
    </Flex>
  )
}

export default InviteStrap
