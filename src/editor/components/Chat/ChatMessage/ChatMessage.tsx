import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { useMode } from 'common/hooks'
import { ChatMessage as TChatMessage } from 'editor/components/Chat/types'

interface Props {
  message: TChatMessage
  isMe: boolean
}

export function ChatMessage(props: Props): JSX.Element {
  const {
    message: { message, user },
    isMe,
  } = props
  const mode = useMode()

  return (
    <Flex alignSelf={isMe ? 'flex-end' : undefined}>
      {!isMe && (
        <Avatar
          src={user.src ?? undefined}
          name={`${user.name} ${user.lastname}`}
          size="xs"
        />
      )}
      <Box
        bg={
          isMe
            ? mode('blackAlpha.700', 'whiteAlpha.700')
            : mode('blue.600', 'blue.200')
        }
        p={2}
        mx={1}
        borderRadius="sm"
      >
        <Text fontSize="xs" mb={2} color={mode('gray.400', 'gray.700')}>
          {user.name} {user.lastname}
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
          {dayjs(message.createdAt).format('HH:mm D MMM YYYY')}
        </Text>
      </Box>
    </Flex>
  )
}

export default ChatMessage
