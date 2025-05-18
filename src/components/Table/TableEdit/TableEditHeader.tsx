import { Button } from '../../UI/Button/Button'

interface TableEditHeaderProps {
  title: string
  isEdit: boolean
  toggleEdit: () => void
}

export const TableEditHeader = ({
  title,
  isEdit,
  toggleEdit,
}: TableEditHeaderProps) => (
  <div className="table-edit__header">
    <h6 className="heading_6">{title}</h6>
    <Button
      text={isEdit ? 'Сохранить изменения' : 'Редактировать'}
      onClick={toggleEdit}
      iconBefore={isEdit ? 'CHECK' : 'EDIT'}
    />
  </div>
)
