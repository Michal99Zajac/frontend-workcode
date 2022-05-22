import { useCallback } from 'react'
import { EditorChange } from 'codemirror'

import { useEditorSocket } from 'editor/hooks'
import { EDITOR_COMMAND } from 'editor/connection'

export const useType = () => {
  const { socket } = useEditorSocket()

  return useCallback((change: EditorChange) => {
    socket.emit(EDITOR_COMMAND.TYPE, change)
  }, [])
}

export default useType
