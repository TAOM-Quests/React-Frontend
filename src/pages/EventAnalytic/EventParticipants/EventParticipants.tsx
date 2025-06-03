import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import { UserAvatarInfo } from '../../../components/User/UserAvatarInfo/UserAvatarInfo'
import { UserProfile } from '../../../models/userProfile'
import { EventAnalyticElementProps } from '../eventAnalyticElementProps'
import './EventParticipants.scss'

const columns: TableColumn<UserProfile>[] = [
  {
    key: 'lastName',
    title: 'Участник',
    cellRender: row => (
      <UserAvatarInfo
        text={`${row.lastName} ${row.firstName} ${row.patronymic}`}
        avatarSrc={row.image.url || ''}
        size="small"
      />
    ),
  },
  {
    key: 'email',
    title: 'Почта',
  },
  {
    key: 'phoneNumber',
    title: 'Телефон',
  },
  {
    key: 'sex',
    title: 'Пол',
  },
  {
    key: 'birthDate',
    disableFilter: true,
    title: 'Дата рождения',
    cellRender: row =>
      row.birthDate ? new Date(row.birthDate).toLocaleDateString() : '',
  },
]

export const EventParticipants = (analyticData: EventAnalyticElementProps) => {
  return (
    <div className="container_min_width event-participants">
      <TableEdit<UserProfile>
        columns={columns}
        initialRows={analyticData.participants}
        isEditing={false}
      />
    </div>
  )
}
