import { useContext } from 'react'

import { ChatContext } from 'editor/connection'

export const useChatSocket = () => {
  const chat = useContext(ChatContext)

  if (!chat) throw new Error('Workspace context is not provided')

  return chat
}

export default useChatSocket
