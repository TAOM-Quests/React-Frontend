import { Button } from '../../UI/Button/Button'

interface TableEditHeaderProps {
  isEdit: boolean
  toggleEdit: () => void
  title?: string
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
