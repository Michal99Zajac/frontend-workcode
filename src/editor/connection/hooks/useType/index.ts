import { useCallback } from 'react'
import { EditorChange } from 'codemirror'

import { useEditorSocket } from 'editor/hooks'
import { EDITOR_OPERATION } from 'editor/connection/operations'

export const useType = () => {
  const { socket } = useEditorSocket()

  return useCallback((action: EditorChange) => {
    socket.emit(EDITOR_OPERATION.TYPE, action)
  }, [])
}

export default useType
