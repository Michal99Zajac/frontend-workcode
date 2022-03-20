import { useContext } from 'react'

import { EditorContext } from '../../context/EditorContext'

export const useEditor = () => {
  const editor = useContext(EditorContext)

  if (!editor) throw new Error('Editor Context is not provided')

  return editor
}

export default useEditor
