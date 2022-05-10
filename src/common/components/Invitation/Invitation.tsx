import React from 'react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  Heading,
  Avatar,
  Spacer,
  HStack,
  IconButton,
  Text,
  Divider,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Invitation as InvitationType } from 'common/schemas'

interface Props {
  invitation?: InvitationType
}

export function Invitation(props: Props) {
  const { invitation } = props

  return (
    <Flex w="100%" p={1} borderRadius={4} align="center">
      <Box>
        <Heading size="xs" isTruncated mb={1}>
          React workspace
        </Heading>
        <Flex align="center" w="max-content">
          <Avatar
            src="https://bit.ly/sage-adebayo"
            size="2xs"
            name="Segun Adebayo"
          />
          <Divider orientation="vertical" h="1em" w="2px" mx="0.4em" />
          <Text fontSize="xs">
            {/* {dayjs(invitation.createdAt).format('D/MM/YYYY')} */}
          </Text>
        </Flex>
      </Box>
      <Spacer />
      <HStack>
        <IconButton
          colorScheme="green"
          variant="ghost"
          size="xs"
          aria-label="accept"
          icon={<CheckIcon />}
        />
        <IconButton
          colorScheme="red"
          variant="ghost"
          size="xs"
          aria-label="decline"
          icon={<CloseIcon />}
        />
      </HStack>
    </Flex>
  )
}

export default Invitation
