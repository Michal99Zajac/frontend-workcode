import styled from '@emotion/styled'
import { UnControlled as ControlEditor } from 'react-codemirror2'

export const Editor = styled(ControlEditor)`
  height: 100%;
  width: 100%;
  overflow: auto;

  &:hover {
    cursor: text;
  }

  .CodeMirror.CodeMirror {
    font-family: Source Code Pro;
    font-size: small;
    height: 100%;
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#FFF')};
    background-color: ${({ theme }) =>
      theme === 'light' ? '#FFF' : '#1A202C'} !important;
  }

  .CodeMirror-gutters.CodeMirror-gutters {
    background-color: ${({ theme }) =>
      theme === 'light' ? '#FFFFFF' : '#1A202C'};
    border-color: ${({ theme }) => (theme === 'light' ? '#FFF' : '#1A202C')};
  }

  .CodeMirror-cursor.CodeMirror-cursor {
    border-color: ${({ theme }) => (theme === 'light' ? '#000' : '#FFF')};
  }

  .cm-s-material .cm-variable-2 {
    color: ${({ theme }) => (theme === 'light' ? 'gray' : '#EEFFFF')};
  }
`

export default Editor
