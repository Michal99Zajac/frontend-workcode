import React from 'react'
import { Box, Heading, Center } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { useAuth } from '../../../store'
import BasicSetting from '../../BasicSetting'
import UserBucket from '../../UserBucket'

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
        <Box w="40%" h="100%">
          <Outlet />
        </Box>
        <Center w="60%">
          <Heading style={{ fontSize: '184px' }}>Workcode</Heading>
        </Center>
      </Box>
    </Box>
  )
}

export default MainLayout
