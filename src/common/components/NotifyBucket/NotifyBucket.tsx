import React from 'react'
import { Box, Skeleton, Stack, SkeletonCircle } from '@chakra-ui/react'

import { MenuWindow } from '../MenuWindow'
import { BellIcon } from '../../../assets/icons/common/bell'

// TODO: mock fetching notofication data
export function NotifyBucket(): JSX.Element {
  const array = Array(10)
    .fill(0)
    .map((_, i) => i)

  return (
    <MenuWindow
      placement="right-start"
      title="Notifications"
      menuButton={<BellIcon fontSize="2xl" />}
      menuMaxHeight={300}
      menuWidth={300}
    >
      <Stack>
        {array.map((value) => (
          <Box key={value}>
            <SkeletonCircle />
            <Skeleton height={20} />
          </Box>
        ))}
      </Stack>
    </MenuWindow>
  )
}

export default NotifyBucket
