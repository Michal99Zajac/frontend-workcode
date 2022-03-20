import React, { useEffect, useState } from 'react'
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

import { getContributors, Fail } from '../../api/getContributors'
import { Contributor, UUID } from '../../../common/schemas'
import { UserIcon } from '../../../icons/common'
import { AvatarSkeleton, ErrorReload } from '../../../common/components'
import useMode from '../../../common/hooks/useMode'

interface ActiveContributorsProps {
  workspaceId: UUID
  activeContributorsIds: UUID[]
}

export function ActiveContributors(
  props: ActiveContributorsProps
): JSX.Element {
  const { workspaceId, activeContributorsIds } = props
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contributos, setContributors] = useState<Contributor[]>([])
  const mode = useMode()

  const fetchContributors = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getContributors({ workspaceId })
      setContributors(response.contributors)
    } catch (error) {
      const fail = Fail.parse(error)
      setError(fail.error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchContributors()
  }, [activeContributorsIds])

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
          <ErrorReload
            title="Connect Error"
            message={error}
            isError={!!error && !isLoading}
            onReload={fetchContributors}
          >
            <Wrap>
              <AvatarSkeleton size="2rem" amount={10} isLoaded={!isLoading}>
                {contributos.map((contributor) => (
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
          </ErrorReload>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ActiveContributors
