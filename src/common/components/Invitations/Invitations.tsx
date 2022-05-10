import React, { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Box,
  IconButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Flex,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { BellIcon, RepeatIcon } from '@chakra-ui/icons'

import { InvitationSkeleton } from 'common/components/Skeletons'
import { Invitation } from 'common/components'
import { useInvitations } from 'common/api/useInvitations'

export function Invitations() {
  const [isOpen, setIsOpen] = useState(false)
  const { data, refetch, isFetched } = useInvitations()

  return (
    <Box zIndex="popover">
      <Popover
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        placement="right-end"
        flip
      >
        <PopoverTrigger>
          <IconButton
            size="xs"
            variant="ghost"
            aria-label="invitations-button"
            icon={<BellIcon fontSize="lg" />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Invitations</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody maxH="400px" overflow="scroll">
            <Stack>
              <InvitationSkeleton amount={3} isLoaded={isFetched}>
                {data?.map((invitation) => (
                  <Invitation key={invitation._id} invitation={invitation} />
                ))}
              </InvitationSkeleton>
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Flex>
              <Spacer />
              <IconButton
                size="sm"
                variant="outline"
                aria-label="refetch"
                onClick={() => refetch()}
                icon={<RepeatIcon />}
              />
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default Invitations
