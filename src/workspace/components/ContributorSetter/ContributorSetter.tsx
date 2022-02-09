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
import { UserType } from '../../../common/schemas'

import classes from './ContributorSetter.module.scss'

type SetContributor = (contributor: UserType) => void

interface ContributorProps {
  setContributor: SetContributor
  contributor: UserType
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
          <ContributorRoleBadge role="EDITOR" />
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
