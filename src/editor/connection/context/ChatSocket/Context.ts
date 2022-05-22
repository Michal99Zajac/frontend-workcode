import React from 'react'
import { Socket } from 'socket.io-client'

export interface ChatContext {
  socket: Socket
}

export const ChatContext = React.createContext<ChatContext>({
  socket: {} as any,
})

export default ChatContext
