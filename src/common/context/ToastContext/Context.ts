import React from 'react'
import { FieldErrors } from 'react-hook-form'

import { ToastMessages } from 'common/schemas'

export type ToastType = 'warning' | 'success' | 'info' | 'error'

export type RunToastType = (
  messageObject: FieldErrors | ToastMessages,
  title: string,
  type?: ToastType
) => void

interface ToastContextType {
  runToast: RunToastType
}

export const ToastContext = React.createContext<ToastContextType>({
  runToast: () => {},
})

export default ToastContext
