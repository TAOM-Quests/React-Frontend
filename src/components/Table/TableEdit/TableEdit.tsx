import React, { useState, useMemo, ReactNode, FC } from 'react'
import { Switcher } from '../../UI/Switcher/Switcher'
import { Checkbox } from '../../UI/Checkbox/Checkbox'
import Input from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import './TableEdit.scss'

export interface TableColumn<T> {
  key: keyof T
  title: string
  render?: (
    row: T,
    onChange: (value: any) => void,
    disabled: boolean,
  ) => ReactNode
  Filter?: FC<{
    title: string
    filterValue: any
    setFilterValue: (value: any) => void
  }>
  switcherOptions?: string[]
}

export interface TableEditProps<T extends { id: string | number }> {
  columns: TableColumn<T>[]
  initialRows: T[]
  addRowTemplate: Omit<T, 'id'>
}

function DefaultColumnFilter({
  filterValue,
  setFilterValue,
  title,
}: {
  title: string
  filterValue: string
  setFilterValue: (value: string) => void
}) {
  return (
    <Input
      type="text"
      value={filterValue}
      onChange={e => setFilterValue(e.target.value)}
      placeholder={`Фильтр по столбцу «${title}»`}
    />
  )
}

function SwitcherFilter({
  filterValue,
  setFilterValue,
  options,
}: {
  filterValue: string
  setFilterValue: (value: string) => void
  options: string[]
}) {
  return (
    <Switcher
      options={options}
      activeOption={filterValue || 'Все'}
      onChange={val => setFilterValue(val)}
    />
  )
}

export function TableEdit<T extends { id: string | number }>({
  columns,
  initialRows,
  addRowTemplate,
}: TableEditProps<T>) {
  const [rows, setRows] = useState<T[]>(initialRows)
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [newRow, setNewRow] = useState<Omit<T, 'id'>>(addRowTemplate)

  const [filters, setFilters] = useState<Record<string, any>>({})

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
    const id = Date.now()
    setRows(prev => [...prev, { ...newRow, id } as T])
    setNewRow(addRowTemplate)
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
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id],
    )
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
      <div className="table-edit__header">
        <Button
          text={isEdit ? 'Сохранить изменения' : 'Редактировать'}
          onClick={toggleEdit}
          iconBefore={isEdit ? 'CHECK' : 'EDIT'}
        />
      </div>

      <div className="table-edit__filters">
        <div className="table-edit__filters-checkbox-placeholder" />
        {columns.map(col => {
          const FilterComponent = col.Filter
            ? col.Filter
            : col.switcherOptions && col.switcherOptions.length > 0
              ? (props: any) => (
                  <SwitcherFilter {...props} options={col.switcherOptions!} />
                )
              : DefaultColumnFilter

          return (
            <div key={String(col.key)} className="table-edit__filter-cell">
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

      <div className="table-edit__table-wrapper">
        <table className="table-edit__table">
          <thead className="table-edit__thead">
            <tr>
              <th className="table-edit__checkbox-col">
                <Checkbox
                  isSelected={
                    selectedIds.length === filteredRows.length &&
                    filteredRows.length > 0
                  }
                  onChange={handleSelectAll}
                  isDisabled={!isEdit}
                />
              </th>
              {columns.map(col => (
                <th key={String(col.key)} className="table-edit__th">
                  {col.title}
                </th>
              ))}
              <th className="table-edit__actions-col" />
            </tr>
          </thead>
          <tbody className="table-edit__tbody">
            {filteredRows.map(row => (
              <tr key={row.id} className="table-edit__tr">
                <td className="table-edit__checkbox-col">
                  <Checkbox
                    isSelected={selectedIds.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    isDisabled={!isEdit}
                  />
                </td>
                {columns.map(col => (
                  <td key={String(col.key)} className="table-edit__td">
                    {col.render
                      ? col.render(
                          row,
                          value => handleCellChange(row.id, col.key, value),
                          !isEdit,
                        )
                      : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
                <td className="table-edit__actions-col">
                  {isEdit && (
                    <button
                      className="table-edit__delete-button"
                      onClick={() => handleDeleteRow(row.id)}
                      type="button"
                      aria-label="Удалить строку"
                    >
                      Удалить
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="table-edit__no-data"
                >
                  Нет данных по текущему фильтру
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEdit && selectedIds.length > 0 && (
        <div className="table-edit__footer">
          <span className="table-edit__footer-text">
            Выбрано {selectedIds.length}{' '}
            {selectedIds.length === 1 ? 'строка' : 'строк'} из{' '}
            {filteredRows.length}
          </span>
          <button
            className="table-edit__footer-delete-button"
            onClick={handleDeleteSelected}
            type="button"
          >
            Удалить
          </button>
        </div>
      )}

      <div className="table-edit__add-row">
        {columns.map(col => (
          <div key={String(col.key)} className="table-edit__add-row-cell">
            {col.render
              ? col.render(
                  { ...newRow, id: 'new' } as T,
                  value => setNewRow(prev => ({ ...prev, [col.key]: value })),
                  false,
                )
              : null}
          </div>
        ))}
        <button
          className="table-edit__add-row-button"
          onClick={handleAddRow}
          type="button"
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
