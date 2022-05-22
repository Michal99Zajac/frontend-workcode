import React from 'react'
import {
  ButtonGroup,
  IconButton,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react'
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
  next: number
  previous: number
}

export function Pagination(props: PaginationProps): JSX.Element {
  const { onChange, current, last, first, next, previous } = props
  const currentBG = useColorModeValue('blue.600', 'blue.200')
  const currentColor = useColorModeValue('white', 'black')

  return (
    <>
      <Circle size="32px" bg={currentBG} mr={2} color={currentColor}>
        {current}
      </Circle>
      <ButtonGroup isAttached colorScheme="gray">
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="first"
          isDisabled={first === last || current === first}
          icon={<ChevronLeftIcon />}
          onClick={() => onChange(first)}
        />
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="previous"
          icon={<MinusIcon />}
          disabled={current === first}
          onClick={() => onChange(previous || first)}
        />
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="next"
          icon={<AddIcon />}
          onClick={() => onChange(next || last)}
          disabled={current === last}
        />
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="last"
          icon={<ChevronRightIcon />}
          onClick={() => onChange(last)}
          isDisabled={first === last || current === last}
        />
      </ButtonGroup>
    </>
  )
}

export default Pagination
