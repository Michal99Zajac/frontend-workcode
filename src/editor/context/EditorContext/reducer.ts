import { Cursor } from './Context'

interface EditorState {
  cursor: Cursor
}

interface EditorAction extends Partial<EditorState> {
  action: 'SET_CURSOR'
}

export const reducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.action) {
    case 'SET_CURSOR':
      if (!action.cursor) throw new Error('Cursor arg is not provided')
      return { ...state, cursor: action.cursor }
    default:
      throw new Error("Action doesn't exists")
  }
}

export const init: EditorState = {
  cursor: {
    ch: 0,
    line: 0,
  },
}
