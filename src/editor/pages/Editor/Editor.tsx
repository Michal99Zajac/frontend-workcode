import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { CodeEditor, EditorBar } from '../../components'

export function Editor(): JSX.Element {
  return (
    <Flex h="100vh" w="100%" maxH="100%" flexDirection="column">
      <Box flexGrow={1} overflow="auto">
        <CodeEditor />
      </Box>
      <EditorBar />
    </Flex>
  )
}

export default Editor
