import React from 'react'
import { useColorModeValue, Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { NotFoundIcon } from 'icons/common'

export function NoWorkspaces() {
  const iconColor = useColorModeValue('blue.500', 'blue.200')
  const { t } = useTranslation()

  return (
    <Stack>
      <NotFoundIcon fill={iconColor} fontSize="200px" />
      <Button as={Link} to="/workspace/create">
        {t('workspace.components.no_workspaces.button.content')}
      </Button>
    </Stack>
  )
}

export default NoWorkspaces
