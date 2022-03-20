import React from 'react'
import { Skeleton, Td, Tr, useColorModeValue } from '@chakra-ui/react'
import { v4 } from 'uuid'

import { Skeletons } from '../Skeletons'

interface TableRecordSkeleton {
  columns: number
}

export const TableRecordSkeleton = Skeletons(
  (props: TableRecordSkeleton): JSX.Element => {
    const borderColor = useColorModeValue('gray.100', 'gray.600')
    const array = Array(props.columns)
      .fill(0)
      .map(() => v4())

    return (
      <Tr>
        {array.map((td) => (
          <Td key={td} borderColor={borderColor}>
            <Skeleton speed={1.2} h="32px" w="100%" />
          </Td>
        ))}
      </Tr>
    )
  }
)

export default TableRecordSkeleton
