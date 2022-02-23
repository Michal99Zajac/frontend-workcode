import React from 'react'
import { Flex, Heading, Box, Spacer, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import { Surface } from '../Surface'

interface WindowProps {
  children: React.ReactNode
  title: string
  onClick?: () => void
}

export function Window(props: WindowProps): JSX.Element {
  const { children, title, onClick } = props

  return (
    <Surface>
      <Flex>
        <Heading whiteSpace="nowrap" size="md">
          {title}
        </Heading>
        <Spacer />
        {onClick && (
          <IconButton
            aria-label="close icon"
            size="xs"
            variant="ghost"
            colorScheme="blue"
            onClick={onClick}
            icon={<CloseIcon />}
          />
        )}
      </Flex>
      <Box>{children}</Box>
    </Surface>
  )
}

export default Window
