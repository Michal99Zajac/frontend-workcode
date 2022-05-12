import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

import { _ID } from 'common/schemas'
import { useAuth } from 'common/store'

import { EditorSockContext } from './context'

interface Props {
  children: React.ReactNode
  workspaceId: _ID
}

export const EditorSockProvider = (props: Props) => {
  const token = useAuth((store) => store.token)
  const { children, workspaceId } = props
  const [socket, setSocket] = useState<Socket | null>(null)
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

    socket.on('join', (message) => {
      console.log(message)
    })

    socket.on('leave', (message) => {
      console.log(message)
    })

    socket.on('connect_error', (err) => {
      console.error(err instanceof Error)
      navigate('/workspace')
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
      setSocket(null)
    }
  }, [])

  return (
    <EditorSockContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </EditorSockContext.Provider>
  )
}

export default EditorSockProvider
