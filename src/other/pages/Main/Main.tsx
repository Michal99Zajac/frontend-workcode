import React from 'react'
import { Link } from 'react-router-dom'
import { Center, Stack } from '@chakra-ui/react'

import { useAuth } from 'common/store'
import { SignupIcon, LockIcon, FolderIcon } from 'icons/common'
import { ActionTile } from 'other/components'

export function Main(): JSX.Element {
  const user = useAuth((state) => state.user)

  return (
    <Center w="100%" h="100%">
      <Stack spacing={8}>
        {user ? (
          <Link to="/workspace">
            <ActionTile Icon={FolderIcon} title="Work" />
          </Link>
        ) : (
          <>
            <Link to="/auth/signin">
              <ActionTile Icon={LockIcon} title="Sign In" />
            </Link>
            <Link to="auth/signup">
              <ActionTile Icon={SignupIcon} title="Sign Up" />
            </Link>
          </>
        )}
      </Stack>
    </Center>
  )
}

export default Main
