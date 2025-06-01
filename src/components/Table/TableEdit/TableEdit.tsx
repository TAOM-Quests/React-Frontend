import {
  useState,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
  useCallback,
  RefObject,
} from 'react'
import { TableEditHeader } from './TableEditHeader'
import { TableEditFilters } from './TableEditFilters'
import { TableEditTable } from './TableEditTable'
import { TableEditFooter } from './TableEditFooter'
import { TableEditAddRow } from './TableEditAddRow'
import { useSyncedScroll } from '../../../hooks/redux/useSyncedScroll'
import './TableEdit.scss'

export type CellRenderer<T> = (
  row: T,
  onChange: (value: any) => void,
  isDisabled: boolean,
) => ReactNode

export interface TableColumn<T> {
  key: keyof T
  title: string
  cellRender?: CellRenderer<T>
  disableFilter?: boolean
  switcherOptions?: string[]
}

export interface TableEditProps<T extends { id: number }> {
  columns: TableColumn<T>[]
  initialRows: T[]
  title?: string
  onAddRow?: (newRow: Omit<T, 'id'>) => void
  onDeleteRow?: (id: number) => void
  selectedIds?: number[]
  onCellChange?: (rowId: number, key: keyof T, value: any) => void
  onSaveChanges?: () => void
  isAllowAddRow?: boolean
  isAllowDelete?: boolean
  addRowTemplate?: Omit<T, 'id'>
  setSelectedIds?: React.Dispatch<React.SetStateAction<number[]>>
  onDeleteSelected?: () => void
  isAllowMultiSelect?: boolean
  hasValidationErrors?: boolean
}

export const TableEdit = <T extends { id: number }>({
  title,
  columns,
  initialRows,
  addRowTemplate,
  onAddRow,
  onDeleteRow,
  isAllowAddRow = false,
  isAllowMultiSelect = false,
  isAllowDelete = false,
  selectedIds = [],
  setSelectedIds,
  onDeleteSelected,
  onCellChange,
  onSaveChanges,
  hasValidationErrors,
}: TableEditProps<T>) => {
  const [rows, setRows] = useState<T[]>(initialRows)
  const [localSelectedIds, setLocalSelectedIds] =
    useState<number[]>(selectedIds)
  const [isEdit, setIsEdit] = useState(false)

  const [filters, setFilters] = useState<Record<string, any>>({})

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const addRowRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  useSyncedScroll([
    tableWrapperRef as RefObject<HTMLDivElement>,
    addRowRef as RefObject<HTMLDivElement>,
    filtersRef as RefObject<HTMLDivElement>,
  ])

  useEffect(() => {
    setRows(initialRows)
  }, [initialRows])

  const clearSelection = () => {
    setLocalSelectedIds([])
    setSelectedIds?.([])
  }

  const toggleEditMode = () => {
    if (isEdit) {
      if (hasValidationErrors) return
      onSaveChanges?.()
      clearSelection()
    }
    setIsEdit(prev => !prev)
  }

  const onCellValueChange = (rowId: number, key: keyof T, value: any) => {
    setRows(prev =>
      prev.map(row => (row.id === rowId ? { ...row, [key]: value } : row)),
    )
    onCellChange?.(rowId, key, value)
  }

  const deleteSelectedRows = () => {
    if (onDeleteSelected) {
      onDeleteSelected()
    } else {
      setRows(prev => prev.filter(row => !localSelectedIds.includes(row.id)))
      clearSelection()
    }
  }

  const deleteRowById = (id: number) => {
    if (onDeleteRow) {
      onDeleteRow(id)
    } else {
      setRows(prev => prev.filter(row => row.id !== id))
      setSelectedIds?.(prev => prev.filter(sid => sid !== id))
      setLocalSelectedIds(prev => prev.filter(sid => sid !== id))
    }
  }

  const toggleRowSelection = (id: number) => {
    let updatedSelection: number[]
    if (!isAllowMultiSelect) {
      updatedSelection = localSelectedIds.includes(id) ? [] : [id]
    } else {
      updatedSelection = localSelectedIds.includes(id)
        ? localSelectedIds.filter(selectedId => selectedId !== id)
        : [...localSelectedIds, id]
    }
    setLocalSelectedIds(updatedSelection)
    setSelectedIds?.(updatedSelection)
  }

  const toggleSelectAll = () => {
    if (localSelectedIds.length === filteredRows.length) {
      clearSelection()
    } else {
      const allIds = filteredRows.map(row => row.id)
      setLocalSelectedIds(allIds)
      setSelectedIds?.(allIds)
    }
  }

  const updateFilter = (key: keyof T, value: any) => {
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

  return (
    <div className="table-edit">
      <TableEditHeader
        title={title}
        isEdit={isEdit}
        disabled={hasValidationErrors}
        onEditButtonClick={toggleEditMode}
      />
      <TableEditFilters
        ref={filtersRef as RefObject<HTMLDivElement>}
        columns={columns as TableColumn<{ id: number }>[]}
        filters={filters}
        setFilterValue={updateFilter}
      />
      <div>
        <div
          ref={tableWrapperRef as RefObject<HTMLDivElement>}
          className="table-edit__table-wrapper"
        >
          <TableEditTable
            columns={columns as TableColumn<{ id: number }>[]}
            rows={filteredRows}
            isEdit={isEdit}
            onCellChange={onCellValueChange}
            onDeleteRow={isAllowDelete ? deleteRowById : undefined}
            isAllowMultiSelect={isAllowMultiSelect}
            isAllowDelete={isAllowDelete}
            selectedIds={localSelectedIds}
            onSelectRow={toggleRowSelection}
            onSelectAll={isAllowMultiSelect ? toggleSelectAll : undefined}
          />
        </div>
        {isEdit && isAllowDelete && localSelectedIds.length > 0 && (
          <TableEditFooter
            totalCount={filteredRows.length}
            selectedCount={localSelectedIds.length}
            onDelete={deleteSelectedRows}
          />
        )}

        {isAllowAddRow && (
          <div>
            <TableEditAddRow<T>
              ref={addRowRef}
              columns={columns}
              addRowTemplate={addRowTemplate}
              onAddRow={onAddRow}
            />
          </div>
        )}
      </div>
    </div>
  )
}
