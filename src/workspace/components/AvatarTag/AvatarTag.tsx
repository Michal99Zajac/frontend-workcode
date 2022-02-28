import React from 'react'
import { Tag, Avatar, TagLabel, SkeletonCircle, HStack } from '@chakra-ui/react'

import { UserType } from '../../../common/schemas'

interface AvatarTagProps {
  user?: UserType
}

export function AvatarTag(props: AvatarTagProps): JSX.Element {
  const { user } = props

  if (!user) return <SkeletonCircle size="5" />

  return (
    <HStack position="relative">
      <Avatar
        size="sm"
        src={user.src || undefined}
        name={`${user.firstname} ${user.lastname}`}
        sx={{
          '& + span': {
            width: '0px',
            maxWidth: 'max-content',
            p: '0px',
          },
          '&:hover + span': {
            width: '400px',
            px: 3,
          },
        }}
      />
      <Tag
        position="absolute"
        transition="all 0.6s"
        overflow="hidden"
        size="lg"
        left={8}
        colorScheme="twitter"
        minW="0px"
        borderRadius="full"
      >
        <TagLabel>{`${user.firstname} ${user.lastname}`}</TagLabel>
      </Tag>
    </HStack>
  )
}

export default AvatarTag
