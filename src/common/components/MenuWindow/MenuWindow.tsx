import React from 'react'
import {
  MenuList,
  Menu,
  PlacementWithLogical,
  Heading,
  MenuButton,
  Box,
} from '@chakra-ui/react'
import clsx from 'clsx'

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

  return (
    <Menu computePositionOnMount placement={placement}>
      <MenuButton className={clsx(menuButtonClassName)}>
        {menuButton}
      </MenuButton>
      <MenuList>
        <Heading size="xs">{title}</Heading>
        <Box maxHeight={menuMaxHeight} width={menuWidth}>
          {children}
        </Box>
      </MenuList>
    </Menu>
  )
}

export default MenuWindow
