import React, { useMemo } from 'react'
import {
  Flex,
  useColorMode,
  Spacer,
  Heading,
  Tooltip,
  Stack,
  Badge,
  Box,
  Text,
  MenuOptionGroup,
  MenuItem,
} from '@chakra-ui/react'
import { CalendarIcon, HamburgerIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { AvatarTag } from '../AvatarTag'
import { MenuCardUpdate } from '../MenuCardUpdate'
import { MenuCardCopy } from '../MenuCardCopy'
import { MenuCardInvite } from '../MenuCardInvite'
import { MenuCardContributors } from '../MenuCardContributors'
import { WorkspaceType } from '../../schemas'
import { codeColor } from '../../utils'
import { MenuWindow } from '../../../common/components'

import classes from './WorkspaceCard.module.scss'

interface WorkspaceCardProps {
  workspace: WorkspaceType
  isAdmin?: boolean
}

export function WorkspaceCard(props: WorkspaceCardProps): JSX.Element {
  const { workspace, isAdmin } = props
  const { colorMode } = useColorMode()
  const isDark = useMemo(() => colorMode === 'dark', [colorMode])

  return (
    <Flex
      direction="column"
      className={clsx(
        classes.card,
        isDark ? classes.darkCard : classes.lightDark
      )}
    >
      <Stack mb={2}>
        <Flex align="flex-start">
          <Tooltip placement="top" hasArrow label={workspace.name}>
            <Heading fontSize="4xl" width="min-content" isTruncated>
              {workspace.name}
            </Heading>
          </Tooltip>
          <Spacer />
          <Tooltip
            placement="top"
            hasArrow
            label={dayjs(workspace.createdAt).format('D/MM/YYYY')}
          >
            <CalendarIcon m={1} />
          </Tooltip>
        </Flex>
        <Box>
          <Badge bg={codeColor(workspace.code)}>{workspace.code}</Badge>
        </Box>
        <Text fontSize="small" maxH="50px" overflow="hidden">
          {workspace.description}
        </Text>
      </Stack>
      <Spacer />
      <Flex>
        <Box as="span">{!isAdmin && <AvatarTag user={workspace.admin} />}</Box>
        <Spacer />
        <MenuWindow title="Actions" menuButton={<HamburgerIcon />}>
          <MenuOptionGroup>
            {isAdmin && <MenuCardUpdate workspace={workspace} />}
            {isAdmin && <MenuCardInvite workspace={workspace} />}
            {isAdmin && <MenuCardContributors workspace={workspace} />}
            <MenuCardCopy workspace={workspace} />
            <MenuItem>Delete</MenuItem>
          </MenuOptionGroup>
        </MenuWindow>
      </Flex>
    </Flex>
  )
}

export default WorkspaceCard
