import React from 'react'
import { Socket } from 'socket.io-client'

import { _ID } from 'common/schemas'

export interface EditorSockContext {
  socket: Socket
  active: _ID[]
}

export const EditorSockContext = React.createContext<EditorSockContext>({
  socket: {} as any,
  active: [],
})

export default EditorSockContext
