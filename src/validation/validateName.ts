import { ValidationResult } from './validationResult'

export const validateName = (
  name: string | undefined,
  required = true,
): ValidationResult => {
  if (!name || name.trim() === '') {
    if (required)
      return { isValid: false, error: 'Поле обязательно для заполнения' }
    else return { isValid: true }
  }
  const trimmed = name.trim()
  if (trimmed.length < 2 || trimmed.length > 50)
    return { isValid: false, error: 'Длина должна быть от 2 до 50 символов' }
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/u
  if (!regex.test(trimmed))
    return { isValid: false, error: 'Только буквы, пробелы и дефисы разрешены' }
  return { isValid: true }
}
