import React from 'react'
import { Box } from '@chakra-ui/react'

import { CodeEditor } from '../../components'

export function Editor(): JSX.Element {
  return (
    <Box overflow="auto" height="100%">
      <CodeEditor />
    </Box>
  )
}

export default Editor
