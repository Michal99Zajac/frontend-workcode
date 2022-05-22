import React from 'react'
import { Editor } from 'codemirror'

export type Cursor = {
  ch: number
  line: number
}
export type SetCursor = (cursor: Cursor) => void
export type SetEditor = (editor: Editor) => void
export interface EditorContext {
  editor: Editor | null
  cursor: Cursor
  setCursor: SetCursor
  setEditor: SetEditor
}

const noop = () => {}
export const EditorContext = React.createContext<EditorContext>({
  cursor: {
    ch: 0,
    line: 0,
  },
  editor: null,
  setCursor: noop,
  setEditor: noop,
})

export default EditorContext
