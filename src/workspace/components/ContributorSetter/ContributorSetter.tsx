import React from 'react'
import {
  Avatar,
  Flex,
  Heading,
  Spacer,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { SettingsIcon } from '@chakra-ui/icons'

import { ContributorRoleBadge } from '../ContributorRoleBadge'
import { ContributorType } from '../../schemas'

import classes from './ContributorSetter.module.scss'

type SetContributor = (contributor: ContributorType) => void

interface ContributorProps {
  setContributor: SetContributor
  contributor: ContributorType
}

export function ContributorSetter(props: ContributorProps): JSX.Element {
  const { contributor, setContributor } = props
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Flex
      alignItems="center"
      className={clsx(
        classes.contributor,
        isDark ? classes.darkContributor : classes.lightContributor
      )}
    >
      <Avatar
        name={`${contributor.firstname} ${contributor.lastname}`}
        src={contributor.src || undefined}
        size="sm"
      />
      <Stack ml={2} spacing={0.5}>
        <Flex>
          <Heading fontSize="sm" isTruncated mr={2}>
            {contributor.firstname} {contributor.lastname}
          </Heading>
          <ContributorRoleBadge role={contributor.role} />
        </Flex>
        <Heading fontSize="xx-small" isTruncated>
          {contributor.email}
        </Heading>
      </Stack>
      <Spacer />
      <SettingsIcon
        cursor="pointer"
        m={2}
        onClick={() => setContributor(contributor)}
      />
    </Flex>
  )
}

export default ContributorSetter
