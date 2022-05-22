import React from 'react'
import { FieldErrors } from 'react-hook-form'

import { ValidToastErrorType } from '../../schemas/ValidToastError'

export type ToastType = 'warning' | 'success' | 'info' | 'error'

export type ValidFunctionType = (
  error: FieldErrors | ValidToastErrorType,
  type: ToastType,
  title?: string
) => void

interface ToaxtContextValidType {
  valid: ValidFunctionType
}

export const ToastValidContext = React.createContext<ToaxtContextValidType>({
  valid: () => {},
})

export default ToastValidContext
