import { ValidationResult } from './validationResult'

type RolePositionDepartment = {
  roleId?: number | null
  positionId?: number | null
  departmentId?: number | null
}

export const validateRolePositionDepartment = (
  data: RolePositionDepartment,
): ValidationResult => {
  const { roleId, positionId, departmentId } = data

  const anyFilled = !!roleId || !!positionId || !!departmentId
  const allFilled = !!roleId && !!positionId && !!departmentId

  if (anyFilled && !allFilled) {
    return {
      isValid: false,
      error:
        'Если заполнено одно из полей "Роль", "Кафедра" или "Должность", необходимо заполнить все три',
    }
  }

  return { isValid: true }
}
