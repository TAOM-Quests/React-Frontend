import { ValidationResult } from './validationResult'

export const validateText = (
  name: string | undefined,
  required = true,
): ValidationResult => {
  if (!name || name.trim() === '') {
    if (required)
      return { isValid: false, error: 'Поле обязательно для заполнения' }
    else return { isValid: true }
  }
  return { isValid: true }
}
