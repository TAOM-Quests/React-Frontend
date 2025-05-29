import {
  useState,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
  useCallback,
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
}

export interface TableEditProps<T extends { id: number }> {
  title: string
  columns: TableColumn<T>[]
  initialRows: T[]
  addRowTemplate?: Omit<T, 'id'>
  onAddRow?: (newRow: Omit<T, 'id'>) => void
  onDeleteRow?: (id: number) => void
  isAllowAddRow?: boolean
  isAllowMultiSelect?: boolean
  isAllowDelete?: boolean
  selectedIds?: number[]
  setSelectedIds?: React.Dispatch<React.SetStateAction<number[]>>
  onDeleteSelected?: () => void
}

export const TableEdit = <T extends { id: number }>({
  title,
  columns,
  initialRows,
  addRowTemplate,
  onAddRow,
  onDeleteRow,
  isAllowAddRow = true,
  isAllowMultiSelect = true,
  isAllowDelete = true,
  selectedIds = [],
  setSelectedIds,
  onDeleteSelected,
}: TableEditProps<T>) => {
  const [rows, setRows] = useState<T[]>(initialRows)
  // const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [localSelectedIds, setLocalSelectedIds] =
    useState<number[]>(selectedIds)
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
    if (selectedIds) setLocalSelectedIds(selectedIds)
  }, [selectedIds])

  useEffect(() => {
    setRows(initialRows)
  }, [initialRows])

  const toggleEdit = () => {
    setIsEdit(prev => !prev)
    if (isEdit) setLocalSelectedIds([])
  }

  const handleCellChange = (rowId: number, key: keyof T, value: any) => {
    setRows(prev =>
      prev.map(row => (row.id === rowId ? { ...row, [key]: value } : row)),
    )
  }

  const handleAddRowClick = useCallback(() => {
    if (onAddRow) {
      onAddRow(newRow)
      setNewRow(addRowTemplate ?? ({} as Omit<T, 'id'>))
    }
  }, [onAddRow, newRow, addRowTemplate])

  const handleDeleteSelected = () => {
    if (onDeleteSelected) {
      onDeleteSelected()
    } else {
      // Локальное удаление, если внешняя функция не передана
      setRows(prev => prev.filter(row => !localSelectedIds.includes(row.id)))
      if (setSelectedIds) {
        setSelectedIds([])
      }
    }
  }

  const handleDeleteRow = (id: number) => {
    if (onDeleteRow) {
      onDeleteRow(id)
    } else {
      setRows(prev => prev.filter(row => row.id !== id))
      if (setSelectedIds) {
        setSelectedIds(prev => prev.filter(sid => sid !== id))
      }
    }
  }

  const handleSelectRow = (id: number) => {
    let newSelected: number[]
    if (!isAllowMultiSelect) {
      newSelected = localSelectedIds.includes(id) ? [] : [id]
    } else {
      newSelected = localSelectedIds.includes(id)
        ? localSelectedIds.filter(sid => sid !== id)
        : [...localSelectedIds, id]
    }
    setLocalSelectedIds(newSelected)
    setSelectedIds?.(newSelected)
  }

  const handleSelectAll = () => {
    if (localSelectedIds.length === filteredRows.length) {
      setLocalSelectedIds([])
      setSelectedIds?.([])
    } else {
      const allIds = filteredRows.map(row => row.id)
      setLocalSelectedIds(allIds)
      setSelectedIds?.(allIds)
    }
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
            isEdit={isEdit}
            handleCellChange={handleCellChange}
            handleDeleteRow={isAllowDelete ? handleDeleteRow : undefined}
            isAllowMultiSelect={isAllowMultiSelect}
            isAllowDelete={isAllowDelete}
            selectedIds={localSelectedIds}
            handleSelectRow={handleSelectRow}
            handleSelectAll={isAllowMultiSelect ? handleSelectAll : undefined}
          />
        </div>
        {isEdit && isAllowDelete && localSelectedIds.length > 0 && (
          <TableEditFooter
            totalCount={filteredRows.length}
            selectedCount={localSelectedIds.length}
            onDelete={handleDeleteSelected}
          />
        )}
        {isAllowAddRow && (
          <div>
            <TableEditAddRow
              ref={addRowRef}
              columns={columns as TableColumn<{ id: number }>[]}
              newRow={newRow}
              setNewRow={
                setNewRow as Dispatch<
                  SetStateAction<Omit<{ id: number }, 'id'>>
                >
              }
              onClick={handleAddRowClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}
