import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

import { WorkspaceProvider } from 'editor/context'
import { CodeEditor, EditorBar } from 'editor/components'
import { EditorSockProvider } from 'editor/connection'
import { useParams } from 'react-router-dom'

export function Editor(): JSX.Element {
  const { workspaceId } = useParams()

  if (!workspaceId) return <Navigate to="/workspace" />

  return (
    <WorkspaceProvider workspaceId={workspaceId}>
      <EditorSockProvider workspaceId={workspaceId}>
        <Flex h="100vh" w="100%" maxH="100%" flexDirection="column">
          <Box flexGrow={1} overflow="auto">
            <CodeEditor />
          </Box>
          <EditorBar />
        </Flex>
      </EditorSockProvider>
    </WorkspaceProvider>
  )
}

export default Editor
