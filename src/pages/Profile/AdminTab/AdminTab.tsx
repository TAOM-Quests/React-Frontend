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

const isAdmin = true

interface GetUsers {
  id: number
  imageUrl: string
  lastName?: string
  firstName?: string
  patronymic?: string
  roleId?: number | null
  departmentId?: number
  positionId?: number
  email: string
  phoneNumber?: string
  // telegram?: string
  sex?: string
  birthDate?: Date
}
const roles = [
  {
    id: 1,
    name: 'Администратор',
  },
  {
    id: 2,
    name: 'Модератор',
  },
  {
    id: 3,
    name: 'Пользователь',
  },
]

const positions = [
  {
    id: 1,
    name: 'Администратор',
  },
  {
    id: 2,
    name: 'Модератор',
  },
  {
    id: 3,
    name: 'Пользователь',
  },
]

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

const addRowTemplate = {
  imageUrl: '',
  lastName: '',
  firstName: '',
  patronymic: '',
  roleId: undefined,
  departmentId: undefined,
  positionId: undefined,
  email: '',
  phoneNumber: '',
  sex: '',
  birthDate: undefined,
}

export default function AdminTab() {
  const [users, setUsers] = useState<GetUsers[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setIsLoading(true)

        const usersDepartments = await commonEntities.getDepartments()

        setDepartments(usersDepartments)
        setIsLoading(false)
      } catch (e) {
        console.log(`[CalendarFilter] ${e}`)
      }
    }

    fetchFilterData()
  }, [])

  const usersData: GetUsers[] = [
    {
      id: 1,
      firstName: 'Петр',
      email: 'p@p.ru',
      lastName: 'Петров',
      patronymic: 'Петрович',
      phoneNumber: '+7 (000) 000-00-00',
      birthDate: new Date('08.07.2003'),
      sex: 'Мужской',
      departmentId: 1,
      positionId: 1,
      roleId: null,
      imageUrl:
        'http://localhost:3000/api/v1/commonModule/file?fileName=Default_avatar.png',
    },
    {
      id: 2,
      firstName: 'Иван',
      email: 'и@a.ru',
      lastName: 'Иванов',
      patronymic: 'Иванович',
      phoneNumber: '+7 (898) 888-88-88',
      birthDate: new Date('07-08-2003'),
      sex: 'Мужской',
      departmentId: 1,
      positionId: 1,
      roleId: null,
      imageUrl:
        'http://localhost:3000/api/v1/commonModule/file?fileName=Default_avatar.png',
    },
  ]

  const columns: TableColumn<GetUsers>[] = [
    {
      key: 'imageUrl',
      title: '',
      disableFilter: true,
      render: (row, onChange, isDisabled) => (
        <Avatar src={row.imageUrl} size="small" />
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
      key: 'roleId',
      title: 'Роль',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={roles
            .filter(role => role.id === row.roleId)
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
      key: 'departmentId',
      title: 'Кафедра',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={departments
            .filter(department => department.id === row.departmentId)
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
      key: 'positionId',
      title: 'Должность',
      render: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={positions
            .filter(position => position.id === row.positionId)
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
    isAdmin && (
      <div className="adminTab">
        {departments.length > 0 && (
          <TableEdit<GetUsers>
            columns={columns}
            initialRows={usersData}
            addRowTemplate={addRowTemplate}
          />
        )}
      </div>
    )
  )
}
