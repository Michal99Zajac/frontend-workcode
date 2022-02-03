import React from 'react'
import { FieldErrors } from 'react-hook-form'

import { ToastMessagesType } from '../../schemas/ToastMessages'

export type ToastType = 'warning' | 'success' | 'info' | 'error'

export type RunToastType = (
  messageObject: FieldErrors | ToastMessagesType,
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
