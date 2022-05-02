import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  IconButton,
} from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'

type OnReload = () => void
interface ErrorReloadProps {
  title?: string
  message?: string | null
  isError: boolean
  onReload: OnReload
  children: React.ReactNode
}

export function ErrorReload(props: ErrorReloadProps): JSX.Element {
  const { title, message, onReload, children, isError } = props

  if (!isError) return <>{children}</>

  return (
    <Alert status="error" borderRadius={4} flexDirection="column">
      <AlertIcon boxSize="32px" mr={0} />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
      <IconButton
        variant="ghost"
        colorScheme="blackAlpha"
        onClick={onReload}
        aria-label="reload icon"
        icon={<RepeatIcon />}
        size="sm"
        position="absolute"
        top="8px"
        right="8px"
      />
    </Alert>
  )
}

export default ErrorReload
