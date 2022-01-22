import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@chakra-ui/react'

import { useAuth } from '../../../common/store'

import classes from './Index.module.scss'

export function Index(): JSX.Element {
  const navigation = useNavigate()
  const user = useAuth((state) => state.user)

  return (
    <Box className={classes.page}>
      <Box padding={5}>
        {user ? (
          <Button
            width="160px"
            onClick={() => navigation('/workspace/menu')}
            size="lg"
          >
            menu
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigation('/auth/signin')}
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

export default Index
