import React, { useState, useEffect } from 'react'
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

import useMode from 'common/hooks/useMode'
import { ChatStatus, Message } from 'editor/schemas'
import { useChatSocket, useWorkspace } from 'editor/hooks'
import { CHAT_OPERATION } from 'editor/connection'
import { useAuth } from 'common/store'

import { ChatMessage } from './ChatMessage'
import { ChatSend } from './ChatSend'
import { Styled } from './styled'
import { ChatMessage as TChatMessage } from './types'

export function Chat(): JSX.Element {
  const [status, setStatus] = useState<ChatStatus>('NEW')
  const [messages, setMessages] = useState<TChatMessage[]>([])
  const userId = useAuth((store) => store.user?._id)
  const { socket: chat } = useChatSocket()
  const { workspace } = useWorkspace()
  const mode = useMode()

  useEffect(() => {
    if (!workspace) return

    chat.on(CHAT_OPERATION.RECIVE, (message: Message) => {
      const user = [...workspace.contributors, workspace.author].find(
        (user) => user._id === message.userId
      )

      if (user) setMessages((old) => [...old, { message: message, user: user }])
    })
  }, [])

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
            {messages.map((message) => (
              <ChatMessage
                key={message.message.createdAt}
                message={message}
                isMe={message.message.userId === userId}
              />
            ))}
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
