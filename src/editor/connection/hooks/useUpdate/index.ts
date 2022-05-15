import { useEffect, useState } from 'react'
import { EditorChange } from 'codemirror'

import { _ID } from 'common/schemas'
import { useEditorSocket } from 'editor/hooks'
import { EDITOR_COMMAND } from 'editor/connection'

interface Message {
  user: _ID
  change: EditorChange
}
type Handler = (message: Message | null) => void

export const useUpdate = (handler?: Handler) => {
  const { socket } = useEditorSocket()
  const [message, setMessage] = useState<Message | null>(null)

  useEffect(() => {
    socket.on(EDITOR_COMMAND.UPDATE, (message: Message) => {
      setMessage(message)
    })
  }, [])

  useEffect(() => {
    handler && handler(message)
  }, [message])

  return message
}

export default useUpdate
