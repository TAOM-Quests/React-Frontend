import { ReactNode, useEffect } from 'react'
import './Modal.scss'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  onSave?: () => void
  isShowFooter?: boolean
  textButtonSave?: string
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  isShowFooter = false,
  textButtonSave = 'Сохранить',
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal--container" onClick={e => e.stopPropagation()}>
        <div className="modal--header">
          <h2 className="heading_5 modal--title">{title}</h2>
          <Icon icon="CROSS" onClick={onClose} />
        </div>
        <div className="modal--body">{children}</div>
        {isShowFooter && (
          <div className="modal--footer">
            <Button text="Отмена" colorType="secondary" onClick={onClose} />
            {onSave && <Button text={textButtonSave} onClick={onSave} />}
          </div>
        )}
      </div>
    </div>
  )
}
