import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

import { _ID } from 'common/schemas'
import { ActiveUser } from 'editor/schemas'
import { useAuth } from 'common/store'
import { COMMON_COMMAND, EDITOR_COMMAND } from 'editor/connection'

import { EditorSockContext } from './context'

interface Props {
  children: React.ReactNode
  workspaceId: _ID
}

export const EditorSockProvider = (props: Props) => {
  const token = useAuth((store) => store.token)
  const { children, workspaceId } = props
  const [socket, setSocket] = useState<Socket | null>(null)
  const [actives, setActives] = useState<ActiveUser[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const socket = io('http://localhost:8000/editor', {
      extraHeaders: {
        workspace: workspaceId,
      },
      auth: {
        token: token,
      },
    })

    socket.on(EDITOR_COMMAND.JOIN, (users) => setActives(users))

    socket.on(EDITOR_COMMAND.LEAVE, (users) => setActives(users))

    socket.on(COMMON_COMMAND.CONNECT_ERR, (err) => {
      console.error(err instanceof Error)
      navigate('/workspace')
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
      setSocket(null)
    }
  }, [])

  if (!socket) return <div>...Loading</div>

  return (
    <EditorSockContext.Provider
      value={{
        socket,
        actives,
      }}
    >
      {children}
    </EditorSockContext.Provider>
  )
}

export default EditorSockProvider
