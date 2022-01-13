import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Box, Image, Heading } from '@chakra-ui/react'

import { useAuth } from '../../../common/hooks'
import LogoImage from '../../../assets/img/logo.png'
import { BasicSetting } from '../../../common/components'

import classes from './Index.module.scss'

export function Index(): JSX.Element {
  const navigation = useNavigate()
  const { user } = useAuth()

  return (
    <Box className={classes.indexPage}>
      <Box className={classes.top}>
        <Box className={classes.setting}>
          <BasicSetting />
        </Box>
      </Box>
      <Box className={classes.center}>
        <Box width={40} height={40}>
          <Image src={LogoImage} alt="Logo" />
        </Box>
        <Heading marginLeft={20} fontSize="9xl">
          Workcode
        </Heading>
      </Box>
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
