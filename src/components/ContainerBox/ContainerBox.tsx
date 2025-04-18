import { ReactNode } from 'react'
import './ContainerBox.scss'

interface ContainerBoxProps {
  children: ReactNode
}

export const ContainerBox = ({ children }: ContainerBoxProps) => {
  return <div className="container-box">{children}</div>
}
