import { forwardRef, MouseEventHandler, ReactNode, Ref } from 'react'
import classNames from 'classnames'
import './ContainerBox.scss'

interface ContainerBoxProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

type RefType = HTMLDivElement

export const ContainerBox = forwardRef<RefType, ContainerBoxProps>(
  ({ onClick, children, className }, ref: Ref<RefType>) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={classNames('container-box', className)}
      >
        {children}
      </div>
    )
  },
)
