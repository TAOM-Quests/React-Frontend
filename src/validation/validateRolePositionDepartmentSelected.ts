type RolePositionDepartmentSelected = {
  roleSelected: any[] | undefined
  positionSelected: any[] | undefined
  departmentSelected: any[] | undefined
}

export const validateRolePositionDepartmentSelected = (
  data: RolePositionDepartmentSelected,
): { isValid: boolean; error?: string } => {
  const { roleSelected, positionSelected, departmentSelected } = data

  const roleLen = roleSelected?.length ?? 0
  const positionLen = positionSelected?.length ?? 0
  const departmentLen = departmentSelected?.length ?? 0

  const allEmpty = roleLen === 0 && positionLen === 0 && departmentLen === 0
  const allFilled = roleLen > 0 && positionLen > 0 && departmentLen > 0

  if (allEmpty) {
    return { isValid: true }
  }
  if (!allFilled) {
    return {
      isValid: false,
      error:
        'Если заполнено одно из полей "Роль", "Кафедра" или "Должность", необходимо заполнить все три',
    }
  }
  return { isValid: true }
}
