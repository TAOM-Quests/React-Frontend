import { ReactNode, RefObject } from 'react'
import { SwitcherFilter } from './Filters/SwitcherFilter'
import { DefaultColumnFilter } from './Filters/DefaultColumnFilter'

interface FilterTableEditProps {
  title: string
  filterValue: any
  setFilterValue: (value: any) => void
}

interface TableColumn<T> {
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
      const FilterComponent = col.Filter
        ? col.Filter
        : col.switcherOptions && col.switcherOptions.length > 0
          ? (props: any) => (
              <SwitcherFilter {...props} options={col.switcherOptions!} />
            )
          : DefaultColumnFilter

      return (
        <div key={String(col.key)} className="table-edit__filters-cell">
          <FilterComponent
            title={col.title}
            filterValue={filters[String(col.key)] || ''}
            setFilterValue={(val: any) => setFilterValue(col.key, val)}
          />
        </div>
      )
    })}
    <div className="table-edit__filters-delete-placeholder" />
  </div>
)
