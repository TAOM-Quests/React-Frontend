import React from 'react'
import './Modal.scss'
import { Icon } from '../Icon/Icon'

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal--container" onClick={e => e.stopPropagation()}>
        <div className="modal--header">
          <h2 className="heading_5 modal--title">{title}</h2>
          <Icon icon="CROSS" onClick={onClose} />
        </div>
        <div className="modal--body">{children}</div>
      </div>
    </div>
  )
}
