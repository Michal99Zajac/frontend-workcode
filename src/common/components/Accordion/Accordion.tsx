import React from 'react'
import {
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
  Heading,
  Spacer,
  AccordionIcon,
  useColorMode,
} from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './Accordion.module.scss'

interface AccordionProps {
  title: string
  isInitialOpen?: boolean
  children?: React.ReactNode
}

export function Accordion(props: AccordionProps): JSX.Element {
  const { title, children, isInitialOpen } = props
  const { colorMode } = useColorMode()

  return (
    <ChakraAccordion defaultIndex={isInitialOpen ? [0] : undefined} allowToggle>
      <ChakraAccordionItem className={classes.accordion}>
        <AccordionButton
          className={clsx(
            classes.accordionButton,
            colorMode === 'dark'
              ? classes.accordionButtonDark
              : classes.accordionButtonLight
          )}
          p={1}
          fontSize="xs"
        >
          <Heading size="xs">{title}</Heading>
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel className={clsx(classes.accordionPanel)}>
          {children}
        </AccordionPanel>
      </ChakraAccordionItem>
    </ChakraAccordion>
  )
}

export default Accordion
