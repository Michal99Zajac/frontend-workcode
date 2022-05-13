import { useContext } from 'react'

import { EditorSockContext } from 'editor/connection'

export const useEditorSocket = () => {
  const editorSocket = useContext(EditorSockContext)

  if (!editorSocket) throw new Error('Workspace context is not provided')

  return editorSocket
}

export default useEditorSocket
