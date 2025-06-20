import { useRef } from 'react'
import {
  TableColumn,
  TableEditRef,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import { UserAvatarInfo } from '../../../components/User/UserAvatarInfo/UserAvatarInfo'
import { UserProfile } from '../../../models/userProfile'
import { CreateExcelColumns } from '../../../services/api/commonModule/serverFiles/dto/createExcelDto'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { QuestAnalyticElementProps } from '../questAnalyticElementProps'
import { Button } from '../../../components/UI/Button/Button'

const tableColumns: TableColumn<UserProfile>[] = [
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

const excelColumns: CreateExcelColumns<UserProfile>[] = [
  {
    key: 'lastName',
    header: 'Участник',
    format: 'string',
    width: 30,
  },
  {
    key: 'email',
    header: 'Почта',
    format: 'string',
    width: 30,
  },
  {
    key: 'phoneNumber',
    header: 'Телефон',
    format: 'string',
    width: 30,
  },
  {
    key: 'sex',
    header: 'Пол',
    format: 'string',
    width: 30,
  },
  {
    key: 'birthDate',
    header: 'Дата рождения',
    format: 'date',
    width: 30,
  },
]

export const QuestParticipants = (analyticData: QuestAnalyticElementProps) => {
  const table = useRef<TableEditRef<UserProfile>>(null)

  const createExcel = async () => {
    const rows = table.current?.getRows()

    const { url } = await serverFiles.createExcel({
      data: rows || [],
      fileName: 'participants',
      columns: excelColumns,
    })

    window.open(url, '_blank')
  }

  return (
    <div className="container_min_width quest-participants">
      <div className="quest-participants__header">
        <Button text="Скачать Excel" iconBefore="EXCEL" onClick={createExcel} />
      </div>

      <TableEdit<UserProfile>
        ref={table}
        columns={tableColumns}
        initialRows={analyticData.participants}
        isEditing={false}
      />
    </div>
  )
}
