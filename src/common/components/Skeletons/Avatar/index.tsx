import React from 'react'
import { SkeletonCircle, SkeletonProps } from '@chakra-ui/react'

import { Skeletons } from '../Skeletons'

export const AvatarSkeleton = Skeletons(
  (props: SkeletonProps): JSX.Element => <SkeletonCircle {...props} />
)

export default AvatarSkeleton
