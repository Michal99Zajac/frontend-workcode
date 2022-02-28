import React from 'react'
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

import { ContributorType } from '../../schemas'
import { LeaveIcon } from '../../../icons/common'

interface ContributorStrapProps {
  contributor: ContributorType
  isOwner?: boolean
}

export function ContributorStrap(props: ContributorStrapProps): JSX.Element {
  const { contributor, isOwner } = props
  const hoverStrap = useColorModeValue('gray.50', 'gray.600')
  const iconColor = useColorModeValue('black', 'white')

  return (
    <Flex
      alignItems="center"
      p={2}
      borderRadius={4}
      _hover={{ bg: hoverStrap }}
    >
      <Avatar
        name={`${contributor.firstname} ${contributor.lastname}`}
        src={contributor.src || undefined}
        size="sm"
      />
      <Stack ml={2} spacing={0.5}>
        <Heading fontSize="sm" isTruncated mr={2}>
          {contributor.firstname} {contributor.lastname}
        </Heading>
        <Heading fontSize="xx-small" isTruncated>
          {contributor.email}
        </Heading>
      </Stack>
      <Spacer />
      {isOwner && (
        <IconButton
          aria-label="remove contributor"
          colorScheme="gray"
          onClick={() => alert(JSON.stringify(contributor))}
          variant="ghost"
          icon={<LeaveIcon fill={iconColor} />}
          size="sm"
        />
      )}
    </Flex>
  )
}

export default ContributorStrap
