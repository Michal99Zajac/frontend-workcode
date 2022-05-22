import React from 'react'
import { Link } from 'react-router-dom'
import { Center, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuth } from 'common/store'
import { SignupIcon, LockIcon, FolderIcon } from 'icons/common'
import { ActionTile } from 'other/components'

export function Main(): JSX.Element {
  const { t } = useTranslation()
  const user = useAuth((state) => state.user)

  return (
    <Center w="100%" h="100%">
      <Stack spacing={8}>
        {user ? (
          <Link to="/workspace">
            <ActionTile
              Icon={FolderIcon}
              title={t('other.pages.main.workspaces')}
            />
          </Link>
        ) : (
          <>
            <Link to="/auth/signin">
              <ActionTile
                Icon={LockIcon}
                title={t('other.pages.main.signin')}
              />
            </Link>
            <Link to="auth/signup">
              <ActionTile
                Icon={SignupIcon}
                title={t('other.pages.main.signup')}
              />
            </Link>
          </>
        )}
      </Stack>
    </Center>
  )
}

export default Main
