import React from 'react'
import { Box, Image, Heading, Center } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { useAuth } from '../../../store'
import BasicSetting from '../../BasicSetting'
import UserBucket from '../../UserBucket'
import LogoImage from '../../../../assets/img/logo.png'

import classes from './MainLayout.module.scss'

export function MainLayout(): JSX.Element {
  const user = useAuth((state) => state.user)

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
      <Box className={classes.content}>
        <Box w="50%" h="100%">
          <Outlet />
        </Box>
        <Center w="50%">
          <Box width={40} height={40} mr={20}>
            <Image src={LogoImage} alt="Logo" />
          </Box>
          <Heading fontSize="9xl">Workcode</Heading>
        </Center>
      </Box>
    </Box>
  )
}

export default MainLayout
