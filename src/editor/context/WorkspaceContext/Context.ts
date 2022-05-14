import React from 'react'

import { Editor } from 'editor/schemas'

interface WorkspaceContext {
  editorWorkspace: Editor
}

export const WorkspaceContext = React.createContext<WorkspaceContext>({
  editorWorkspace: {} as any,
})

export default WorkspaceContext
