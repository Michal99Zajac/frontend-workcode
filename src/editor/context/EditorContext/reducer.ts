import { Editor } from 'codemirror'

import { Cursor } from './Context'

interface EditorState {
  cursor: Cursor
  editor: Editor | null
}

interface EditorAction extends Partial<EditorState> {
  action: 'SET_CURSOR' | 'SET_EDITOR'
}

export const reducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.action) {
    case 'SET_CURSOR':
      if (!action.cursor) throw new Error('Cursor arg is not provided')
      return { ...state, cursor: action.cursor }
    case 'SET_EDITOR':
      if (action.editor === undefined)
        throw new Error('Editor arg is not provided')
      return { ...state, editor: action.editor }
    default:
      throw new Error("Action doesn't exists")
  }
}

export const init: EditorState = {
  cursor: {
    ch: 0,
    line: 0,
  },
  editor: null,
}
