import React from 'react'
import {
  Flex,
  Heading,
  Box,
  Spacer,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import { Surface } from 'common/components'

interface WindowProps {
  children: React.ReactNode
  title: string
  onClick?: () => void
}

export function Window(props: WindowProps): JSX.Element {
  const { children, title, onClick } = props
  const buttonColor = useColorModeValue('black', 'white')

  return (
    <Surface>
      <Flex>
        <Heading whiteSpace="nowrap" size="lg">
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
            icon={<CloseIcon color={buttonColor} />}
          />
        )}
      </Flex>
      <Box>{children}</Box>
    </Surface>
  )
}

export default Window
