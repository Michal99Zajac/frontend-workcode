/* eslint-disable react/display-name */
import React from 'react'
import { useColorMode, IconProps, ComponentWithAs } from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './styles.module.scss'

export const WorkcodeIcon =
  (Icon: ComponentWithAs<'svg', IconProps>) =>
  (props: IconProps): JSX.Element => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
      <Icon
        {...props}
        className={clsx(
          props.className,
          isDark ? classes.iconDark : classes.iconLight
        )}
      />
    )
  }

export default WorkcodeIcon
