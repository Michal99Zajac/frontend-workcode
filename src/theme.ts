import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const workcodeTheme = extendTheme(
  {
    fonts: {
      body: 'Ubuntu',
      heading: 'Ubuntu',
    },
  },
  withDefaultColorScheme({ colorScheme: 'blue' })
)

export default workcodeTheme
