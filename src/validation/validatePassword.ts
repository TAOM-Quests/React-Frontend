import { ValidationResult } from './validationResult'

export const validatePassword = (
  password: string | undefined,
  required = true,
): ValidationResult => {
  if (!password || password.trim() === '') {
    if (required) return { isValid: false, error: 'Пароль обязателен' }
    else return { isValid: true }
  }

  if (password.length < 6)
    return { isValid: false, error: 'Минимальная длина пароля 6 символов' }

  if (password.length > 32)
    return { isValid: false, error: 'Максимальная длина пароля 32 символа' }

  // Проверка на наличие хотя бы одной заглавной буквы
  if (!/[A-ZА-ЯЁ]/.test(password))
    return {
      isValid: false,
      error: 'Пароль должен содержать хотя бы одну заглавную букву',
    }

  // Проверка на наличие хотя бы одной строчной буквы
  if (!/[a-zа-яё]/.test(password))
    return {
      isValid: false,
      error: 'Пароль должен содержать хотя бы одну строчную букву',
    }

  // Проверка на наличие хотя бы одной цифры
  if (!/\d/.test(password))
    return {
      isValid: false,
      error: 'Пароль должен содержать хотя бы одну цифру',
    }

  // Проверка на наличие хотя бы одного спецсимвола
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    return {
      isValid: false,
      error: 'Пароль должен содержать хотя бы один специальный символ',
    }

  return { isValid: true }
}
