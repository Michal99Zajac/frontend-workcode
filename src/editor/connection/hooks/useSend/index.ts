import { useCallback } from 'react'

import { useChatSocket } from 'editor/hooks'
import { CHAT_COMMAND } from 'editor/connection/commands'

export interface SendMessage {
  createdAt: string
  message: string
}

export const useSend = () => {
  const { socket } = useChatSocket()

  return useCallback((message: SendMessage) => {
    socket.emit(CHAT_COMMAND.SEND, message)
  }, [])
}

export default useSend
