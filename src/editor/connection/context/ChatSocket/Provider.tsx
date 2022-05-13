import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

import { _ID } from 'common/schemas'
import { useAuth } from 'common/store'

import { ChatContext } from './Context'

interface Props {
  children: React.ReactNode
  workspaceId: _ID
}

export const ChatProvider = (props: Props) => {
  const token = useAuth((store) => store.token)
  const { children, workspaceId } = props
  const [socket, setSocket] = useState<Socket | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const socket = io('http://localhost:8000/chat', {
      extraHeaders: {
        workspace: workspaceId,
      },
      auth: {
        token: token,
      },
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

  if (!socket) return <div>Loading...</div>

  return (
    <ChatContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContext
