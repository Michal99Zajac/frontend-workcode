import React, { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'

import { ModalWindow } from '../../../common/components'

export function DeleteAccount(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { control } = useForm()

  return (
    <form>
      <Heading size="xl" mb={5}>
        Delete Account
      </Heading>
      <Button onClick={onOpen}>Delete</Button>
      <ModalWindow isOpen={isOpen} onClose={onClose} title="Delete Account">
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">Password</Text>
              <Input
                type="password"
                isDisabled={isLoading}
                placeholder="Av+>mMUpw$aGQ"
                onChange={field.onChange}
                isInvalid={fieldState.invalid}
                ref={field.ref}
              />
            </Box>
          )}
        />
      </ModalWindow>
    </form>
  )
}

export default DeleteAccount
