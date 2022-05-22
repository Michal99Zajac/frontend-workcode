import React from 'react'
import { Box, Container, Heading, Stack } from '@chakra-ui/react'

import { BasicSetting } from 'common/components'
import {
  DeleteAccount,
  UserDataUpdate,
  PasswordUpdate,
} from 'config/components'
import { useTranslation } from 'react-i18next'

import classes from './UserConfig.module.scss'

export function UserConfig(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Box className={classes.page}>
      <Container maxW="container.md" py={5}>
        <Stack spacing={8}>
          <Heading size="3xl">{t('config.pages.user_config.heading')}</Heading>
          <UserDataUpdate />
          <Box>
            <Heading size="xl" mb={5}>
              {t('config.pages.user_config.basic_setting.heading')}
            </Heading>
            <BasicSetting />
          </Box>
          <PasswordUpdate />
          <DeleteAccount />
        </Stack>
      </Container>
    </Box>
  )
}

export default UserConfig
