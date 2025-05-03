import { MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import './ContainerBox.scss'

interface ContainerBoxProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

export const ContainerBox = ({
  onClick,
  children,
  className,
}: ContainerBoxProps) => {
  return (
    <div onClick={onClick} className={classNames('container-box', className)}>
      {children}
    </div>
  )
}
