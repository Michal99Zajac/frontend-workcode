import { ColorMode } from '@chakra-ui/react'
import { StylesConfig } from 'react-select'

export const styles = (colorMode: ColorMode): StylesConfig => ({
  control: (styles, state) => ({
    ...styles,
    backgroundColor: colorMode === 'dark' ? '#102A43' : 'red',
    borderRadius: 0,
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0 0 0 1px ${colorMode === 'dark' ? '#63B3ED' : 'red'}`,
    },
    boxShadow: state.isFocused
      ? `3px 3px 0 1px ${colorMode === 'dark' ? '#63B3ED' : 'red'} !important`
      : 'none',
    opacity: state.isDisabled ? '0.4' : '1',
  }),
  input: (styles) => ({
    ...styles,
    color: colorMode === 'dark' ? '#ffffff' : '#000000',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: colorMode === 'dark' ? '#2F455B' : 'red',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '0px',
    backgroundColor: colorMode === 'dark' ? '#102A43' : 'red',
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: colorMode === 'dark' ? '#2F455B' : 'red',
  }),
  option: (styles, state) => ({
    ...styles,
    '&:hover': {
      backgroundColor: colorMode === 'dark' ? '#63B3ED' : 'red',
      cursor: 'pointer',
    },
    backgroundColor: state.isFocused
      ? colorMode === 'dark'
        ? '#63B3ED'
        : 'red'
      : 'transparent',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: colorMode === 'dark' ? '#ffffff' : '#000000',
  }),
})

export default styles
