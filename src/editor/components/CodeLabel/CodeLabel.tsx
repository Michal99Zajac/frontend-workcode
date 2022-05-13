import React from 'react'
import { Tag } from '@chakra-ui/react'

import { CodeType } from 'common/schemas'
import { codeColors } from 'common/utils'

interface CodeLabelProps {
  type: CodeType
}

export function CodeLabel(props: CodeLabelProps): JSX.Element {
  const { type } = props

  return (
    <Tag {...codeColors[type]} h="100%" borderRadius={0} size="sm">
      {type}
    </Tag>
  )
}

export default CodeLabel
