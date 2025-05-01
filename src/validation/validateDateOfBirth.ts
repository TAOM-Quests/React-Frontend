import moment from 'moment'
import { ValidationResult } from './validationResult'

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
