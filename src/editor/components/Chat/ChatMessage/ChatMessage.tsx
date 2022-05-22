import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Navigate } from 'react-router-dom'

import { useMode } from 'common/hooks'
import { Message } from 'editor/schemas'
import { useWorkspace } from 'editor/hooks'
import { useAuth } from 'common/store'

interface Props {
  message: Message
}

export function ChatMessage(props: Props): JSX.Element {
  const { message } = props
  const mode = useMode()
  const userId = useAuth((store) => (store.user ? store.user._id : ''))
  const { workspace } = useWorkspace()

  const user = [...workspace.contributors, workspace.author].find(
    (user) => user._id === message.userId
  )
  const isMe = user?._id === userId

  if (!user) return <Navigate to="/workspace" />

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
