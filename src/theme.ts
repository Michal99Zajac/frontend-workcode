import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react'

export const workcodeTheme = extendTheme(
  {
    fonts: {
      body: 'Work Sans',
      heading: 'Work Sans',
    },
    colors: {
      blue: {
        '50': '#bed6ed',
        '100': '#6f9ec9',
        '200': '#4c80b0',
        '300': '#2b6194',
        '400': '#0c4375',
        '500': '#003668',
        '600': '#012c54',
        '700': '#00203d',
        '800': '#01182e',
        '900': '#020f1c',
      },
    },
  },
  withDefaultVariant({
    variant: 'filled',
    components: ['Input'],
  }),
  withDefaultColorScheme({ colorScheme: 'blue' })
)

console.log(workcodeTheme)

export default workcodeTheme
