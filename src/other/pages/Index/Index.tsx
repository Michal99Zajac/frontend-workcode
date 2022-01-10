import {} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Box,
  Image,
  Heading,
  useColorMode,
  Switch,
  Spinner,
} from '@chakra-ui/react'

import LogoImage from '../../../assets/img/logo.png'

import classes from './Index.module.scss'

export function Index(): JSX.Element {
  const navigation = useNavigate()
  const { toggleColorMode } = useColorMode()

  return (
    <Box className={classes.indexPage}>
      <Box className={classes.top}>
        <Box className={classes.setting}>
          <Switch marginRight={5} onChange={toggleColorMode} />
          <Spinner />
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
      </Box>
    </Box>
  )
}

export default Index
