import React from 'react'
import { Socket } from 'socket.io-client'

import { ActiveUser } from 'editor/schemas'

export interface EditorSockContext {
  socket: Socket
  actives: ActiveUser[]
}

export const EditorSockContext = React.createContext<EditorSockContext>({
  socket: {} as any,
  actives: [],
})

export default EditorSockContext
