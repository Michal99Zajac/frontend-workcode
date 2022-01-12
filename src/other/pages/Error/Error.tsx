import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Box, Text, Kbd, Button, Image } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import { FallbackProps } from 'react-error-boundary'

import { Window } from '../../../common/components'
import { getRandomInt } from '../../utils'
import LogoImage from '../../../assets/img/logo.png'

import classes from './Error.module.scss'

export function Error(props: FallbackProps): JSX.Element {
  const { error, resetErrorBoundary } = props
  const windows = useRef<HTMLDivElement[]>([])
  const array: number[] = Array(30)
    .fill(0)
    .map((_, i) => i)

  useEffect(() => {
    console.error(error.message)
    windows.current.forEach((win, index) =>
      setTimeout(() => (win.style.visibility = 'visible'), 40 * index)
    )
  }, [])

  return (
    <Box className={classes.page}>
      {array.map((val, index) => (
        <Draggable
          key={val}
          defaultClassName={classes.default}
          defaultClassNameDragging={classes.grabed}
          defaultPosition={{
            x: getRandomInt(window.innerWidth - 450),
            y: getRandomInt(window.innerHeight - 350),
          }}
          bounds="parent"
          handle=".handle"
        >
          <Box
            left={0}
            top={0}
            ref={(win) => {
              if (win) windows.current[index] = win
            }}
            style={{ visibility: 'hidden' }}
            className="handle"
            position="absolute"
          >
            <Window title="Error" bg="#D90D00">
              <Box className={classes.errorWindow}>
                <Text fontSize="4xl" textAlign="center" marginBottom={5}>
                  Something went wrong... :(
                </Text>
                <Button as={Link} to="/" onClick={resetErrorBoundary}>
                  <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>Delete</Kbd>
                </Button>
              </Box>
            </Window>
          </Box>
        </Draggable>
      ))}
      <Box width={400} height={400}>
        <Image src={LogoImage} alt="Logo" />
      </Box>
    </Box>
  )
}

export default Error
