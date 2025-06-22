import { ReactNode } from 'react'
import { Checkbox } from '../../UI/Checkbox/Checkbox'
import { Icon } from '../../UI/Icon/Icon'
import { TableColumn } from './TableEdit'

interface TableEditTableProps<T extends { id: number }> {
  rows: T[]
  isEdit: boolean
  columns: TableColumn<T>[]
  selectedIds: number[]
  onSelectAll?: () => void
  onSelectRow?: (id: number) => void
  onDeleteRow?: (id: number) => void
  onCellChange?: (rowId: number, key: keyof T, value: any) => void
  isAllowDelete?: boolean
  isAllowMultiSelect?: boolean
}

export const TableEditTable = <T extends { id: number }>({
  rows,
  isEdit,
  columns,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onDeleteRow,
  onCellChange,
  isAllowMultiSelect = false,
  isAllowDelete = false,
}: TableEditTableProps<T>) => {
  const allSelected = selectedIds.length === rows.length && rows.length > 0

  const renderSelectAllCheckbox = () => (
    <th className="table-edit__checkbox-col table-edit__sticky-col-left table-edit__thead-sticky">
      <Checkbox
        isSelected={allSelected}
        onChange={onSelectAll}
        isDisabled={!isEdit}
      />
    </th>
  )

  const renderActionsHeader = () => (
    <th className="table-edit__actions-col table-edit__sticky-col-right table-edit__thead-sticky" />
  )

  const renderActionCell = (rowId: number) => (
    <td className="table-edit__actions-col table-edit__sticky-col-right">
      {isEdit && isAllowDelete && (
        <Icon
          icon="DELETE"
          className="table-edit__delete-button"
          onClick={() => onDeleteRow?.(rowId)}
        />
      )}
    </td>
  )

  const renderSelectRowCheckbox = (rowId: number) => (
    <td className="table-edit__checkbox-col table-edit__sticky-col-left">
      <Checkbox
        isSelected={selectedIds.includes(rowId)}
        onChange={() => onSelectRow?.(rowId)}
        isDisabled={!isEdit}
      />
    </td>
  )

  return (
    <table className="table-edit__table">
      <thead className="table-edit__thead">
        <tr>
          {isAllowMultiSelect && renderSelectAllCheckbox()}

          {columns.map(col => (
            <th key={String(col.key)} className="body_m_sb table-edit__th">
              {col.title}
            </th>
          ))}

          {isAllowMultiSelect && renderActionsHeader()}
        </tr>
      </thead>

      <tbody className="table-edit__tbody">
        {rows.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + (isAllowMultiSelect ? 2 : 0)}
              className="table-edit__no-data"
            >
              Нет данных
            </td>
          </tr>
        ) : (
          rows.map(row => (
            <tr key={row.id} className="table-edit__tr">
              {isAllowMultiSelect && renderSelectRowCheckbox(row.id)}

              {columns.map(col => (
                <td key={String(col.key)} className="table-edit__td">
                  {col.cellRender
                    ? col.cellRender(
                        row,
                        (value: any) => onCellChange?.(row.id, col.key, value),
                        !isEdit,
                      )
                    : (row[col.key] as ReactNode)}
                </td>
              ))}

              {isAllowMultiSelect && renderActionCell(row.id)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
