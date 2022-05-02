import React, { useState } from 'react'
import {
  Circle,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'

import { currentUser, users } from '../../../fixtures' // TODO: remove after development
import useMode from '../../../common/hooks/useMode'
import { ChatStatus } from '../../schemas'

import { ChatMessage } from './ChatMessage'
import { ChatSend } from './ChatSend'
import { Styled } from './styled'

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
        <Styled.PopoverBody>
          <Stack>
            <ChatMessage
              message={{
                id: '',
                author: currentUser,
                date: dayjs().toDate(),
                message:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin neque quam, posuere id tincidunt eu, suscipit vel ipsum. Mauris at condimentum turpis, eu blandit urna. Pellentesque imperdiet consequat sapien, non fringilla ipsum dictum a. Quisque at euismod diam. Donec tellus lacus, faucibus eget dignissim quis, feugiat vitae tellus. Duis condimentum ullamcorper placerat. Pellentesque vulputate quam eget tristique egestas. Aenean id tempus eros.',
              }}
            />
            <ChatMessage
              message={{
                id: '',
                author: users[1],
                date: dayjs().toDate(),
                message:
                  'faucibus eget dignissim quis, feugiat vitae tellus. Duis condimentum ullamcorper placerat. Pellentesque vulputate quam eget tristique egestas. Aenean id tempus eros.',
              }}
            />
            <ChatMessage
              message={{
                id: '',
                author: users[1],
                date: dayjs().toDate(),
                message:
                  'faucibus eget dignissim quis, feugiat vitae tellus. Duis condimentum ullamcorper placerat. Pellentesque vulputate quam eget tristique egestas. Aenean id tempus eros.',
              }}
            />
          </Stack>
        </Styled.PopoverBody>
        <PopoverFooter>
          <ChatSend />
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default Chat
