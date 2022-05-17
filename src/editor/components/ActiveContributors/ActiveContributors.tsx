import React, { useCallback } from 'react'
import {
  AvatarBadge,
  Circle,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Avatar,
  Wrap,
  Tooltip,
} from '@chakra-ui/react'

import { ActiveUser } from 'editor/schemas'
import { Contributor, _ID } from 'common/schemas'
import { UserIcon } from 'icons/common'
import { AvatarSkeleton } from 'common/components'
import useMode from 'common/hooks/useMode'

interface ActiveContributorsProps {
  isLoading: boolean
  contributors: Contributor[]
  activeUsers: ActiveUser[]
}

export function ActiveContributors(
  props: ActiveContributorsProps
): JSX.Element {
  const { contributors, activeUsers, isLoading } = props
  const mode = useMode()

  const activeBadge = useCallback(
    (id: _ID) => {
      const user = activeUsers.find((activeUser) => activeUser._id === id)

      if (!user) return null

      return <AvatarBadge boxSize="1em" bg={user.color} />
    },
    [activeUsers]
  )

  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <Circle
          size="18px"
          bg={mode('gray.100', 'gray.900')}
          cursor="pointer"
          _hover={{ bg: mode('gray.200', 'gray.700') }}
        >
          <UserIcon fill={mode('black', 'white')} />
        </Circle>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Contributors</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Wrap>
            <AvatarSkeleton size="2rem" amount={10} isLoaded={!isLoading}>
              {contributors.map((contributor) => (
                <Tooltip
                  placement="top"
                  key={contributor._id}
                  label={`${contributor.name} ${contributor.lastname}`}
                >
                  <Avatar
                    size="sm"
                    name={`${contributor.name} ${contributor.lastname}`}
                    src={contributor.src || undefined}
                  >
                    {activeBadge(contributor._id)}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarSkeleton>
          </Wrap>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ActiveContributors
