import { MouseEventHandler, ReactNode } from 'react'
import './ContainerBox.scss'
import classNames from 'classnames'

interface ContainerBoxProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ContainerBox = ({ children, className, onClick }: ContainerBoxProps) => {
  return (
    <div onClick={onClick} className={classNames('container-box', className)}>{children}</div>
  )
}
