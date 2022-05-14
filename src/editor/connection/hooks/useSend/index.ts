import { useCallback } from 'react'

import { useChatSocket } from 'editor/hooks'
import { CHAT_OPERATION } from 'editor/connection/operations'

export interface SendMessage {
  createdAt: string
  message: string
}

export const useSend = () => {
  const { socket } = useChatSocket()

  return useCallback((message: SendMessage) => {
    socket.emit(CHAT_OPERATION.SEND, message)
  }, [])
}

export default useSend
