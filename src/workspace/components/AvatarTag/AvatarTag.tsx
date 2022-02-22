import React from 'react'
import { Tag, Avatar, TagLabel, SkeletonCircle } from '@chakra-ui/react'

import { UserType } from '../../../common/schemas'

interface AvatarTagProps {
  user?: UserType
}

export function AvatarTag(props: AvatarTagProps): JSX.Element {
  const { user } = props

  if (!user) return <SkeletonCircle size="5" />

  return (
    <Tag size="lg" borderRadius="full">
      <Avatar
        ml="-2"
        mr="2"
        size="xs"
        src={user.src || undefined}
        name={`${user.firstname} ${user.lastname}`}
      />
      <TagLabel>{`${user.firstname} ${user.lastname}`}</TagLabel>
    </Tag>
  )
}

export default AvatarTag
