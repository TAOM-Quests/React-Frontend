import { ValidationResult } from './validationResult'

export const validateRepeatPassword = (
  password: string,
  repeatPassword: string,
  required = true,
): ValidationResult => {
  if (!repeatPassword || repeatPassword.trim() === '') {
    if (required) return { isValid: false, error: 'Повтор пароля обязателен' }
    else return { isValid: true }
  }

  if (repeatPassword !== password) {
    return { isValid: false, error: 'Пароли не совпадают' }
  }
  return { isValid: true }
}
