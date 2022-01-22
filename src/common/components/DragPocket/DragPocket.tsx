import Draggable, { DraggableBounds, ControlPosition } from 'react-draggable'
import clsx from 'clsx'

import classes from './DragPocket.module.scss'

interface DragPocketProps {
  bounds?: string | DraggableBounds
  defaultClassName?: string
  defaultClassNameDragging?: string
  defaultPosition?: ControlPosition
  children: React.ReactNode
}

export function DragPocket(props: DragPocketProps): JSX.Element {
  const {
    children,
    bounds,
    defaultPosition,
    defaultClassNameDragging,
    defaultClassName,
  } = props

  return (
    <Draggable
      bounds={bounds ? bounds : 'parent'}
      defaultClassName={clsx(defaultClassName || classes.grab)}
      defaultClassNameDragging={clsx(
        defaultClassNameDragging || classes.grabbing
      )}
      defaultPosition={defaultPosition}
    >
      {children}
    </Draggable>
  )
}

export default DragPocket
