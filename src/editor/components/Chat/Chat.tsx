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
import { useTranslation } from 'react-i18next'

import useMode from 'common/hooks/useMode'
import { ChatStatus } from 'editor/schemas'
import { useRecive } from 'editor/connection'

import { ChatMessage } from './ChatMessage'
import { ChatSend } from './ChatSend'
import { Styled } from './styled'

export function Chat(): JSX.Element {
  const { t } = useTranslation()
  const [status, setStatus] = useState<ChatStatus>('READED')
  const [isOpen, setIsOpen] = useState(false)
  const mode = useMode()

  const messages = useRecive((messages) => {
    if (messages.length !== 0 && !isOpen) {
      setStatus('NEW')
    }
  })

  return (
    <Popover
      placement="top-end"
      isOpen={isOpen}
      onOpen={() => {
        setIsOpen(true)
        setStatus('READED')
      }}
      onClose={() => setIsOpen(false)}
    >
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
        <PopoverHeader fontWeight="semibold">
          {t('editor.components.chat.header')}
        </PopoverHeader>
        <PopoverCloseButton />
        <Styled.PopoverBody>
          <Stack>
            {messages.map((message) => (
              <ChatMessage key={message.createdAt} message={message} />
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
