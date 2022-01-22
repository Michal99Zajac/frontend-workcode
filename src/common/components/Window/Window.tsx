import React from 'react'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import clsx from 'clsx'

import { Surface } from '../Surface'

import classes from './Window.module.scss'

interface WindowProps {
  children: React.ReactNode
  title: string
  bg?: string
  onClick?: () => void
}

export function Window(props: WindowProps): JSX.Element {
  const { children, title, bg, onClick } = props
  const { barDark, barLight, bar } = classes
  const { colorMode } = useColorMode()

  const isDark = colorMode === 'dark'

  return (
    <Surface boxShadow={`3px 3px 0 1px ${isDark ? '#000' : '#FFF'}`}>
      <Box
        padding={1}
        backgroundColor={bg}
        className={clsx(isDark ? barDark : barLight, bar)}
      >
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
