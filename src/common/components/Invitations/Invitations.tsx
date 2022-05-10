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
  Flex,
  Heading,
  Tag,
  Avatar,
  TagLabel,
  Text,
  Spacer,
  HStack,
} from '@chakra-ui/react'
import { BellIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

import { Invitation } from 'common/components'

export function Invitations() {
  const [isOpen, setIsOpen] = useState(false)

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
            <Invitation />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default Invitations
