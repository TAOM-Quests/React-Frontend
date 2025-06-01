import { forwardRef, ReactNode, Ref, RefObject } from 'react'
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
  disableFilter?: boolean
}

interface TableEditFiltersProps<T> {
  columns: TableColumn<T>[]
  filters: Record<string, any>
  setFilterValue: (key: keyof T, value: any) => void
}

export const TableEditFilters = forwardRef(
  <T extends { id: number }>(
    { columns, filters, setFilterValue }: TableEditFiltersProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => (
    <div ref={ref} className="table-edit__filters">
      <div className="table-edit__filters-empty" />
      {columns.map(col => {
        if (col.disableFilter) {
          return (
            <div key={String(col.key)} className="table-edit__filters-cell" />
          )
        }
        if (!col.render) {
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
  ),
)
