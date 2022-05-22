import React, { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Box,
  IconButton,
  Button,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Flex,
  Spacer,
  Stack,
  Center,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'

import { NoMailIcon } from 'icons/common'
import { InvitationSkeleton } from 'common/components/Skeletons'
import { Invitation } from 'common/components'
import { useInvitations } from 'common/api/useInvitations'
import { useMode } from 'common/hooks'

export function Invitations() {
  const mode = useMode()
  const { t } = useTranslation()
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
          <PopoverHeader>
            {t('common.components.invitations.header')}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody maxH="400px" overflow="auto">
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
              <Button
                size="xs"
                variant="outline"
                aria-label="refetch"
                onClick={() => refetch()}
              >
                {t('common.components.invitations.refresh_button')}
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default Invitations
