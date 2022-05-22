import React from 'react'
import { Heading, Center, Stack, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function NotFound(): JSX.Element {
  const { t } = useTranslation()

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
          {t('other.pages.404.button.content')}
        </Button>
      </Stack>
    </Center>
  )
}

export default NotFound
