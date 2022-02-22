import React from 'react'
import { ButtonGroup, IconButton, Center } from '@chakra-ui/react'
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
    <ButtonGroup isAttached gap={0.5}>
      <Center>{current}</Center>
      <IconButton
        size="xs"
        aria-label="first"
        isDisabled={first === last || current === first}
        icon={<ChevronLeftIcon />}
        onClick={() => onChange(first)}
      />
      <IconButton
        size="xs"
        aria-label="previous"
        icon={<MinusIcon />}
        disabled={previous === null}
        onClick={() => onChange(previous || first)}
      />
      <IconButton
        size="xs"
        aria-label="first"
        icon={<AddIcon />}
        onClick={() => onChange(next || last)}
        disabled={next === null}
      />
      <IconButton
        size="xs"
        aria-label="last"
        icon={<ChevronRightIcon />}
        onClick={() => onChange(last)}
        isDisabled={first === last || current === last}
      />
    </ButtonGroup>
  )
}

export default Pagination
