import React from 'react'
import { Text } from '@chakra-ui/react'

interface EdiorCompasProps {
  ch: number
  line: number
}

export function EditorCompas(props: EdiorCompasProps): JSX.Element {
  const { ch, line } = props

  return (
    <Text fontSize="xx-small" px={2}>
      ch {ch}, line {line}
    </Text>
  )
}

export default EditorCompas
