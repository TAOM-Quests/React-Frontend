import { forwardRef, JSX, Ref, useEffect, useMemo, useState } from 'react'
import { TableColumn } from './TableEdit'
import Input from '../../UI/Input/Input'

interface TableEditFiltersProps<T extends { id: number }> {
  rows: T[]
  columns: TableColumn<T>[]
  onFilterChange?: (filteredRows: T[]) => void
}

const TableEditFiltersInner = <T extends { id: number }>(
  { columns, rows, onFilterChange }: TableEditFiltersProps<T>,
  ref: Ref<HTMLDivElement>,
): JSX.Element => {
  const [filters, setFilters] = useState<Record<string, any>>({})

  const setFilterValue = (key: keyof T, value: any) => {
    setFilters(prev => ({
      ...prev,
      [String(key)]: value,
    }))
  }

  const filteredRows = useMemo(() => {
    return rows.filter(row =>
      columns.every(col => {
        const filterValue = filters[String(col.key)]
        if (
          filterValue === undefined ||
          filterValue === '' ||
          filterValue === null ||
          filterValue === 'Все'
        )
          return true

        const cellValue = row[col.key]

        if (cellValue && typeof cellValue === 'object' && 'id' in cellValue) {
          return (
            filterValue &&
            typeof filterValue === 'object' &&
            'id' in filterValue &&
            cellValue.id === filterValue.id
          )
        }

        if (typeof cellValue === 'string' && typeof filterValue === 'string') {
          return cellValue.toLowerCase().includes(filterValue.toLowerCase())
        }

        return cellValue === filterValue
      }),
    )
  }, [rows, filters, columns])

  useEffect(() => {
    onFilterChange?.(filteredRows)
  }, [filteredRows, onFilterChange])

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
        {col.cellRender(filterRow, val => setFilterValue(col.key, val), false)}
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
}

export const TableEditFilters = forwardRef(TableEditFiltersInner) as <
  T extends { id: number },
>(
  props: TableEditFiltersProps<T> & { ref?: Ref<HTMLDivElement> },
) => JSX.Element
