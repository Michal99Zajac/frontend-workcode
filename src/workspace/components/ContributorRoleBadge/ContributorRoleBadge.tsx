import { Badge } from '@chakra-ui/react'
import React, { useCallback } from 'react'

import { WorkspaceRoleEnum } from '../../schemas'

interface ContributorRoleBadgeProps {
  role: WorkspaceRoleEnum
}

export function ContributorRoleBadge(
  props: ContributorRoleBadgeProps
): JSX.Element {
  const { role } = props

  const getColor = useCallback(() => {
    switch (role) {
      case 'ADMIN':
        return '#F0E68C99'
      case 'EDITOR':
        return '#00FFFF99'
      case 'WATCHER':
        return '#8B008B99'
      default:
        throw new Error('Role is not specified')
    }
  }, [role])

  return <Badge bg={getColor()}>{role}</Badge>
}

export default ContributorRoleBadge
