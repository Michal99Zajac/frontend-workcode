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
  Center,
} from '@chakra-ui/react'
import { EmailIcon, RepeatIcon } from '@chakra-ui/icons'

import { NoMailIcon } from 'icons/common'
import { InvitationSkeleton } from 'common/components/Skeletons'
import { Invitation } from 'common/components'
import { useInvitations } from 'common/api/useInvitations'
import { useMode } from 'common/hooks'

export function Invitations() {
  const mode = useMode()
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
            icon={<EmailIcon fontSize="lg" />}
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
            {data && !data.length && (
              <Center>
                <NoMailIcon fill={mode('black', 'white')} fontSize="6em" />
              </Center>
            )}
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