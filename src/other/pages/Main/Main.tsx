import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Center, HStack } from '@chakra-ui/react'

import { useAuth } from '../../../common/store'
import { SignupIcon, LockIcon } from '../../../assets/icons/common'
import { ActionTile } from '../../components'

export function Main(): JSX.Element {
  const navigation = useNavigate()
  const user = useAuth((state) => state.user)

  return (
    <Center w="100%" h="100%">
      <HStack>
        {user ? (
          <Button onClick={() => navigation('/workspace')} fontSize="5xl">
            menu
          </Button>
        ) : (
          <>
            <Link to="/auth">
              <ActionTile Icon={LockIcon} title="Sign In" />
            </Link>
            <Link to="auth/signup">
              <ActionTile Icon={SignupIcon} title="Sign Up" />
            </Link>
          </>
        )}
      </HStack>
    </Center>
  )
}

export default Main
