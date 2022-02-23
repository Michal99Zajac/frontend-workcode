import React from 'react'
import {
  Center,
  Heading,
  Stack,
  useColorModeValue,
  IconProps,
} from '@chakra-ui/react'

import { Surface } from '../../../common/components'

type IconComponent = (props: IconProps) => JSX.Element

interface ActionTileProps {
  Icon: IconComponent
  title: string
}

export function ActionTile(props: ActionTileProps): JSX.Element {
  const { Icon, title } = props
  const tileColor = useColorModeValue('blue.50', 'blue.300')
  const iconColor = useColorModeValue('black', 'white')

  return (
    <Surface
      h="220px"
      w="320px"
      transition="all 0.6s"
      _hover={{
        bg: tileColor,
        cursor: 'pointer',
      }}
    >
      <Center w="100%" h="100%">
        <Stack align="center" spacing={4}>
          <Icon fill={iconColor} fontSize="8xl" />
          <Heading fontSize="lg">{title}</Heading>
        </Stack>
      </Center>
    </Surface>
  )
}

export default ActionTile
