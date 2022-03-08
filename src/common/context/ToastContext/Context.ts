import React from 'react'
import { FieldErrors } from 'react-hook-form'

import { ValidToastErrorType } from '../../schemas/ValidToastError'

export type ToastType = 'warning' | 'success' | 'info' | 'error'

export type RunToastType = (
  error: FieldErrors | ValidToastErrorType,
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
