import React, { useCallback } from 'react'
import { useToast, Box, Text } from '@chakra-ui/react'

import { ToastContext, RunToastType } from './Context'
import { ValidToastError } from '../../schemas/ValidToastError'

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider = (props: ToastProviderProps): JSX.Element => {
  const { children } = props
  const toast = useToast()

  const runToast = useCallback<RunToastType>(function (errors, title, type) {
    let messages: string[] = []
    if (ValidToastError.safeParse(errors).success) {
      messages = Object.values(errors)
    } else {
      messages = Object.values(errors).map((error) => error.message)
    }

    if (!messages.length) return

    toast({
      title: title,
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
    <ToastContext.Provider
      value={{
        runToast: runToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
