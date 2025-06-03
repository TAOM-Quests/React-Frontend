import { ValidationResult } from './validationResult'

export const validatePhone = (
  phone: string | undefined,
  required = true,
): ValidationResult => {
  if (!phone || phone.trim() === '') {
    if (required) return { isValid: false, error: 'Телефон обязателен' }
    else return { isValid: true }
  }

  const formatRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  if (!formatRegex.test(phone)) {
    return {
      isValid: false,
      error: 'Номер телефона должен быть полностью заполнен',
    }
  }

  return { isValid: true }
}
