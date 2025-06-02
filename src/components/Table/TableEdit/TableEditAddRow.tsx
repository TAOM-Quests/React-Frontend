import { forwardRef, JSX, Ref, useState } from 'react'
import { Icon } from '../../UI/Icon/Icon'
import { TableColumn } from './TableEdit'

interface TableEditAddRowProps<T extends { id: number }> {
  columns: TableColumn<T>[]
  onAddRow?: (newRow: Omit<T, 'id'>) => void
  addRowTemplate?: Omit<T, 'id'>
}

const TableEditAddRowInner = <T extends { id: number }>(
  { columns, addRowTemplate, onAddRow }: TableEditAddRowProps<T>,
  ref: Ref<HTMLDivElement>,
): JSX.Element => {
  const [newRow, setNewRow] = useState<Omit<T, 'id'>>(
    addRowTemplate ?? ({} as Omit<T, 'id'>),
  )

  const renderAddRowCell = (col: TableColumn<T>) => {
    const rowForRender = { ...newRow, id: 1 } as T

    if (!col.cellRender) return null

    return (
      <div key={String(col.key)} className="table-edit__add-row-cell">
        {col.cellRender(
          rowForRender,
          (value: unknown) =>
            setNewRow(prev => ({ ...prev, [col.key]: value })),
          false,
        )}
      </div>
    )
  }

  const handleAddClick = () => {
    if (!onAddRow) return
    onAddRow(newRow)
    setNewRow(addRowTemplate ?? ({} as Omit<T, 'id'>))
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
        <Icon onClick={handleAddClick} icon="ADD" />
      </div>
    </div>
  )
}

export const TableEditAddRow = forwardRef(TableEditAddRowInner) as <
  T extends { id: number },
>(
  props: TableEditAddRowProps<T> & { ref?: Ref<HTMLDivElement> },
) => JSX.Element
