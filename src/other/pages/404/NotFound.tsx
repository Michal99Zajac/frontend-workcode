import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Window, DragPocket } from '../../../common/components'

import classes from './NotFound.module.scss'

export function NotFound(): JSX.Element {
  const { windowContent, page } = classes
  const navigation = useNavigate()

  return (
    <Box className={page}>
      <DragPocket>
        <Box position="absolute">
          <Window title="Not Found" onClick={() => navigation('/')}>
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
