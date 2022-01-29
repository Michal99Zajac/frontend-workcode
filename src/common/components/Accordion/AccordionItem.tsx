import React from 'react'
import { MenuItem, useColorMode } from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './Accordion.module.scss'

interface AccordionItemProps {
  children: React.ReactNode
  isClickable?: boolean
}

export function AccordionItem(props: AccordionItemProps): JSX.Element {
  const { children, isClickable } = props
  const { colorMode } = useColorMode()

  return (
    <MenuItem
      className={clsx(
        classes.accordionItem,
        isClickable && classes.clickAccordionItem,
        colorMode === 'dark'
          ? classes.clickAccordionItemDark
          : classes.clickAccordionItemLight
      )}
    >
      {children}
    </MenuItem>
  )
}

export default AccordionItem
