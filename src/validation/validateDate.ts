import moment from 'moment'
import { ValidationResult } from './validationResult'

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
