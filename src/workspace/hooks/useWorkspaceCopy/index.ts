import { useCallback } from 'react'
import { useClipboard } from '@chakra-ui/react'

import { useToast } from '../../../common/hooks'

type Copy = () => void

export const useWorkspaceCopy = (workspaceId: string): [Copy, boolean] => {
  const runToast = useToast()
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.origin}/editor/${workspaceId}`
  )

  const copy = useCallback(() => {
    runToast({ success: 'Copied to clipboard' }, 'Success', 'info')
    onCopy()
  }, [onCopy])

  return [copy, hasCopied]
}

export default useWorkspaceCopy
