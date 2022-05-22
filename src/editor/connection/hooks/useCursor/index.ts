import { useCallback } from 'react'
import { Position } from 'codemirror'

import { useEditorSocket } from 'editor/hooks'
import { EDITOR_COMMAND } from 'editor/connection'

export const useCursor = () => {
  const { socket } = useEditorSocket()

  return useCallback((cursor: Position) => {
    socket.emit(EDITOR_COMMAND.CURSOR, cursor)
  }, [])
}

export default useCursor
