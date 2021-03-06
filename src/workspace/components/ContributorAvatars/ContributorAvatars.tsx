import React from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { Contributor } from 'common/schemas'
import { MoreIcon } from 'icons/common'

import classes from './ContributorAvatars.module.scss'

interface ContributorAvatarsProps {
  workspaceId: string
  contributors: Contributor[]
  isOwner?: boolean
}

export function ContributorAvatars(
  props: ContributorAvatarsProps
): JSX.Element {
  const { contributors, isOwner, workspaceId } = props
  const moreIconColor = useColorModeValue('black', 'white')

  if (contributors.length === 0 && isOwner)
    return (
      <IconButton
        colorScheme="gray"
        borderRadius="full"
        aria-label="invite link"
        to={`/workspace/${workspaceId}/invite`}
        as={Link}
        icon={<AddIcon />}
        variant="outline"
        size="sm"
      />
    )

  return (
    <Box className={classes.stack} position="relative" h="8">
      {contributors.slice(0, 3).map((contributor, index) => (
        <Tooltip
          placement="top"
          key={contributor._id}
          label={`${contributor.name} ${contributor.lastname}`}
        >
          <Avatar
            zIndex={index + 2}
            position="absolute"
            transition="all 0.6s"
            size="sm"
            name={contributor.name}
            src={contributor.src || undefined}
          />
        </Tooltip>
      ))}
      <Tooltip placement="top" label="more">
        <IconButton
          colorScheme="gray"
          zIndex={1}
          transition="all 0.6s"
          position="absolute"
          borderRadius="full"
          aria-label="invite link"
          to={`/workspace/${workspaceId}/contributors`}
          as={Link}
          icon={<MoreIcon fill={moreIconColor} />}
          variant="ghost"
          size="sm"
        />
      </Tooltip>
    </Box>
  )
}

export default ContributorAvatars
