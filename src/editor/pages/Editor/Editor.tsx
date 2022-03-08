import React from 'react'
import { Link } from 'react-router-dom'

import { LocationState } from '../../../common/schemas'

export function Editor(): JSX.Element {
  return (
    <div>
      <Link
        to="/workspace/73ac0aac-9d21-4163-9951-837627ebd461/wait"
        state={{ isWorkspacePending: true } as LocationState}
        replace
      >
        wait
      </Link>
    </div>
  )
}

export default Editor
