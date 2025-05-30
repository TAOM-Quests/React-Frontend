import { Button } from '../../UI/Button/Button'

interface TableEditHeaderProps {
  isEdit: boolean
  onEditButtonClick: () => void
  title?: string
  disabled?: boolean
}

export const TableEditHeader = ({
  title,
  isEdit,
  onEditButtonClick,
  disabled,
}: TableEditHeaderProps) => (
  <div className="table-edit__header">
    <h6 className="heading_6">{title}</h6>
    <Button
      text={isEdit ? 'Сохранить изменения' : 'Редактировать'}
      onClick={onEditButtonClick}
      iconBefore={isEdit ? 'CHECK' : 'EDIT'}
      disabled={disabled}
    />
  </div>
)
