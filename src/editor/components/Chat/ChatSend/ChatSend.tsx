import React from 'react'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { SendIcon } from 'icons/common'
import { useChatSocket } from 'editor/hooks'
import { CHAT_OPERATION } from 'editor/connection'

import { Form } from './schema'

export function ChatSend(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<Form>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(Form),
  })
  const { socket: chat } = useChatSocket()

  const onSubmit = handleSubmit(async (data) => {
    chat?.emit(CHAT_OPERATION.SEND, {
      message: data.message,
      createdAt: dayjs().toString(),
    })
    setValue('message', '')
  })

  return (
    <Flex position="relative" as="form" onSubmit={onSubmit} gap={2}>
      <Input
        autoComplete="off"
        {...register('message')}
        placeholder="message"
        size="sm"
      />
      <IconButton
        type="submit"
        fill="current"
        aria-label="send icon"
        size="sm"
        icon={<SendIcon />}
      />
    </Flex>
  )
}

export default ChatSend
