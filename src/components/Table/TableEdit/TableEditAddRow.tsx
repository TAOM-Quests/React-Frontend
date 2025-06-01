import { Dispatch, forwardRef, Ref, SetStateAction } from 'react'
import { Icon } from '../../UI/Icon/Icon'
import { RenderFunction } from './TableEdit'

interface TableColumn<T> {
  key: keyof T
  render?: RenderFunction<T>
}

interface TableEditAddRowProps<T extends { id: number }> {
  columns: TableColumn<T>[]
  newRow: Omit<T, 'id'>
  setNewRow: Dispatch<SetStateAction<Omit<T, 'id'>>>
  onClick?: () => void
}

export const TableEditAddRow = forwardRef(
  <T extends { id: number }>(
    { columns, newRow, setNewRow, onClick }: TableEditAddRowProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className="table-edit__add-row"
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      <div className="table-edit__add-row-empty" />
      {columns.map(col => (
        <div key={String(col.key)} className="table-edit__add-row-cell">
          {col.render
            ? col.render(
                { ...newRow, id: 1 } as T,
                (value: any) =>
                  setNewRow(prev => ({ ...prev, [col.key]: value })),
                false,
              )
            : null}
        </div>
      ))}
      <div className="table-edit__add-row-cell table-edit__add-row-cell-button">
        <Icon onClick={onClick} icon="ADD" />
      </div>
    </div>
  ),
)
