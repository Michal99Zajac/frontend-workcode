import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { CodeEditor, EditorBar } from '../../components'
import { EditorProvider } from '../../context'

export function Editor(): JSX.Element {
  const { workspaceId } = useParams()

  if (!workspaceId) throw new Error('Workspace is not provided')

  return (
    <EditorProvider>
      <Flex h="100vh" w="100%" maxH="100%" flexDirection="column">
        <Box flexGrow={1} overflow="auto">
          <CodeEditor />
        </Box>
        <EditorBar workspaceId={workspaceId} />
      </Flex>
    </EditorProvider>
  )
}

export default Editor
