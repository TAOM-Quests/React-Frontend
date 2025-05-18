import { Dispatch, forwardRef, ReactNode, Ref, SetStateAction } from 'react'
import { Icon } from '../../UI/Icon/Icon'
import { RenderFunction } from './TableEdit'

interface TableColumn<T> {
  key: keyof T
  render?: RenderFunction<T>
}

interface TableEditAddRowProps<T extends { id: string | number }> {
  columns: TableColumn<T>[]
  newRow: Omit<T, 'id'>
  setNewRow: Dispatch<SetStateAction<Omit<T, 'id'>>>
  onAddRow: () => void
}

export const TableEditAddRow = forwardRef(
  <T extends { id: string | number }>(
    { columns, newRow, setNewRow, onAddRow }: TableEditAddRowProps<T>,
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
                { ...newRow, id: 'new' } as T,
                (value: any) =>
                  setNewRow(prev => ({ ...prev, [col.key]: value })),
                false,
              )
            : null}
        </div>
      ))}
      <div className="table-edit__add-row-cell table-edit__add-row-cell-button">
        <Icon onClick={onAddRow} icon="ADD" />
      </div>
    </div>
  ),
)
