import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

import { useEditor } from 'editor/api/useEditor'
import { CodeEditor, EditorBar } from 'editor/components'
import { EditorSockProvider } from 'editor/connection'
import { useParams } from 'react-router-dom'

export function Editor(): JSX.Element {
  const { workspaceId } = useParams()
  const { data, isLoading, isError } = useEditor({
    workspaceId: workspaceId ?? '',
  })

  if (!workspaceId) return <Navigate to="/workspace" />

  if (isError) return <Navigate to="/workspace" />

  if (isLoading) return <div>Loading...</div>

  return (
    <EditorSockProvider workspaceId={workspaceId}>
      <Flex h="100vh" w="100%" maxH="100%" flexDirection="column">
        <Box flexGrow={1} overflow="auto">
          <CodeEditor />
        </Box>
        <EditorBar />
      </Flex>
    </EditorSockProvider>
  )
}

export default Editor
