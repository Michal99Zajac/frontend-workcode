import React from 'react'
import { Flex, useColorModeValue, Spacer } from '@chakra-ui/react'

import CodeLabel from '../CodeLabel'

export function EditorBar(): JSX.Element {
  const barBG = useColorModeValue('gray.900', 'gray.900')

  return (
    <Flex h="20px" minH="20px" bg={barBG}>
      <Spacer />
      <CodeLabel type="PYTHON" />
    </Flex>
  )
}

export default EditorBar
