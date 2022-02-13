import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@chakra-ui/react'

import { useAuth } from '../../../common/store'

import classes from './Main.module.scss'

export function Main(): JSX.Element {
  const navigation = useNavigate()
  const user = useAuth((state) => state.user)

  return (
    <Box className={classes.page}>
      <Box padding={5}>
        {user ? (
          <Button
            width="160px"
            onClick={() => navigation('/workspace')}
            size="lg"
          >
            menu
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigation('/auth')}
              size="lg"
              marginRight={2}
            >
              sign in
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigation('/auth/signup')}
              to="/auth/signup"
              size="lg"
              marginLeft={2}
            >
              sign up
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Main
