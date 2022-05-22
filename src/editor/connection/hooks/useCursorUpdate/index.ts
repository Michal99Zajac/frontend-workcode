import { useEffect, useState } from 'react'
import { Position } from 'codemirror'

import { _ID } from 'common/schemas'
import { useEditorSocket } from 'editor/hooks'
import { EDITOR_COMMAND } from 'editor/connection'

interface CursorUpdate {
  cursor: Position
  userId: _ID
}
type Handler = (messages: CursorUpdate) => void

export const useCursorUpdate = (handler?: Handler) => {
  const { socket } = useEditorSocket()
  const [update, setUpdate] = useState<CursorUpdate | null>(null)

  useEffect(() => {
    socket.on(EDITOR_COMMAND.CURSOR_UPDATE, (update: CursorUpdate) => {
      setUpdate(update)
    })
  }, [])

  useEffect(() => {
    if (!handler || !update) return

    handler(update)
  }, [update])

  return update
}

export default useCursorUpdate
