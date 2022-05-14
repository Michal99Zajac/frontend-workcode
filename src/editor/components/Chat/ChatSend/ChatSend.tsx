import React from 'react'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { SendIcon } from 'icons/common'
import { useSend } from 'editor/connection'

import { Form } from './schema'

export function ChatSend(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<Form>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(Form),
  })
  const send = useSend()

  const onSubmit = handleSubmit(async (data) => {
    send({
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
