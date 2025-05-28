import React from 'react'
import { Checkbox } from '../../UI/Checkbox/Checkbox'
import { Icon } from '../../UI/Icon/Icon'
import { RenderFunction } from './TableEdit'

interface TableColumn<T> {
  key: keyof T
  title: string
  render?: RenderFunction<T>
  switcherOptions?: string[]
}

interface TableEditTableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[]
  filteredRows: T[]
  selectedIds: (string | number)[]
  isEdit: boolean
  handleSelectAll?: () => void
  handleSelectRow: (id: string | number) => void
  handleCellChange: (rowId: string | number, key: keyof T, value: any) => void
  handleDeleteRow?: (id: string | number) => void
  isAllowMultiSelect?: boolean
  isAllowDelete?: boolean
}

export const TableEditTable = <T extends { id: string | number }>({
  columns,
  filteredRows,
  selectedIds,
  isEdit,
  handleSelectAll,
  handleSelectRow,
  handleCellChange,
  handleDeleteRow,
  isAllowMultiSelect = false,
  isAllowDelete = false,
}: TableEditTableProps<T>) => (
  <table className="table-edit__table">
    <thead className="table-edit__thead">
      <tr>
        {isAllowMultiSelect ? (
          <th className="table-edit__checkbox-col table-edit__sticky-col-left table-edit__thead-sticky">
            <Checkbox
              isSelected={
                selectedIds.length === filteredRows.length &&
                filteredRows.length > 0
              }
              onChange={handleSelectAll}
              isDisabled={!isEdit}
            />
          </th>
        ) : (
          <th className="table-edit__checkbox-col table-edit__sticky-col-left table-edit__thead-sticky" />
        )}
        {columns.map(col => (
          <th key={String(col.key)} className="table-edit__th">
            {col.title}
          </th>
        ))}
        <th className="table-edit__actions-col table-edit__sticky-col-right table-edit__thead-sticky" />
      </tr>
    </thead>
    <tbody className="table-edit__tbody">
      {filteredRows.map(row => (
        <tr key={row.id} className="table-edit__tr">
          {isAllowMultiSelect ? (
            <td className="table-edit__checkbox-col table-edit__sticky-col-left">
              <Checkbox
                isSelected={selectedIds.includes(row.id)}
                onChange={() => handleSelectRow(row.id)}
                isDisabled={!isEdit}
              />
            </td>
          ) : (
            <td className="table-edit__checkbox-col table-edit__sticky-col-left" />
          )}
          {columns.map(col => (
            <td key={String(col.key)} className="table-edit__td">
              {col.render
                ? col.render(
                    row,
                    (value: any) => handleCellChange(row.id, col.key, value),
                    !isEdit,
                  )
                : (row[col.key] as React.ReactNode)}
            </td>
          ))}
          <td className="table-edit__actions-col table-edit__sticky-col-right">
            {isEdit && isAllowDelete && (
              <Icon
                icon="DELETE"
                className="table-edit__delete-button"
                onClick={() => handleDeleteRow?.(row.id)}
              />
            )}
          </td>
        </tr>
      ))}
      {filteredRows.length === 0 && (
        <tr>
          <td colSpan={columns.length + 2} className="table-edit__no-data">
            Нет данных
          </td>
        </tr>
      )}
    </tbody>
  </table>
)
