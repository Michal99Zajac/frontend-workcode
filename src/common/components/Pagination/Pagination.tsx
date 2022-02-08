import React from 'react'
import { ButtonGroup, IconButton, Center, useColorMode } from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons'
import clsx from 'clsx'

import classes from './Pagination.module.scss'

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
  const { colorMode } = useColorMode()
  const { paginationButton, pagination, paginationDark, paginationLight } =
    classes
  const isDark = colorMode === 'dark'

  return (
    <ButtonGroup isAttached gap={0.5}>
      <Center
        className={clsx(pagination, isDark ? paginationDark : paginationLight)}
      >
        {current}
      </Center>
      <IconButton
        className={paginationButton}
        size="xs"
        aria-label="first"
        isDisabled={first === last || current === first}
        icon={<ChevronLeftIcon />}
        onClick={() => onChange(first)}
      />
      <IconButton
        className={paginationButton}
        size="xs"
        aria-label="previous"
        icon={<MinusIcon />}
        disabled={previous === null}
        onClick={() => onChange(previous || first)}
      />
      <IconButton
        className={paginationButton}
        size="xs"
        aria-label="first"
        icon={<AddIcon />}
        onClick={() => onChange(next || last)}
        disabled={next === null}
      />
      <IconButton
        className={paginationButton}
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
