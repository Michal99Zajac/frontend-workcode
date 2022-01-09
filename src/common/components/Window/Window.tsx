import React from 'react'
import { Box, Heading, useColorMode } from '@chakra-ui/react'
import clsx from 'clsx'

import { Surface } from '../Surface'

import classes from './Window.module.scss'

interface WindowProps {
  children: React.ReactNode
  title: string
}

export function Window(props: WindowProps): JSX.Element {
  const { children, title } = props
  const { barDark, barLight } = classes
  const { colorMode } = useColorMode()

  const isDark = colorMode === 'dark'

  return (
    <Surface
      onDragCapture={(e) => console.log(e.clientX)}
      onDrag={(e) => console.log(e.clientX)}
      boxShadow={`3px 3px 0 1px ${isDark ? '#000' : '#FFF'}`}
    >
      <Box padding={1} className={clsx(isDark ? barDark : barLight)}>
        <Heading whiteSpace="nowrap" size="md">
          {title}
        </Heading>
      </Box>
      <Box>{children}</Box>
    </Surface>
  )
}

export default Window
