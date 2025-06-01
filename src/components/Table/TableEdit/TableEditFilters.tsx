import { forwardRef, Ref } from 'react'
import { TableColumn } from './TableEdit'
import Input from '../../UI/Input/Input'

interface TableEditFiltersProps<T> {
  columns: TableColumn<T>[]
  filters: Record<string, any>
  setFilterValue: (key: keyof T, value: any) => void
}

export const TableEditFilters = forwardRef(
  <T extends { id: number }>(
    { columns, filters, setFilterValue }: TableEditFiltersProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const renderFilterCell = (col: TableColumn<T>) => {
      const keyStr = String(col.key)
      if (col.disableFilter) {
        return <div key={keyStr} className="table-edit__filters-cell" />
      }

      if (!col.cellRender) {
        return (
          <div key={keyStr} className="table-edit__filters-cell">
            <Input
              value={filters[keyStr] || ''}
              onChange={e => setFilterValue(col.key, e.target.value)}
              placeholder={col.title}
            />
          </div>
        )
      }

      const filterRow = { [col.key]: filters[keyStr] } as T

      return (
        <div key={keyStr} className="table-edit__filters-cell">
          {col.cellRender(
            filterRow,
            val => setFilterValue(col.key, val),
            false,
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className="table-edit__filters">
        <div className="table-edit__filters-empty" />
        {columns.map(renderFilterCell)}
        <div className="table-edit__filters-delete-placeholder" />
      </div>
    )
  },
)
