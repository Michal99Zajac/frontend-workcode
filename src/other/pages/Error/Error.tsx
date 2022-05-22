import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Text,
  Center,
  Heading,
  Stack,
  Flex,
  Spacer,
  Accordion,
  IconButton,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react'
import { FallbackProps } from 'react-error-boundary'
import { RepeatIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'

import { Surface } from 'common/components'

export function Error(props: FallbackProps): JSX.Element {
  const { t } = useTranslation()
  const { error, resetErrorBoundary } = props
  const schema = useColorModeValue('blackAlpha', 'whiteAlpha')
  const color = useColorModeValue('black', 'white')
  const accordionBG = useColorModeValue('gray.100', 'gray.600')

  return (
    <Center w="100%" height="100%">
      <Stack minW="520px" maxW="520px">
        <Heading size="2xl">Workcode</Heading>
        <Surface>
          <Stack spacing={6}>
            <Flex>
              <Heading size="xl">{error.name}</Heading>
              <Spacer />
              <IconButton
                ml={2}
                aria-label="close"
                size="sm"
                colorScheme={schema}
                icon={<RepeatIcon color={color} />}
                variant="ghost"
                onClick={resetErrorBoundary}
              />
            </Flex>
            <Accordion allowToggle>
              <AccordionItem border="none" bg={accordionBG} borderRadius={3}>
                <AccordionButton
                  _focus={{ boxShadow: 'none', bg: 'blackAlpha.50' }}
                >
                  <Text>{t('other.pages.error.accordion.button')}</Text>
                  <Spacer />
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={0}>
                  <Alert status="error">
                    <AlertIcon />
                    <Box w="100%">
                      <AlertTitle>
                        {t('other.pages.error.accordion.alert.title')}
                      </AlertTitle>
                      <AlertDescription>{error.message}</AlertDescription>
                    </Box>
                  </Alert>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button
              alignSelf="flex-end"
              as={Link}
              to="/"
              colorScheme="red"
              bg="red.600"
              color="white"
              w="min-content"
            >
              {t('other.pages.error.button.content')}
            </Button>
          </Stack>
        </Surface>
      </Stack>
    </Center>
  )
}

export default Error
