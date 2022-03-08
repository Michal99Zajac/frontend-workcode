import React from 'react'
import { createIcon } from '@chakra-ui/icons'

import { WorkcodeIcon } from '../WorkcodeIcon'

export const BellIcon = WorkcodeIcon(
  createIcon({
    displayName: 'BellIcon',
    viewBox: '0 0 136 152',
    path: (
      <path d="M83.1111 15.1111V0H52.8889V15.1111H15.1111V30.2222H120.889V15.1111H83.1111ZM120.889 105.778H15.1111V75.5556H0V120.889H37.7778V151.111H52.8889V120.889H83.1111V136H52.8889V151.111H98.2222V120.889H136V75.5556H120.889V30.2222H105.778V90.6667H120.889V105.778ZM15.1111 30.2222V90.6667H30.2222V30.2222H15.1111Z" />
    ),
  })
)

export default WorkcodeIcon(BellIcon)
