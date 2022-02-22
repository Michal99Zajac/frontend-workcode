import React from 'react'
import { MenuItem } from '@chakra-ui/react'

interface AccordionItemProps {
  children: React.ReactNode
  isClickable?: boolean
}

export function AccordionItem(props: AccordionItemProps): JSX.Element {
  const { children } = props

  return <MenuItem>{children}</MenuItem>
}

export default AccordionItem
