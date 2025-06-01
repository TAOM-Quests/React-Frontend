import { Button } from '../../UI/Button/Button'

interface TableEditFooterProps {
  onDelete: () => void
  totalCount: number
  selectedCount: number
}

export const TableEditFooter = ({
  onDelete,
  totalCount,
  selectedCount,
}: TableEditFooterProps) => (
  <div className="table-edit__footer">
    <span className="body_s_m table-edit__footer-text">
      Выбрано {selectedCount} {selectedCount === 1 ? 'строка' : 'строк'} из{' '}
      {totalCount}
    </span>
    <Button
      iconBefore="DELETE"
      text="Удалить"
      size="small"
      colorType="secondary"
      className="table-edit__footer-delete-button"
      onClick={onDelete}
      type="button"
    />
  </div>
)
