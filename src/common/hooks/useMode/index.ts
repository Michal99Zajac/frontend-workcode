import { useCallback } from 'react'
import { useColorMode } from '@chakra-ui/react'

export const useMode = () => {
  const { colorMode } = useColorMode()

  return useCallback(
    (light: string, dark: string) => (colorMode === 'light' ? light : dark),
    [colorMode]
  )
}

export default useMode
