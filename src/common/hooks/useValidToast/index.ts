import { useContext } from 'react'

import {
  ToastValidContext,
  ValidFunctionType,
} from '../../context/ToastValidContext'

export const useValidToast = (): ValidFunctionType => {
  const { valid } = useContext(ToastValidContext)

  if (!valid) throw new Error('Toast Context is not provided')

  return valid
}
