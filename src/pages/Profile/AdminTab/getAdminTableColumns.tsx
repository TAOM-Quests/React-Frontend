import { MaskedInput } from '../../../components/MaskedInput/MaskedInput'
import { TableColumn } from '../../../components/Table/TableEdit/TableEdit'
import { Avatar } from '../../../components/UI/Avatar/Avatar'
import { DateInput } from '../../../components/UI/DateInput/DateInput'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import Input from '../../../components/UI/Input/Input'
import { UserProfile } from '../../../models/userProfile'

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

interface GetColumnsParams {
  roles: any[]
  positions: any[]
  departments: any[]
  validationErrors: Record<number, Record<string, string>>
}

export const getAdminTableColumns = ({
  roles,
  positions,
  departments,
  validationErrors,
}: GetColumnsParams): TableColumn<UserProfile>[] => {
  return [
    {
      key: 'image',
      title: '',
      disableFilter: true,
      cellRender: row => <Avatar src={row.image.url} size="small" />,
    },
    {
      key: 'lastName',
      title: 'Фамилия',
      cellRender: (row, onChange, isDisabled) => (
        <Input
          value={row.lastName}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Фамилия"
          errorText={validationErrors[row.id]?.lastName}
        />
      ),
    },
    {
      key: 'firstName',
      title: 'Имя',
      cellRender: (row, onChange, isDisabled) => (
        <Input
          value={row.firstName}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Имя"
          errorText={validationErrors[row.id]?.firstName}
        />
      ),
    },
    {
      key: 'patronymic',
      title: 'Отчество',
      cellRender: (row, onChange, isDisabled) => (
        <Input
          value={row.patronymic}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Отчество"
          errorText={validationErrors[row.id]?.patronymic}
        />
      ),
    },
    {
      key: 'role',
      title: 'Роль',
      cellRender: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={roles
            .filter(role => role.id === row.role?.id)
            .map(role => ({ id: role.id, text: role.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem)
            } else {
              onChange(null)
            }
          }}
          disabled={isDisabled}
          placeholder="Роль"
          items={roles.map(role => ({ id: role.id, text: role.name }))}
          errorText={validationErrors[row.id]?.role}
        />
      ),
    },
    {
      key: 'department',
      title: 'Кафедра',
      cellRender: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={departments
            .filter(department => department.id === row.department?.id)
            .map(department => ({ id: department.id, text: department.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem)
            } else {
              onChange(null)
            }
          }}
          disabled={isDisabled}
          placeholder="Кафедра"
          items={departments.map(department => ({
            id: department.id,
            text: department.name,
          }))}
          errorText={validationErrors[row.id]?.department}
        />
      ),
    },
    {
      key: 'position',
      title: 'Должность',
      cellRender: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={positions
            .filter(position => position.id === row.position?.id)
            .map(position => ({ id: position.id, text: position.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem)
            } else {
              onChange(null)
            }
          }}
          disabled={isDisabled}
          placeholder="Должность"
          items={positions.map(position => ({
            id: position.id,
            text: position.name,
          }))}
          errorText={validationErrors[row.id]?.position}
        />
      ),
    },
    {
      key: 'email',
      title: 'Почта',
      cellRender: (row, onChange, isDisabled) => (
        <Input
          value={row.email}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Почта"
          errorText={validationErrors[row.id]?.email}
        />
      ),
    },
    {
      key: 'phoneNumber',
      title: 'Телефон',
      cellRender: (row, onChange, isDisabled) => (
        <MaskedInput
          mask="+7 (999) 999-99-99"
          value={row.phoneNumber ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          disabled={isDisabled}
          errorText={validationErrors[row.id]?.phoneNumber}
        />
      ),
    },
    {
      key: 'sex',
      title: 'Пол',
      cellRender: (row, onChange, isDisabled) => (
        <Dropdown
          selectedItems={sex
            .filter(s => s.name === row.sex)
            .map(s => ({ id: s.id, text: s.name }))}
          onChangeDropdown={selectedItem => {
            if (selectedItem && !Array.isArray(selectedItem)) {
              onChange(selectedItem.text)
            } else {
              onChange(null)
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
      cellRender: (row, onChange, isDisabled) => (
        <DateInput
          placeholder="Дата рождения"
          value={row.birthDate}
          disabled={isDisabled}
          onChange={e => onChange(e.target.value)}
          onDateSelect={date => onChange(date)}
          errorText={validationErrors[row.id]?.birthDate}
        />
      ),
    },
  ]
}
