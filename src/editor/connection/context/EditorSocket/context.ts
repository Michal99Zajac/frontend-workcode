import React from 'react'
import { Socket } from 'socket.io-client'

export interface EditorSockContext {
  socket: Socket | null
}

export const EditorSockContext = React.createContext<EditorSockContext>({
  socket: null,
})

export default EditorSockContext
