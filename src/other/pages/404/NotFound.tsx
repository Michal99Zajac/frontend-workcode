import React from 'react'
import { Heading, Center, Stack, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export function NotFound(): JSX.Element {
  return (
    <Center w="100%" h="100%">
      <Stack align="center">
        <Heading sx={{ fontSize: '360px' }}>404</Heading>
        <Button
          size="lg"
          w="min-content"
          as={Link}
          to="/"
          aria-label="menu return"
          leftIcon={<ArrowBackIcon />}
        >
          menu
        </Button>
      </Stack>
    </Center>
  )
}

export default NotFound
