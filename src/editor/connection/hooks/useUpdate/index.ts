import { useEffect, useState } from 'react'
import { EditorChange } from 'codemirror'

import { useEditorSocket } from 'editor/hooks'
import { EDITOR_COMMAND } from 'editor/connection'

type Handler = (message: EditorChange) => void

export const useUpdate = (handler?: Handler) => {
  const { socket } = useEditorSocket()
  const [change, setChange] = useState<EditorChange | null>(null)

  useEffect(() => {
    socket.on(EDITOR_COMMAND.UPDATE, (message: EditorChange) => {
      setChange(message)
    })
  }, [])

  useEffect(() => {
    handler && change && handler(change)
  }, [change])

  return change
}

export default useUpdate
