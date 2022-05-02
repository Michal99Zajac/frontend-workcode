import React from 'react'
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

import { Contributor, UUID } from '../../../common/schemas'
import { UserIcon } from '../../../icons/common'
import { AvatarSkeleton } from '../../../common/components'
import useMode from '../../../common/hooks/useMode'

interface ActiveContributorsProps {
  isLoading: boolean
  contributors: Contributor[]
  activeContributorsIds: UUID[]
}

export function ActiveContributors(
  props: ActiveContributorsProps
): JSX.Element {
  const { contributors, activeContributorsIds, isLoading } = props
  const mode = useMode()

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
                  key={contributor.id}
                  label={`${contributor.firstname} ${contributor.lastname}`}
                >
                  <Avatar
                    size="sm"
                    name={`${contributor.firstname} ${contributor.lastname}`}
                    src={contributor.src || undefined}
                  >
                    {activeContributorsIds.includes(contributor.id) && (
                      <AvatarBadge boxSize="1em" bg="green.500" /> // FIXME: color of badage should depends on color of cursor
                    )}
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
