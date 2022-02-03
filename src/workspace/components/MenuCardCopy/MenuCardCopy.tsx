import React, { useCallback } from 'react'
import { MenuItem, useClipboard } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

import { WorkspaceType } from '../../schemas'
import { useToast } from '../../../common/hooks'

interface ManuCardCopyProps {
  workspace: WorkspaceType
}

export function MenuCardCopy(props: ManuCardCopyProps): JSX.Element {
  const { workspace } = props
  const runToast = useToast()
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.origin}/workspace/editor/${workspace.id}`
  )

  const onClick = useCallback(() => {
    runToast({ success: 'Copied to clipboard' }, 'Success', 'info')
    onCopy()
  }, [onCopy])

  return (
    <MenuItem onClick={onClick}>
      <CopyIcon mr={4} /> {!hasCopied ? 'Copy Link' : 'Copied'}
    </MenuItem>
  )
}

export default MenuCardCopy
