import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

import { Window, DragPocket } from '../../../common/components'

import classes from './NotFound.module.scss'

export function NotFound(): JSX.Element {
  const { windowContent, notFoundPage, returnDiv } = classes

  return (
    <Box className={notFoundPage}>
      <Box className={returnDiv}>
        <Link to="/">
          <CloseIcon w={8} h={8} />
        </Link>
      </Box>
      <DragPocket
        defaultPosition={{
          x: document.body.clientWidth / 2 - 200,
          y: document.body.clientHeight / 2 - 150,
        }}
      >
        <Box position="absolute">
          <Window title="Not Found">
            <Box className={windowContent}>
              <Heading fontSize="9xl">404</Heading>
            </Box>
          </Window>
        </Box>
      </DragPocket>
    </Box>
  )
}

export default NotFound
