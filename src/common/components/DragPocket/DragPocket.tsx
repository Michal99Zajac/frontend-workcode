import Draggable, { DraggableBounds, ControlPosition } from 'react-draggable'
import clsx from 'clsx'

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
      defaultClassName={clsx(defaultClassName)}
      defaultClassNameDragging={clsx(defaultClassNameDragging)}
      defaultPosition={defaultPosition}
    >
      {children}
    </Draggable>
  )
}

export default DragPocket
