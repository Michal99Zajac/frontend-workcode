import React from 'react'
import { Socket } from 'socket.io-client'

import { _ID } from 'common/schemas'

export interface EditorSockContext {
  socket: Socket | null
  active: _ID[]
}

export const EditorSockContext = React.createContext<EditorSockContext>({
  socket: null,
  active: [],
})

export default EditorSockContext
