/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { Editor as EditorType } from 'codemirror'

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
// import 'codemirror/addon/selection/selection-pointer.js'

// use replace for updating and deleting content
// get cursor coords and send to the other teammates
export function CodeEditor() {
  const { colorMode } = useColorMode()
  const [instance, setInstance] = useState<EditorType | null>(null)
  return (
    <Editor
      theme={colorMode}
      editorDidMount={(editor) => setInstance(editor)}
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
      onCursor={(editor, data) => {
        //
      }}
      onChange={(editor, data, value) => {
        console.log(data)
      }}
    />
  )
}

export default CodeEditor
