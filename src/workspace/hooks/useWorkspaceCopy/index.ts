import { useCallback } from 'react'
import { useClipboard } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useToast } from 'common/hooks'

type Copy = () => void

export const useWorkspaceCopy = (workspaceId: string): [Copy, boolean] => {
  const runToast = useToast()
  const { t } = useTranslation()
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.origin}/editor/${workspaceId}`
  )

  const copy = useCallback(() => {
    runToast(
      {
        success: t(
          'workspace.hooks.workspace_copy.toast.success.standard.message'
        ),
      },
      t('workspace.hooks.workspace_copy.toast.success.standard.title'),
      'info'
    )
    onCopy()
  }, [onCopy])

  return [copy, hasCopied]
}

export default useWorkspaceCopy
