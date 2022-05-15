/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { Editor as EditorType } from 'codemirror'

import { useEditor, useWorkspace } from 'editor/hooks'
import { useType, useUpdate, useContentUpdate } from 'editor/connection'

import { Editor } from './styled'

// styles
import 'codemirror/lib/codemirror.css'
// theme
import 'codemirror/theme/material.css'
// modes
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
// addons
import 'codemirror/addon/edit/closebrackets'

// use replace for updating and deleting content
// get cursor coords and send to the other teammates
export function CodeEditor() {
  const { content: initContent } = useWorkspace()
  const { colorMode } = useColorMode()
  const [content, setContent] = useState(initContent)
  const { setCursor, setEditor, editor } = useEditor()
  const type = useType()
  const updateContent = useContentUpdate()
  useUpdate((change) => {
    editor?.replaceRange(change.text, change.from, change.to, 'update')
  })

  return (
    <Editor
      theme={colorMode}
      editorDidMount={(editor) => setEditor(editor)}
      options={{
        mode: {
          name: 'javascript',
        },
        theme: 'material',
        lineNumbers: true,
        autoCloseBrackets: true,
        smartIndent: true,
        indentWithTabs: true,
        indentUnit: 2,
        autocorrect: true,
        tabSize: 2,
      }}
      value={content}
      onCursor={(editor, data) => {
        console.log(data)
        setCursor({
          ch: data.ch,
          line: data.line,
        })
      }}
      onChange={(editor, data, value) => {
        if (data.origin && data.origin !== 'update') {
          setContent(value)
          updateContent(value)
          type(data)
        }
      }}
    />
  )
}

export default CodeEditor
