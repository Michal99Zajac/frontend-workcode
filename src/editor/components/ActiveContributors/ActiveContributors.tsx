import React from 'react'
import {
  Circle,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'

import { UserIcon } from '../../../icons/common'

export function ActiveContributors(): JSX.Element {
  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <Circle
          size="18px"
          bg="gray.900"
          cursor="pointer"
          _hover={{ bg: 'gray.700' }}
        >
          <UserIcon fill="white" />
        </Circle>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Contributors</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>aaa</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ActiveContributors
