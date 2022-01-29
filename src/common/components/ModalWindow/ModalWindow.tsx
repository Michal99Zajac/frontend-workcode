import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
  Flex,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import classes from './ModalWindow.module.scss'

type onClose = () => void

interface ModalWindowProps {
  isOpen: boolean
  onClose: onClose
  title: string
  children: React.ReactNode
}

export function ModalWindow(props: ModalWindowProps): JSX.Element {
  const { title, children, isOpen, onClose } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={classes.content}>
        <ModalHeader className={classes.header}>
          <Flex height="2rem" align="center" justifyContent="space-between">
            <Heading size="md">{title}</Heading>
            <CloseIcon
              w={4}
              h={4}
              _hover={{ cursor: 'pointer' }}
              onClick={onClose}
            />
          </Flex>
        </ModalHeader>
        <ModalBody className={classes.body}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalWindow
