import React from 'react'
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Tooltip,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { QuestionOutlineIcon } from '@chakra-ui/icons'

import { Contributor } from 'common/schemas'
import { LeaveIcon } from 'icons/common'
import { useContributorRemove } from 'workspace/api/useContributorRemove'
import { useMode } from 'common/hooks'

interface ContributorStrapProps {
  contributor: Contributor
  workspaceId: string
  isOwner?: boolean
}

export function ContributorStrap(props: ContributorStrapProps): JSX.Element {
  const mode = useMode()

  const { contributor, isOwner, workspaceId } = props
  const { mutate, isLoading, isError, error } = useContributorRemove(
    workspaceId,
    contributor._id
  )
  const { handleSubmit } = useForm()

  const onSubmit = handleSubmit(() => {
    mutate()
  })

  return (
    <Flex
      alignItems="center"
      p={2}
      transition="all 0.6s"
      borderRadius={4}
      _hover={{ bg: mode('gray.50', 'gray.600') }}
      bg={isError ? mode('red.50', 'red.300') : undefined}
    >
      <Avatar
        name={`${contributor.name} ${contributor.lastname}`}
        src={contributor.src || undefined}
        size="sm"
      />
      <Stack ml={2} spacing={0.5}>
        <Heading fontSize="sm" isTruncated mr={2}>
          {contributor.name} {contributor.lastname}
        </Heading>
        <Heading fontSize="xx-small" isTruncated>
          {contributor.email}
        </Heading>
      </Stack>
      <Spacer />
      {error?.error && (
        <Tooltip label={error.error.message}>
          <QuestionOutlineIcon alignSelf="center" m={2} />
        </Tooltip>
      )}
      {isOwner && (
        <form onSubmit={onSubmit}>
          <IconButton
            aria-label="remove contributor"
            colorScheme="gray"
            type="submit"
            variant="ghost"
            icon={<LeaveIcon fill={mode('black', 'white')} />}
            size="sm"
            isLoading={isLoading}
          />
        </form>
      )}
    </Flex>
  )
}

export default ContributorStrap
