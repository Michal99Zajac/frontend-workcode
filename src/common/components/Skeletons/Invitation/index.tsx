import React from 'react'
import { Skeleton } from '@chakra-ui/react'

import { Skeletons } from '../Skeletons'

export const InvitationSkeleton = Skeletons(
  (): JSX.Element => <Skeleton h="48px" w="100%" />
)

export default InvitationSkeleton
