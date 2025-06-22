import { Modal } from '../UI/Modal/Modal'
import './CustomAlert.scss'

interface CustomAlertProps {
  title: string
  isOpen: boolean
  message: string
  onClose: () => void
}

export const CustomAlert = ({
  title,
  message,
  isOpen,
  onClose,
}: CustomAlertProps) => {
  return (
    <Modal
      className="customAlert"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      <p>{message}</p>
    </Modal>
  )
}
