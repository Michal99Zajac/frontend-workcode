import { useEffect, useState } from 'react'
import { produce } from 'immer'

import { useEditor, useEditorSocket, useWorkspace } from 'editor/hooks'
import { User } from 'common/schemas'
import { Cord } from 'types'
import { useCursorUpdate } from 'editor/connection'

interface UserCursor {
  cord: Cord
  user: User
  color: string
}

export const useUsersCursors = () => {
  const { editor } = useEditor()
  const { workspace } = useWorkspace()
  const { actives } = useEditorSocket()
  const [cursors, setCursors] = useState<UserCursor[]>([])

  useCursorUpdate(({ userId, cursor }) => {
    const color = actives.find((active) => active._id === userId)?.color
    const user = [...workspace.contributors, workspace.author].find(
      (user) => user._id === userId
    )
    const cords = editor?.cursorCoords(cursor)

    if (!color || !user || !cords) return

    setCursors(
      produce((draft) => {
        const index = draft.findIndex(
          (userCursor) => userCursor.user._id === userId
        )

        // new active user
        if (index < 0) {
          draft.push({
            cord: {
              top: cords.top,
              left: cords.left,
              bottom: cords.bottom,
            },
            color: color,
            user: user,
          })
        } else {
          draft[index] = {
            ...draft[index],
            cord: {
              top: cords.top,
              left: cords.left,
              bottom: cords.bottom,
            },
          }
        }
      })
    )
  })

  useEffect(() => {
    setCursors((cursors) =>
      cursors.filter((cursor) =>
        actives.map((active) => active._id).includes(cursor.user._id)
      )
    )
  }, [actives])

  return cursors
}

export default useUsersCursors
