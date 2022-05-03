import React, { useState } from 'react'
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { QuestionOutlineIcon } from '@chakra-ui/icons'

import { Contributor } from '../../../common/schemas'
import { LeaveIcon } from '../../../icons/common'
import { removeContributor, Form, Fail } from '../../api/removeContributor'

interface ContributorStrapProps {
  contributor: Contributor
  workspaceId: string
  isOwner?: boolean
}

export function ContributorStrap(props: ContributorStrapProps): JSX.Element {
  const { contributor, isOwner, workspaceId } = props
  const hoverStrap = useColorModeValue('gray.50', 'gray.600')
  const iconColor = useColorModeValue('black', 'white')
  const errorBG = useColorModeValue('red.50', 'red.300')
  const [failMessage, setFailMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      userId: contributor._id,
      workspaceId: workspaceId,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await removeContributor(data)
      setFailMessage('')
    } catch (error) {
      const fail = Fail.parse(error)
      setFailMessage(fail.error)
    }
    setIsLoading(false)
  })

  return (
    <Flex
      alignItems="center"
      p={2}
      transition="all 0.6s"
      borderRadius={4}
      _hover={{ bg: hoverStrap }}
      bg={failMessage ? errorBG : undefined}
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
      {failMessage && (
        <Tooltip label={failMessage}>
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
            icon={<LeaveIcon fill={iconColor} />}
            size="sm"
            isLoading={isLoading}
          />
        </form>
      )}
    </Flex>
  )
}

export default ContributorStrap
