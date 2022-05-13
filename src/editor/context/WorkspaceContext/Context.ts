import React from 'react'

import { Editor } from 'editor/schemas'

interface WorkspaceContext {
  editorWorkspace: Editor | undefined
}

export const WorkspaceContext = React.createContext<WorkspaceContext>({
  editorWorkspace: undefined,
})

export default WorkspaceContext
