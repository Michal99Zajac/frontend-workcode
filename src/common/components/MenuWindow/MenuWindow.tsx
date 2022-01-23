import React from 'react'
import {
  MenuList,
  Menu,
  PlacementWithLogical,
  Heading,
  useColorMode,
} from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './MenuWindow.module.scss'

interface MenuWindowProps {
  children: React.ReactNode
  menuButton: React.ReactNode
  title: string
  placement?: PlacementWithLogical
}

export function MenuWindow(props: MenuWindowProps): JSX.Element {
  const { children, menuButton, placement, title } = props
  const { colorMode } = useColorMode()

  const isDark = colorMode === 'dark'

  return (
    <Menu computePositionOnMount placement={placement}>
      {menuButton}
      <MenuList
        className={clsx(
          classes.window,
          isDark ? classes.windowDark : classes.windowLight
        )}
      >
        <Heading
          className={clsx(
            classes.heading,
            isDark ? classes.headingDark : classes.headingLight
          )}
          size="xs"
        >
          {title}
        </Heading>
        {children}
      </MenuList>
    </Menu>
  )
}

export default MenuWindow
