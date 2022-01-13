import React from 'react'
import { Box, Switch, useColorMode } from '@chakra-ui/react'

import { LanguageMenu } from '../LanguageMenu'

export function BasicSetting(): JSX.Element {
  const { toggleColorMode } = useColorMode()

  return (
    <Box>
      <Switch marginRight={5} onChange={toggleColorMode} />
      <LanguageMenu />
    </Box>
  )
}

export default BasicSetting
