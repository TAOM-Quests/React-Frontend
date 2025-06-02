import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import { Avatar } from '../../../components/UI/Avatar/Avatar'
import { UserProfile } from '../../../models/userProfile'
import { EventAnalyticElementProps } from '../eventAnalyticElementProps'

const columns: TableColumn<UserProfile>[] = [
  {
    key: 'image',
    title: 'Участник',
    cellRender: (row, onChange, isDisabled) => (
      <Avatar src={row.image.url} size="small" />
    ),
  },
]

export const EventParticipants = (analyticData: EventAnalyticElementProps) => {
  return (
    <div className="container_min_width event-participants">
      <TableEdit<UserProfile>
        columns={columns}
        initialRows={analyticData.participants}
      />
    </div>
  )
}
