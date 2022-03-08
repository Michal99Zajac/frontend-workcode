import React from 'react'
import { Flex, Spacer, Stack, useColorMode, Image, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import LogoImage from '../../../assets/img/logo.png'
import { UserBucket } from '../UserBucket'
import { NotifyBucket } from '../NotifyBucket'

import classes from './MenuBar.module.scss'

export function MenuBar(): JSX.Element {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Flex
      className={clsx(classes.bar, isDark ? classes.darkBar : classes.lightBar)}
      direction="column"
      align="center"
    >
      <Stack mt={2} mb={2}>
        <UserBucket />
        <NotifyBucket />
      </Stack>
      <Spacer />
      <Box as={Link} to="/">
        <Image alt="logo" src={LogoImage} p={1} />
      </Box>
    </Flex>
  )
}

export default MenuBar
