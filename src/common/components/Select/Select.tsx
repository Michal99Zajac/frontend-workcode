/* eslint-disable react/prop-types */
import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import ReactSelect, { Props } from 'react-select'

import styles from './styles'

interface SelectProps extends Props {
  isInvalid?: boolean
}

export const Select = React.forwardRef<any, SelectProps>((props, ref) => {
  const { colorMode } = useColorMode()

  return <ReactSelect ref={ref} {...props} styles={styles(colorMode)} />
})

export default Select

Select.displayName = 'Select'
