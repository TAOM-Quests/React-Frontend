import { ValidationResult } from './validationResult'

export const validateEmail = (
  email: string | undefined,
  required = true,
): ValidationResult => {
  if (!email || email.trim() === '') {
    if (required) return { isValid: false, error: 'Почта обязательна' }
    else return { isValid: true }
  }

  if (!email.includes('@')) {
    return { isValid: false, error: 'Требуется символ @' }
  }

  const atIndex = email.indexOf('@')
  const dotIndex = email.indexOf('.', atIndex + 1)

  if (dotIndex === -1) {
    return { isValid: false, error: 'Требуется символ . после @' }
  }

  if (dotIndex - atIndex <= 1) {
    return { isValid: false, error: 'Между @ и . должны быть символы' }
  }

  // Можно добавить дополнительную проверку на пробелы и общую структуру
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  if (!regex.test(email)) {
    return { isValid: false, error: 'Неверный формат почты' }
  }

  return { isValid: true }
}
