import moment from 'moment'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

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

export const validateDateOfBirth = (
  dob: Date | null | undefined,
  required = true,
): ValidationResult => {
  if (!dob) {
    if (required) return { isValid: false, error: 'Дата рождения обязательна' }
    else return { isValid: true }
  }

  const parsedDate = moment(dob)
  const minDate = moment('1900-01-01')
  if (parsedDate.isBefore(minDate)) {
    return {
      isValid: false,
      error: 'Дата рождения не может быть раньше 1900 года',
    }
  }

  const now = moment()
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

export const validatePhone = (
  phone: string | undefined,
  required = true,
): ValidationResult => {
  if (!phone || phone.trim() === '') {
    if (required) return { isValid: false, error: 'Телефон обязателен' }
    else return { isValid: true }
  }

  // Проверяем, что строка соответствует формату +7(000) 000-00-00
  const formatRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  if (!formatRegex.test(phone)) {
    return {
      isValid: false,
      error: 'Номер телефона должен быть полностью заполнен',
    }
  }

  return { isValid: true }
}

export const validateDate = (
  dob: Date | null | undefined,
  required = false,
): ValidationResult => {
  if (!dob) {
    if (required) return { isValid: false, error: 'Дата обязательна' }
    else return { isValid: true }
  }

  const parsedDate = moment(dob)

  const now = moment()
  if (parsedDate.isBefore(now)) {
    return { isValid: false, error: 'Дата не может быть в прошлом' }
  }

  return { isValid: true }
}

export const validateTime = (
  time: string | null | undefined,
  required = false,
): ValidationResult => {
  if (!time) {
    if (required) return { isValid: false, error: 'Время обязательно' }
    else return { isValid: true }
  }

  if (time.length === 5) {
    const [hh, mm] = time.split(':')

    if (+hh > 23) {
      return { isValid: false, error: 'Часы должны быть от 00 до 23' }
    }
    if (+mm > 59) {
      return { isValid: false, error: 'Минуты должны быть от 00 до 59' }
    }
  } else {
    return { isValid: false, error: 'Ожидается формат ЧЧ:ММ' }
  }

  return { isValid: true }
}
