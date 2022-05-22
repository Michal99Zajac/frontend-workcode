import { useContext } from 'react'

import { EditorContext } from 'editor/context'

export const useEditor = () => {
  const editor = useContext(EditorContext)

  if (!editor) throw new Error('Editor Context is not provided')

  return editor
}

export default useEditor
