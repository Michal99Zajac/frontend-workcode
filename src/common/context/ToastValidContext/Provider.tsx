import React, { useCallback } from 'react'
import { useToast, Box, Text } from '@chakra-ui/react'

import { ToastValidContext, ValidFunctionType } from './Context'
import { ValidToastError } from '../../schemas/ValidToastError'

interface ToastValidProviderProps {
  children: React.ReactNode
}

export const ToastValidProvider = (
  props: ToastValidProviderProps
): JSX.Element => {
  const { children } = props
  const toast = useToast()

  const valid = useCallback<ValidFunctionType>(function (errors, type, title) {
    let messages: string[] = []
    if (ValidToastError.safeParse(errors).success) {
      messages = Object.values(errors)
    } else {
      messages = Object.values(errors).map((error) => error.message)
    }

    if (!messages.length) return

    toast({
      title: title || 'Error',
      description: (
        <Box>
          {messages.map((message) => (
            <Text key={message}>{message}</Text>
          ))}
        </Box>
      ),
      status: type,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }, [])

  return (
    <ToastValidContext.Provider
      value={{
        valid: valid,
      }}
    >
      {children}
    </ToastValidContext.Provider>
  )
}

export default ToastValidProvider
