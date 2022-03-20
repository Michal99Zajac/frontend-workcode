import React, { useState } from 'react'
import {
  Circle,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

import useMode from '../../../common/hooks/useMode'
import { ChatStatus } from '../../schemas'

export function Chat(): JSX.Element {
  const [status, setStatus] = useState<ChatStatus>('NEW')
  const mode = useMode()

  return (
    <Popover placement="top-end" onOpen={() => setStatus('READED')}>
      <PopoverTrigger>
        <Circle
          mx={1}
          size="18px"
          bg={status === 'NEW' ? 'green.400' : mode('gray.100', 'gray.900')}
          cursor="pointer"
          _hover={{
            bg: status === 'NEW' ? 'green.300' : mode('gray.200', 'gray.700'),
          }}
        >
          <ChatIcon h={3} />
        </Circle>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Chat</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Flex minH="400px" maxH="400px" overflow="auto">
            <div>a</div>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <div>sending</div>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default Chat
