import React, { useReducer } from 'react'

import { EditorContext } from './Context'
import { init, reducer } from './reducer'

interface EditorProviderProps {
  children: React.ReactNode
}

export const EditorProvider = (props: EditorProviderProps) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, init)

  return (
    <EditorContext.Provider
      value={{
        editor: state.editor,
        cursor: state.cursor,
        setCursor: (cursor) =>
          dispatch({ action: 'SET_CURSOR', cursor: cursor }),
        setEditor: (editor) =>
          dispatch({ action: 'SET_EDITOR', editor: editor }),
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export default EditorProvider
