import { useContext } from 'react'

import { ToastContext, RunToastType } from '../../context/ToastContext'

export const useToast = (): RunToastType => {
  const { runToast } = useContext(ToastContext)

  if (!runToast) throw new Error('Toast Context is not provided')

  return runToast
}

export default useToast
