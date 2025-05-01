import { ValidationResult } from './validationResult'

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
