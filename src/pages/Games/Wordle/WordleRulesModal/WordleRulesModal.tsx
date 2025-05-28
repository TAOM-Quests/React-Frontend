import { ReactNode, useEffect } from 'react'
import './Modal.scss'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'

interface WordleRulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WordleRulesModal = ({
  isOpen,
  onClose,
}: WordleRulesModalProps) => {
  return (
    <div
      className={`modal ${isOpen ? 'modal--open' : ''}`}
      onClick={onClose}
    ></div>
  )
}
