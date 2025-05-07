import {
  forwardRef,
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import classNames from 'classnames'
import './ContainerBox.scss'

interface ContainerBoxProps {
  children: ReactNode
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

type RefType = HTMLDivElement

export const ContainerBox = forwardRef<RefType, ContainerBoxProps>(
  ({ style, onClick, children, className }, ref: Ref<RefType>) => {
    return (
      <div
        ref={ref}
        style={style}
        onClick={onClick}
        className={classNames('container-box', className)}
      >
        {children}
      </div>
    )
  },
)
