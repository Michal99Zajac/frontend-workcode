import React from 'react'
import { Tag, Avatar, TagLabel, SkeletonCircle, HStack } from '@chakra-ui/react'

import { User } from '../../../common/schemas'

interface AvatarTagProps {
  user?: User
}

export function AvatarTag(props: AvatarTagProps): JSX.Element {
  const { user } = props

  if (!user) return <SkeletonCircle size="5" />

  return (
    <HStack position="relative">
      <Avatar
        size="sm"
        src={user.src || undefined}
        name={`${user.name} ${user.lastname}`}
      />
      <Tag
        position="absolute"
        transition="all 0.6s"
        overflow="hidden"
        size="lg"
        left={8}
        colorScheme="gray"
        minW="0px"
        borderRadius="full"
      >
        <TagLabel>{`${user.name} ${user.lastname}`}</TagLabel>
      </Tag>
    </HStack>
  )
}

export default AvatarTag
