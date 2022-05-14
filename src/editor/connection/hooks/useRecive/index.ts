import { useEffect } from 'react'

import { Message } from 'editor/schemas'
import { useChatSocket } from 'editor/hooks'
import { CHAT_OPERATION } from 'editor/connection'

type Handler = (message: Message) => void

export const useRecive = (handler: Handler, deps: any[]) => {
  const { socket } = useChatSocket()

  useEffect(() => {
    socket.on(CHAT_OPERATION.RECIVE, handler)
  }, [...deps])
}

export default useRecive
