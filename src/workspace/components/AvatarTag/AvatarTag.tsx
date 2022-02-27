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
    <HStack w="max-content">
      <Avatar
        size="sm"
        src={user.src || undefined}
        name={`${user.firstname} ${user.lastname}`}
        sx={{
          '& + span': {
            width: '0px',
            p: '0px',
          },
          '&:hover + span': {
            width: '100%',
            px: 3,
          },
        }}
      />
      <Tag
        transition="all 0.3s"
        overflow="hidden"
        size="lg"
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
