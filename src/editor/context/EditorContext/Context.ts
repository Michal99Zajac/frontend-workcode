import React from 'react'

export type Cursor = {
  ch: number
  line: number
}
export type SetCursor = (cursor: Cursor) => void
export interface EditorContext {
  cursor: Cursor
  setCursor: SetCursor
}

const noop = () => {}
export const EditorContext = React.createContext<EditorContext>({
  cursor: {
    ch: 0,
    line: 0,
  },
  setCursor: noop,
})

export default EditorContext
