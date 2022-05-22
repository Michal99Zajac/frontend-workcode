import React from 'react'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface EdiorCompasProps {
  ch: number
  line: number
}

export function EditorCompas(props: EdiorCompasProps): JSX.Element {
  const { t } = useTranslation()
  const { ch, line } = props

  return (
    <Text fontSize="xx-small" px={2}>
      {t('editor.components.editor_compas.ch')} {ch},{' '}
      {t('editor.components.editor_compas.line')} {line}
    </Text>
  )
}

export default EditorCompas
