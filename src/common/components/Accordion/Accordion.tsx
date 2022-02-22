import React from 'react'
import {
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
  Heading,
  Spacer,
  AccordionIcon,
} from '@chakra-ui/react'

interface AccordionProps {
  title: string
  isInitialOpen?: boolean
  children?: React.ReactNode
}

export function Accordion(props: AccordionProps): JSX.Element {
  const { title, children, isInitialOpen } = props

  return (
    <ChakraAccordion defaultIndex={isInitialOpen ? [0] : undefined} allowToggle>
      <ChakraAccordionItem>
        <AccordionButton p={1} fontSize="xs">
          <Heading size="xs">{title}</Heading>
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>{children}</AccordionPanel>
      </ChakraAccordionItem>
    </ChakraAccordion>
  )
}

export default Accordion
