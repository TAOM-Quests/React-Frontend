import { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import './ContainerBox.scss'

interface ContainerBoxProps {
  children: ReactNode
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

export const ContainerBox = ({
  style,
  onClick,
  children,
  className,
}: ContainerBoxProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={classNames('container-box', className)}
    >
      {children}
    </div>
  )
}
