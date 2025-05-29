import {
  useState,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react'
import { TableEditHeader } from './TableEditHeader'
import { TableEditFilters } from './TableEditFilters'
import { TableEditTable } from './TableEditTable'
import { TableEditFooter } from './TableEditFooter'
import { TableEditAddRow } from './TableEditAddRow'
import { useSyncedScroll } from '../../../hooks/redux/useSyncedScroll'
import './TableEdit.scss'

export type RenderFunction<T> = (
  row: T,
  onChange: (value: any) => void,
  isDisabled: boolean,
) => ReactNode

export interface TableColumn<T> {
  key: keyof T
  title: string
  render?: RenderFunction<T>
  switcherOptions?: string[]
  disableFilter?: boolean
}

export interface TableEditProps<T extends { id: string | number }> {
  columns: TableColumn<T>[]
  initialRows: T[]
  addRowTemplate?: Omit<T, 'id'>
  title?: string
  onAddRow?: () => void
  isAllowAddRow?: boolean
  isAllowMultiSelect?: boolean
  isAllowDelete?: boolean
}

export const TableEdit = <T extends { id: string | number }>({
  title,
  columns,
  initialRows,
  addRowTemplate,
  onAddRow,
  isAllowAddRow = false,
  isAllowMultiSelect = false,
  isAllowDelete = false,
}: TableEditProps<T>) => {
  const [rows, setRows] = useState<T[]>(initialRows)
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [newRow, setNewRow] = useState<Omit<T, 'id'>>(
    addRowTemplate ?? (() => ({}) as Omit<T, 'id'>),
  )
  const [filters, setFilters] = useState<Record<string, any>>({})

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const addRowRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  useSyncedScroll([tableWrapperRef, addRowRef, filtersRef])

  useEffect(() => {
    setRows(initialRows)
  }, [initialRows])

  const toggleEdit = () => {
    setIsEdit(prev => !prev)
    if (isEdit) setSelectedIds([])
  }

  const handleCellChange = (
    rowId: string | number,
    key: keyof T,
    value: any,
  ) => {
    setRows(prev =>
      prev.map(row => (row.id === rowId ? { ...row, [key]: value } : row)),
    )
  }

  const handleAddRow = () => {
    // const id = Date.now()
    // setRows(prev => [...prev, { ...newRow, id } as T])
    // setNewRow(addRowTemplate)
    if (onAddRow) onAddRow()
  }

  const handleDeleteSelected = () => {
    setRows(prev => prev.filter(row => !selectedIds.includes(row.id)))
    setSelectedIds([])
  }

  const handleDeleteRow = (id: string | number) => {
    setRows(prev => prev.filter(row => row.id !== id))
    setSelectedIds(prev => prev.filter(sid => sid !== id))
  }

  const handleSelectRow = (id: string | number) => {
    if (!isAllowMultiSelect) {
      setSelectedIds(prev => (prev.includes(id) ? [] : [id]))
    } else {
      setSelectedIds(prev =>
        prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id],
      )
    }
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredRows.length) setSelectedIds([])
    else setSelectedIds(filteredRows.map(row => row.id))
  }

  const setFilterValue = (key: keyof T, value: any) => {
    setFilters(prev => ({
      ...prev,
      [String(key)]: value,
    }))
  }

  const filteredRows = useMemo(() => {
    return rows.filter(row =>
      columns.every(col => {
        const filterVal = filters[String(col.key)]
        if (
          filterVal === undefined ||
          filterVal === '' ||
          filterVal === null ||
          filterVal === 'Все'
        )
          return true

        const cellVal = row[col.key]

        if (col.switcherOptions && col.switcherOptions.length > 0) {
          return cellVal === filterVal
        }

        if (typeof cellVal === 'string' && typeof filterVal === 'string') {
          return cellVal.toLowerCase().includes(filterVal.toLowerCase())
        }

        return cellVal === filterVal
      }),
    )
  }, [rows, filters, columns])

  return (
    <div className="table-edit">
      <TableEditHeader isEdit={isEdit} toggleEdit={toggleEdit} title={title} />
      <TableEditFilters
        columns={columns}
        filters={filters}
        setFilterValue={setFilterValue}
        filtersRef={filtersRef}
      />
      <div>
        <div ref={tableWrapperRef} className="table-edit__table-wrapper">
          <TableEditTable
            columns={columns}
            filteredRows={filteredRows}
            selectedIds={selectedIds}
            isEdit={isEdit}
            handleSelectAll={isAllowMultiSelect ? handleSelectAll : undefined}
            handleSelectRow={handleSelectRow}
            handleCellChange={handleCellChange}
            handleDeleteRow={isAllowDelete ? handleDeleteRow : undefined}
            isAllowMultiSelect={isAllowMultiSelect}
            isAllowDelete={isAllowDelete}
          />
        </div>
        {isEdit && isAllowDelete && selectedIds.length > 0 && (
          <TableEditFooter
            totalCount={filteredRows.length}
            selectedCount={selectedIds.length}
            onDelete={handleDeleteSelected}
          />
        )}
        {isAllowAddRow && (
          <div>
            <TableEditAddRow
              ref={addRowRef}
              columns={columns as TableColumn<{ id: string | number }>[]}
              newRow={newRow}
              setNewRow={
                setNewRow as Dispatch<
                  SetStateAction<Omit<{ id: string | number }, 'id'>>
                >
              }
              onAddRow={handleAddRow}
            />
          </div>
        )}
      </div>
    </div>
  )
}
