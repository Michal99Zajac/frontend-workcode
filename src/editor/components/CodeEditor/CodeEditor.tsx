import React, { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'
import _ from 'lodash'

import { Cursor } from 'editor/components'
import { useEditor, useWorkspace, useUsersCursors } from 'editor/hooks'
import {
  useType,
  useUpdate,
  useContentUpdate,
  useCursor,
} from 'editor/connection'
import { chooseMode } from 'editor/utils'

import { Editor } from './styled'

// styles
import 'codemirror/lib/codemirror.css'
// theme
import 'codemirror/theme/material.css'
// modes
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/mode/shell/shell'
// addons
import 'codemirror/addon/edit/closebrackets'

// use replace for updating and deleting content
// get cursor coords and send to the other teammates
export function CodeEditor() {
  const {
    content: initContent,
    workspace: { code },
  } = useWorkspace()
  const { colorMode } = useColorMode()
  const { setEditor, editor, setCursor } = useEditor()
  const type = useType()
  const cursorRefresh = _.debounce(useCursor(), 50)
  const updateContent = useContentUpdate()
  const cursors = useUsersCursors()

  useUpdate((change) => {
    editor?.replaceRange(change.text, change.from, change.to, 'update')
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (!editor) return

      cursorRefresh(editor.getCursor())
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {cursors.map((cursor) => (
        <Cursor
          key={cursor.user._id}
          color={cursor.color}
          cord={cursor.cord}
          user={cursor.user}
        />
      ))}
      <Editor
        theme={colorMode}
        editorDidMount={(editor) => setEditor(editor)}
        options={{
          mode: {
            name: chooseMode(code),
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
        value={initContent}
        onCursor={(editor, data) => {
          cursorRefresh(data)
          setCursor(data)
        }}
        onChange={(editor, data, value) => {
          if (data.origin && data.origin !== 'update') {
            updateContent(value)
            type(data)
          }
        }}
      />
    </>
  )
}

export default CodeEditor
