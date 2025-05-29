import { Department } from '../../../models/department'
import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import Input from '../../../components/UI/Input/Input'
import { useEffect, useState } from 'react'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { commonEntities } from '../../../services/api/commonModule/commonEntities/commonEntities'
import { Avatar } from '../../../components/UI/Avatar/Avatar'
import { MaskedInput } from '../../../components/MaskedInput/MaskedInput'
import { DateInput } from '../../../components/UI/DateInput/DateInput'
import './AdminTab.scss'
import { UserRole } from '../../../models/userRole'
import { UserPosition } from '../../../models/userPoistion'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useNavigate } from 'react-router'
import { Loading } from '../../../components/Loading/Loading'
import { UserProfile } from '../../../models/userProfile'
import { users as usersApi } from '../../../services/api/userModule/users/users'

const sex = [
  {
    id: 1,
    name: 'Мужской',
  },
  {
    id: 2,
    name: 'Женский',
  },
]

export default function AdminTab() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [roles, setRoles] = useState<UserRole[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [positions, setPositions] = useState<UserPosition[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

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

  const columns: TableColumn<UserProfile>[] = [
    {
      key: 'image',
      title: '',
      disableFilter: true,
      render: (row, onChange, isDisabled) => (
        <Avatar src={row.image.url} size="small" />
      ),
    },
    {
      key: 'lastName',
      title: 'Фамилия',
      render: (row, onChange, isDisabled) => (
        <Input
          value={row.lastName}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Фамилия"
        />
      ),
    },
    {
      key: 'firstName',
      title: 'Имя',
      render: (row, onChange, isDisabled) => (
        <Input
          value={row.firstName}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Имя"
        />
      ),
    },
    {
      key: 'patronymic',
      title: 'Отчество',
      render: (row, onChange, isDisabled) => (
        <Input
          value={row.patronymic}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Отчество"
        />
      ),
    },
    {
      key: 'role',
      title: 'Роль',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={roles
            .filter(role => role.id === row.role?.id)
            .map(role => ({ id: role.id, text: role.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem.id)
            } else {
              onChange(undefined)
            }
          }}
          disabled={isDisabled}
          placeholder="Роль"
          items={roles.map(role => ({ id: role.id, text: role.name }))}
        />
      ),
    },
    {
      key: 'department',
      title: 'Кафедра',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={departments
            .filter(department => department.id === row.department?.id)
            .map(department => ({ id: department.id, text: department.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem.id)
            } else {
              onChange(undefined)
            }
          }}
          disabled={isDisabled}
          placeholder="Кафедра"
          items={departments.map(department => ({
            id: department.id,
            text: department.name,
          }))}
        />
      ),
    },
    {
      key: 'position',
      title: 'Должность',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={positions
            .filter(position => position.id === row.position?.id)
            .map(position => ({ id: position.id, text: position.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem.id)
            } else {
              onChange(undefined)
            }
          }}
          disabled={isDisabled}
          placeholder="Должность"
          items={positions.map(position => ({
            id: position.id,
            text: position.name,
          }))}
        />
      ),
    },
    {
      key: 'email',
      title: 'Почта',
      render: (row, onChange, isDisabled) => (
        <Input
          value={row.email}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Почта"
        />
      ),
    },
    {
      key: 'phoneNumber',
      title: 'Телефон',
      render: (row, onChange, isDisabled) => (
        <MaskedInput
          mask="+7 (999) 999-99-99"
          value={row.phoneNumber ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          disabled={isDisabled}
        />
      ),
    },
    {
      key: 'sex',
      title: 'Пол',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={sex
            .filter(s => s.name === row.sex)
            .map(s => ({ id: s.id, text: s.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem.text)
            } else {
              onChange(undefined)
            }
          }}
          disabled={isDisabled}
          placeholder="Пол"
          items={sex.map(s => ({
            id: s.id,
            text: s.name,
          }))}
        />
      ),
    },
    {
      key: 'birthDate',
      title: 'Дата рождения',
      disableFilter: true,
      render: (row, onChange, isDisabled) => (
        <DateInput
          placeholder="Дата рождения"
          value={row.birthDate}
          disabled={isDisabled}
          onChange={e => onChange(e.target.value)}
          onDateSelect={date => onChange(date)}
        />
      ),
    },
  ]

  return (
    <>
      {!isLoading ? (
        <div className="adminTab">
          {departments.length > 0 && (
            <TableEdit<UserProfile> columns={columns} initialRows={users} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
