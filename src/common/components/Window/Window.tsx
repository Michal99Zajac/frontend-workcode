import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import { Surface } from '../Surface'

interface WindowProps {
  children: React.ReactNode
  title: string
  bg?: string
  onClick?: () => void
}

export function Window(props: WindowProps): JSX.Element {
  const { children, title, bg, onClick } = props

  return (
    <Surface>
      <Box padding={1} backgroundColor={bg}>
        <Heading whiteSpace="nowrap" size="md">
          {title}
        </Heading>
        {onClick && (
          <CloseIcon
            w={4}
            h={4}
            _hover={{ cursor: 'pointer' }}
            onClick={onClick}
          />
        )}
      </Box>
      <Box>{children}</Box>
    </Surface>
  )
}

export default Window
