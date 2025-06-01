import { Dispatch, forwardRef, Ref, SetStateAction } from 'react'
import { Icon } from '../../UI/Icon/Icon'
import { TableColumn } from './TableEdit'

interface TableEditAddRowProps<T extends { id: number }> {
  columns: TableColumn<T>[]
  newRow: Omit<T, 'id'>
  setNewRow: Dispatch<SetStateAction<Omit<T, 'id'>>>
  onAddClick?: () => void
}

export const TableEditAddRow = forwardRef(
  <T extends { id: number }>(
    { columns, newRow, setNewRow, onAddClick }: TableEditAddRowProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const renderAddRowCell = (col: TableColumn<T>) => {
      const rowForRender = { ...newRow, id: 1 } as T

      if (!col.cellRender) return null

      return (
        <div key={String(col.key)} className="table-edit__add-row-cell">
          {col.cellRender(
            rowForRender,
            (value: any) => setNewRow(prev => ({ ...prev, [col.key]: value })),
            false,
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className="table-edit__add-row"
        style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
      >
        <div className="table-edit__add-row-empty" />
        {columns.map(renderAddRowCell)}
        <div className="table-edit__add-row-cell table-edit__add-row-cell-button">
          <Icon onClick={onAddClick} icon="ADD" />
        </div>
      </div>
    )
  },
)
