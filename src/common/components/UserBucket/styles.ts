import { AvatarProps } from '@chakra-ui/react'

export const AvatarButtonStyle: AvatarProps = {
  textAlign: 'center',
  size: 'sm',
  transition: 'all 0.3s',
  _hover: {
    shadow: 'outline',
    cursor: 'pointer',
  },
  sx: {
    '& > div': {
      width: '100%',
    },
  },
}

export default AvatarButtonStyle
