import { useState, useEffect } from 'react'
import { Modal } from '../../../../../components/UI/Modal/Modal'
import { Input } from '../../../../../components/UI/Input/Input'
import { users } from '../../../../../services/api/userModule/users/users'
import './ChangePasswordModal.scss'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void // Callback при успешной смене пароля если нужен
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (!isOpen) {
      // Сброс полей и ошибок при закрытии
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setErrors({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  }, [isOpen])

  const validate = () => {
    const newErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
    let valid = true

    if (!oldPassword) {
      newErrors.oldPassword = 'Введите текущий пароль'
      valid = false
    }
    if (!newPassword) {
      newErrors.newPassword = 'Введите новый пароль'
      valid = false
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Пароль должен быть не менее 6 символов'
      valid = false
    }
    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      await users.changePassword({
        oldPassword,
        newPassword,
      })

      onSuccess?.()
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Сменить пароль"
      onSave={handleSubmit}
      isShowFooter
      className="change-password-modal"
    >
      <Input
        type={showPassword ? 'text' : 'password'}
        label="Текущий пароль"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        errorText={errors.oldPassword}
        iconAfter={showPassword ? 'EYE_CLOSED' : 'EYE'}
        onClickIconAfter={toggleShowPassword}
        placeholder="Введите текущий пароль"
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        label="Новый пароль"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        errorText={errors.newPassword}
        iconAfter={showPassword ? 'EYE_CLOSED' : 'EYE'}
        onClickIconAfter={toggleShowPassword}
        placeholder="Введите новый пароль"
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        label="Подтвердите новый пароль"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        errorText={errors.confirmPassword}
        iconAfter={showPassword ? 'EYE_CLOSED' : 'EYE'}
        onClickIconAfter={toggleShowPassword}
        placeholder="Подтвердите новый пароль"
      />
    </Modal>
  )
}
