import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, IconButton, Tooltip } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { ContributorType } from '../../schemas'
import { MoreIcon } from '../../../icons/common'

import classes from './ContributorAvatars.module.scss'

interface ContributorAvatarsProps {
  workspaceId: string
  contributors: ContributorType[]
  isOwner?: boolean
}

export function ContributorAvatars(
  props: ContributorAvatarsProps
): JSX.Element {
  const { contributors, isOwner, workspaceId } = props

  if (contributors.length === 0 && isOwner)
    return (
      <IconButton
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
          key={contributor.id}
          label={`${contributor.firstname} ${contributor.lastname}`}
        >
          <Avatar
            zIndex={index + 2}
            position="absolute"
            transition="all 0.6s"
            size="sm"
            name={contributor.firstname}
            src={contributor.src || undefined}
          />
        </Tooltip>
      ))}
      <Tooltip placement="top" label="more">
        <IconButton
          zIndex={1}
          transition="all 0.6s"
          position="absolute"
          borderRadius="full"
          aria-label="invite link"
          to={`/workspace/${workspaceId}/contributors`}
          as={Link}
          icon={<MoreIcon />}
          variant="outline"
          size="sm"
        />
      </Tooltip>
    </Box>
  )
}

export default ContributorAvatars
