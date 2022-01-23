import React from 'react'
import { Flex, Spacer, Stack, useColorMode, Image } from '@chakra-ui/react'
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
      <Image alt="logo" src={LogoImage} p={1} mb={5} />
      <Stack>
        <UserBucket />
        <NotifyBucket />
      </Stack>
      <Spacer />
      <Stack>
        <div>d</div>
      </Stack>
    </Flex>
  )
}

export default MenuBar
