import { Department } from '../../../models/department'
import { TableEdit } from '../../../components/Table/TableEdit/TableEdit'
import { useCallback, useEffect, useState } from 'react'
import { commonEntities } from '../../../services/api/commonModule/commonEntities/commonEntities'
import './AdminTab.scss'
import { UserRole } from '../../../models/userRole'
import { UserPosition } from '../../../models/userPoistion'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useNavigate } from 'react-router'
import { Loading } from '../../../components/Loading/Loading'
import { UserProfile } from '../../../models/userProfile'
import { users as usersApi } from '../../../services/api/userModule/users/users'
import { validateName } from '../../../validation/validateName'
import { validateDateOfBirth } from '../../../validation/validateDateOfBirth'
import { validateEmail } from '../../../validation/validateEmail'
import { validatePhone } from '../../../validation/validatePhone'
import { validateRolePositionDepartmentSelected } from '../../../validation/validateRolePositionDepartmentSelected'
import { getAdminTableColumns } from './getAdminTableColumns'

export default function AdminTab() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [editedUsers, setEditedUsers] = useState<Record<number, UserProfile>>(
    {},
  )
  const [roles, setRoles] = useState<UserRole[]>([])
  const [positions, setPositions] = useState<UserPosition[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useState<
    Record<number, Record<string, string>>
  >({})

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/')
    }

    const fetchFilterData = async () => {
      try {
        setIsLoading(true)
        setUsers(
          await Promise.all(
            (await usersApi.getUsers({})).map(user =>
              usersApi.getProfile({ id: user.id }),
            ),
          ),
        )
        setRoles(await usersApi.getRoles())
        setPositions(await usersApi.getPositions())
        setDepartments(await commonEntities.getDepartments())
        setIsLoading(false)
      } catch (e) {
        console.log(`[AdminTab] ${e}`)
      }
    }

    fetchFilterData()
  }, [])

  const updateUserProfile = async (user: UserProfile) => {
    setIsLoading(true)
    try {
      const updatedFields = await usersApi.updateProfile({
        id: user.id,
        sex: user.sex,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        patronymic: user.patronymic,
        phoneNumber: user.phoneNumber,
        roleId: user.role?.id ?? null,
        positionId: user.position?.id ?? null,
        departmentId: user.department?.id ?? null,
        birthDate:
          user.birthDate instanceof Date
            ? user.birthDate.toISOString()
            : user.birthDate,
      })

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id
            ? {
                ...u,
                ...updatedFields,
                birthDate: updatedFields.birthDate
                  ? new Date(updatedFields.birthDate)
                  : null,
              }
            : u,
        ),
      )

      setEditedUsers(prev => {
        const newEdited = { ...prev }
        delete newEdited[user.id]
        return newEdited
      })
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasValidationErrors = Object.values(validationErrors).some(rowErrors =>
    Object.values(rowErrors).some(error => !!error),
  )

  const handleSaveChanges = async () => {
    if (Object.keys(editedUsers).length === 0) return

    if (hasValidationErrors) {
      return
    }

    setIsLoading(true)
    try {
      for (const user of Object.values(editedUsers)) {
        await updateUserProfile(user)
      }
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateField = (key: keyof UserProfile, value: any) => {
    switch (key) {
      case 'lastName':
      case 'firstName':
      case 'patronymic':
        return validateName(value, false).error ?? ''
      case 'birthDate':
        return validateDateOfBirth(value, false).error ?? ''
      case 'email':
        return validateEmail(value, false).error ?? ''
      case 'phoneNumber':
        return validatePhone(value, false).error ?? ''
      default:
        return ''
    }
  }

  const handleRowChange = useCallback(
    (rowId: number, key: keyof UserProfile, value: any) => {
      setUsers(prevUsers => {
        const newUsers = prevUsers.map(u =>
          u.id === rowId ? { ...u, [key]: value } : u,
        )
        const updatedUser = newUsers.find(u => u.id === rowId)!

        const error = validateField(key, value)

        const relatedValidation = validateRolePositionDepartmentSelected({
          roleSelected: updatedUser.role ? [updatedUser.role] : [],
          positionSelected: updatedUser.position ? [updatedUser.position] : [],
          departmentSelected: updatedUser.department
            ? [updatedUser.department]
            : [],
        })

        setEditedUsers(prev => ({ ...prev, [rowId]: updatedUser }))
        setValidationErrors(prev => ({
          ...prev,
          [rowId]: {
            ...(prev[rowId] || {}),
            [key]: error,
            role: relatedValidation.isValid
              ? ''
              : (relatedValidation.error ?? ''),
            position: relatedValidation.isValid
              ? ''
              : (relatedValidation.error ?? ''),
            department: relatedValidation.isValid
              ? ''
              : (relatedValidation.error ?? ''),
          },
        }))

        return newUsers
      })
    },
    [setUsers, setEditedUsers, setValidationErrors],
  )

  const columns = getAdminTableColumns({
    roles,
    positions,
    departments,
    validationErrors,
  })

  return (
    <>
      {!isLoading ? (
        <>
          <div className="adminTab">
            <TableEdit<UserProfile>
              columns={columns}
              initialRows={users}
              onCellChange={handleRowChange}
              onSaveChanges={handleSaveChanges}
              hasValidationErrors={hasValidationErrors}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
