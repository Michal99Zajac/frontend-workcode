import { useEffect, useState } from 'react'

import { Message } from 'editor/schemas'
import { useChatSocket } from 'editor/hooks'
import { CHAT_COMMAND } from 'editor/connection'

type Handler = (messages: Message[]) => void

export const useRecive = (handler: Handler) => {
  const { socket } = useChatSocket()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socket.on(CHAT_COMMAND.RECIVE, (message: Message) => {
      setMessages((old) => [...old, message])
    })
  }, [])

  useEffect(() => {
    handler(messages)
  }, [messages])

  return messages
}

export default useRecive
