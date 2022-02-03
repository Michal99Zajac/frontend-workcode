import React from 'react'
import { Center, HStack, IconButton } from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons'

type OnChange = (page: number) => void

interface PaginationProps {
  onChange: OnChange
  current: number
  last: number
  first: number
  next: number | null
  previous: number | null
}

export function Pagination(props: PaginationProps): JSX.Element {
  const { onChange, current, last, first, next, previous } = props
  return (
    <HStack>
      <IconButton
        size="xs"
        variant="outline"
        aria-label="first"
        icon={<ChevronLeftIcon />}
        onClick={() => onChange(first)}
      />
      <IconButton
        size="xs"
        variant="outline"
        aria-label="previous"
        icon={<MinusIcon />}
        disabled={!previous}
        onClick={() => onChange(previous || first)}
      />
      <Center>{current}</Center>
      <IconButton
        size="xs"
        variant="outline"
        aria-label="first"
        icon={<AddIcon />}
        onClick={() => onChange(next || last)}
        disabled={!next}
      />
      <IconButton
        size="xs"
        variant="outline"
        aria-label="last"
        icon={<ChevronRightIcon />}
        onClick={() => onChange(last)}
      />
    </HStack>
  )
}

export default Pagination
