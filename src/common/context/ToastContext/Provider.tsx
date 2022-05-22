import React, { useCallback } from 'react'
import { useToast, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ToastMessages } from 'common/schemas'

import { ToastContext, RunToastType } from './Context'

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider = (props: ToastProviderProps): JSX.Element => {
  const { children } = props
  const toast = useToast()
  const { t } = useTranslation()

  const runToast = useCallback<RunToastType>(function (
    messageObject,
    title,
    type
  ) {
    let messages: string[] = []
    if (ToastMessages.safeParse(messageObject).success) {
      messages = Object.values(messageObject)
    } else {
      messages = Object.values(messageObject).map((message) => message.message)
    }

    if (!messages.length) return

    toast({
      title: t(title),
      description: (
        <Box>
          {messages.map((message) => (
            <Text key={message}>{t(message)}</Text>
          ))}
        </Box>
      ),
      status: type,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  },
  [])

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
