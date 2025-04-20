import moment from 'moment'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateName(
  name: string | undefined,
  required = true,
): ValidationResult {
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

export function validateDateOfBirth(
  dob: Date | null | undefined,
  required = true,
): ValidationResult {
  if (!dob) {
    if (required) return { isValid: false, error: 'Дата рождения обязательна' }
    else return { isValid: true }
  }

  const parsedDate = moment.utc(dob)
  const minDate = moment.utc('1900-01-01')
  if (parsedDate.isBefore(minDate)) {
    return {
      isValid: false,
      error: 'Дата рождения не может быть раньше 1900 года',
    }
  }

  const now = moment.utc()
  if (parsedDate.isAfter(now)) {
    return { isValid: false, error: 'Дата рождения не может быть в будущем' }
  }
  const minAge = 8
  const age = now.diff(parsedDate, 'years')
  if (age < minAge) {
    return {
      isValid: false,
      error: `Возраст должен быть не менее ${minAge} лет`,
    }
  }

  return { isValid: true }
}
export function validatePhone(
  phoneNumber: string | undefined,
  required = true,
): ValidationResult {
  if (!phoneNumber || phoneNumber.trim() === '') {
    if (required) return { isValid: false, error: 'Телефон обязателен' }
    else return { isValid: true }
  }
  const digitsOnly = phoneNumber.replace(/[^\d+]/g, '') // оставляем только цифры и +
  const regex = /^\+?\d{10,15}$/
  if (!regex.test(digitsOnly))
    return {
      isValid: false,
      error: 'Телефон должен содержать от 10 до 15 цифр и начинаться с +',
    }
  return { isValid: true }
}

export function validateEmail(
  email: string | undefined,
  required = true,
): ValidationResult {
  if (!email || email.trim() === '') {
    if (required) return { isValid: false, error: 'Почта обязательна' }
    else return { isValid: true }
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  if (!regex.test(email))
    return { isValid: false, error: 'Неверный формат почты' }
  return { isValid: true }
}
