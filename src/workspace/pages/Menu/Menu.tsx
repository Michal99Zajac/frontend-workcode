import React from 'react'
import { Link } from 'react-router-dom'

import { LocationStateType } from '../../../common/schemas'

export function Menu(): JSX.Element {
  return (
    <div>
      <Link
        to="/workspace/wait/73ac0aac-9d21-4163-9951-837627ebd461"
        state={{ isWorkspacePending: true } as LocationStateType}
        replace
      >
        wait
      </Link>
    </div>
  )
}

export default Menu
