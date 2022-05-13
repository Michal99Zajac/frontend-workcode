import React from 'react'
import { Socket } from 'socket.io-client'

export interface ChatContext {
  socket: Socket | null
}

export const ChatContext = React.createContext<ChatContext>({
  socket: null,
})

export default ChatContext
