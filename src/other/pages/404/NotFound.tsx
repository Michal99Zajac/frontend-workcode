import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import Draggable from 'react-draggable'

import { Window } from '../../../common/components'

import classes from './NotFound.module.scss'

enum Cursor {
  GRAB = 'grab',
  GRABBING = 'grabbing',
}

export function NotFound(): JSX.Element {
  const { windowContent, notFoundPage, returnDiv } = classes
  const [windowCord] = useState({
    x: document.body.clientWidth / 2 - 200,
    y: document.body.clientHeight / 2 - 150,
  })
  const [cursor, setCursor] = useState(Cursor.GRAB)

  return (
    <Box className={notFoundPage}>
      <Box className={returnDiv}>
        <Link to="/workspace/menu">
          <CloseIcon w={8} h={8} />
        </Link>
      </Box>
      <Draggable
        bounds="parent"
        defaultPosition={windowCord}
        onStart={() => setCursor(Cursor.GRABBING)}
        onStop={() => setCursor(Cursor.GRAB)}
      >
        <Box position="absolute" _hover={{ cursor: cursor }}>
          <Window title="Not Found">
            <Box className={windowContent}>
              <Heading fontSize="9xl">404</Heading>
            </Box>
          </Window>
        </Box>
      </Draggable>
    </Box>
  )
}

export default NotFound
