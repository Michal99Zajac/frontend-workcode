import React, { useState } from 'react'
import { z } from 'zod'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { Form, Fail, sendMessage } from '../../../api/sendMessage'
import { SendIcon } from '../../../../icons/common'
import { useAuth } from '../../../../common/store'
import { useToast } from '../../../../common/hooks'

const MessageForm = Form.pick({ message: true })
type MessageForm = z.infer<typeof MessageForm>
export function ChatSend(): JSX.Element {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const userId = useAuth((store) => store.user?.id) ?? ''
  const { register, handleSubmit, setValue } = useForm<MessageForm>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(MessageForm),
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await sendMessage({
        message: data.message,
        author: userId,
        timestamp: dayjs().toDate(),
      })
      setValue('message', '')
    } catch (error) {
      const fail = Fail.parse(error)
      toast(fail, 'Chat', 'error')
    }
    setIsLoading(false)
  })

  return (
    <Flex position="relative" as="form" onSubmit={onSubmit} gap={2}>
      <Input
        autoComplete="off"
        isDisabled={isLoading}
        {...register('message')}
        placeholder="message"
        size="sm"
      />
      <IconButton
        type="submit"
        isDisabled={isLoading}
        isLoading={isLoading}
        fill="current"
        aria-label="send icon"
        size="sm"
        icon={<SendIcon />}
      />
    </Flex>
  )
}

export default ChatSend
