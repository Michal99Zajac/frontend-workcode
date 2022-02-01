import React from 'react'
import {
  Tag,
  Avatar,
  TagLabel,
  SkeletonCircle,
  useColorMode,
} from '@chakra-ui/react'
import clsx from 'clsx'

import { UserType } from '../../../common/schemas'

import classes from './AvatarTag.module.scss'

interface AvatarTagProps {
  user?: UserType
}

export function AvatarTag(props: AvatarTagProps): JSX.Element {
  const { user } = props
  const { colorMode } = useColorMode()

  if (!user) return <SkeletonCircle size="5" />

  return (
    <Tag
      className={clsx(
        colorMode === 'dark' ? classes.AvatarDark : classes.AvatarLight
      )}
      size="lg"
      borderRadius="full"
    >
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
