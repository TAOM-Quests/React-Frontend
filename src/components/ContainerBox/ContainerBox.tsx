import { ReactNode } from 'react'
import './ContainerBox.scss'
import classNames from 'classnames'

interface ContainerBoxProps {
  children: ReactNode
  className?: string
}

export const ContainerBox = ({ children, className }: ContainerBoxProps) => {
  return (
    <div className={classNames('container-box', className)}>{children}</div>
  )
}
