import React from 'react'
import {
  MenuList,
  Menu,
  PlacementWithLogical,
  Heading,
  useColorMode,
  MenuButton,
  Box,
} from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './MenuWindow.module.scss'

interface MenuWindowProps {
  children: React.ReactNode
  menuButton: React.ReactNode
  title: string
  placement?: PlacementWithLogical
  menuButtonClassName?: string
  menuMaxHeight?: number | string
  menuWidth?: number | string
}

export function MenuWindow(props: MenuWindowProps): JSX.Element {
  const {
    children,
    menuButton,
    placement,
    title,
    menuButtonClassName,
    menuMaxHeight,
    menuWidth,
  } = props
  const { colorMode } = useColorMode()

  const isDark = colorMode === 'dark'

  return (
    <Menu computePositionOnMount placement={placement}>
      <MenuButton
        className={clsx(
          isDark ? classes.highlighDark : classes.highlighLight,
          menuButtonClassName
        )}
      >
        {menuButton}
      </MenuButton>
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
        <Box
          maxHeight={menuMaxHeight}
          width={menuWidth}
          className={clsx(classes.content)}
        >
          {children}
        </Box>
      </MenuList>
    </Menu>
  )
}

export default MenuWindow
