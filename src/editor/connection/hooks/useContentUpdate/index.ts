import { useCallback } from 'react'

import { useEditorSocket } from 'editor/hooks'
import { EDITOR_COMMAND } from 'editor/connection'

export const useContentUpdate = () => {
  const { socket } = useEditorSocket()

  return useCallback((content: string) => {
    socket.emit(EDITOR_COMMAND.CONTENT_UPDATE, content)
  }, [])
}

export default useContentUpdate
