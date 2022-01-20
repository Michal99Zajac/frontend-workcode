import React from 'react'
import { Box, Image, Heading } from '@chakra-ui/react'

import { useAuth } from '../../store'
import BasicSetting from '../BasicSetting'
import UserBucket from '../UserBucket'
import LogoImage from '../../../assets/img/logo.png'

import classes from './MainLayout.module.scss'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout(props: MainLayoutProps): JSX.Element {
  const user = useAuth((state) => state.user)
  const { children } = props

  const userBucket = !user ? null : (
    <Box className={classes.bucket}>
      <UserBucket />
    </Box>
  )

  return (
    <Box className={classes.layout}>
      {userBucket}
      <Box className={classes.setting}>
        <BasicSetting />
      </Box>
      <Box className={classes.center}>
        <Box width={40} height={40}>
          <Image src={LogoImage} alt="Logo" />
        </Box>
        <Heading marginLeft={20} fontSize="9xl">
          Workcode
        </Heading>
      </Box>
      {children}
    </Box>
  )
}

export default MainLayout
