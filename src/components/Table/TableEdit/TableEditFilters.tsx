import { ReactNode, RefObject } from 'react'
import { SwitcherFilter } from './Filters/SwitcherFilter'
import { DefaultColumnFilter } from './Filters/DefaultColumnFilter'

interface FilterTableEditProps {
  title: string
  filterValue: any
  setFilterValue: (value: any) => void
}

interface TableColumn<T> {
  render?: any
  key: keyof T
  title: string
  Filter?: (props: FilterTableEditProps) => ReactNode
  switcherOptions?: string[]
}

interface TableEditFiltersProps<T> {
  columns: TableColumn<T>[]
  filters: Record<string, any>
  setFilterValue: (key: keyof T, value: any) => void
  filtersRef: RefObject<HTMLDivElement>
}

export const TableEditFilters = <T,>({
  columns,
  filters,
  setFilterValue,
  filtersRef,
}: TableEditFiltersProps<T>) => (
  <div ref={filtersRef} className="table-edit__filters">
    <div className="table-edit__filters-empty" />
    {columns.map(col => {
      if (!col.render) {
        // Если render нет, используем дефолтный инпут
        return (
          <div key={String(col.key)} className="table-edit__filters-cell">
            <input
              value={filters[String(col.key)] || ''}
              onChange={e => setFilterValue(col.key, e.target.value)}
              placeholder={col.title}
            />
          </div>
        )
      }

      // Формируем объект с одним ключом для передачи в render
      const filterRow = { [col.key]: filters[String(col.key)] } as T

      return (
        <div key={String(col.key)} className="table-edit__filters-cell">
          {col.render(
            filterRow,
            (val: any) => setFilterValue(col.key, val),
            false,
          )}
        </div>
      )
    })}
    <div className="table-edit__filters-delete-placeholder" />
  </div>
)
