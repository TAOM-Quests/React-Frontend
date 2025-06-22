import { useState, useEffect } from 'react'
import { Modal } from '../../../../../components/UI/Modal/Modal'
import { Input } from '../../../../../components/UI/Input/Input'
import { users } from '../../../../../services/api/userModule/users/users'
import './ChangePasswordModal.scss'
import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { useNavigate } from 'react-router'
import { validatePassword } from '../../../../../validation/validatePassword'
import { validateRepeatPassword } from '../../../../../validation/validateRepeatPassword'

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

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)
  const passwordValidator = validatePassword(newPassword)
  const repeatPasswordValidator = validateRepeatPassword(
    newPassword,
    confirmPassword,
  )

  if (!user) {
    navigate('/login')
    return
  }

  useEffect(() => {
    if (!isOpen) {
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

  const validate = async () => {
    const newErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
    let valid = true

    if (!oldPassword) {
      newErrors.oldPassword = 'Введите текущий пароль'
      valid = false
    } else {
      try {
        await users.auth({ email: user.email, password: oldPassword })
      } catch (e) {
        newErrors.oldPassword = 'Неверный текущий пароль'
        valid = false
      }
    }

    if (!newPassword) {
      newErrors.newPassword = 'Введите новый пароль'
      valid = false
    } else if (!passwordValidator.isValid) {
      newErrors.newPassword = passwordValidator.error ?? ''
      valid = false
    }

    if (!repeatPasswordValidator.isValid) {
      newErrors.confirmPassword = repeatPasswordValidator.error ?? ''
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async () => {
    const isValid = await validate()
    if (!isValid) return

    try {
      if (!user) throw Error('User not found')

      await users.updateProfile({
        id: user.id,
        password: newPassword,
      })

      onSuccess?.()
      onClose()
    } catch (e) {
      console.log(`[ChangePasswordModal] ${e}`)
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
