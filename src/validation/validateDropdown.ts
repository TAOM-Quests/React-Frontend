import { ValidationResult } from './validationResult'

export const validateDropdown = (
  selectedIds: number | number[] | null | undefined,
  required = true,
): ValidationResult => {
  if (!required) {
    return { isValid: true }
  }
  if (selectedIds == null) {
    return {
      isValid: false,
      error: 'Выбор обязателен',
    }
  }
  if (Array.isArray(selectedIds)) {
    if (selectedIds.length === 0) {
      return {
        isValid: false,
        error: 'Выбор обязателен',
      }
    }
  }
  return { isValid: true }
}
