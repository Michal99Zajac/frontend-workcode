import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Message } from '../../../schemas'
import { useAuth } from '../../../../common/store'
import { useMode } from '../../../../common/hooks'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage(props: ChatMessageProps): JSX.Element {
  const { message } = props
  const mode = useMode()
  const currentUser = useAuth((store) => store.user)
  const isMy = currentUser?.id === message.author.id

  return (
    <Flex>
      {!isMy && <Avatar src="" size="xs" />}
      <Box
        bg={
          isMy
            ? mode('blackAlpha.700', 'whiteAlpha.700')
            : mode('blue.600', 'blue.200')
        }
        p={2}
        mx={1}
        borderRadius="sm"
      >
        <Text fontSize="xs" mb={2} color={mode('gray.400', 'gray.700')}>
          {message.author.firstname} {message.author.lastname}
        </Text>
        <Text color={mode('white', 'black')} fontSize="xs">
          {message.message}
        </Text>
        <Text
          fontSize="xs"
          textAlign="right"
          mt={2}
          color={mode('gray.400', 'gray.700')}
        >
          {dayjs(message.date).format('HH:mm D MMM YYYY')}
        </Text>
      </Box>
    </Flex>
  )
}

export default ChatMessage
