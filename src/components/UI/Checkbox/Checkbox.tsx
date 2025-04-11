import React, { ReactNode } from 'react'
import classNames from 'classnames'
import './Checkbox.scss'
import { Icon } from '../Icon/Icon'

// Интерфейс для свойств компонента Checkbox
export interface CheckboxProps {
  id: string
  label?: string | ReactNode
  selected: boolean
  onSelect: (id: string) => void
  disabled?: boolean
}

// Компонент Checkbox
export const Checkbox = ({
  id,
  label,
  selected,
  onSelect,
  disabled = false,
}: CheckboxProps) => {
  // Обработчик изменения состояния чекбокса
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onSelect(id)
  }

  return (
    <label
      className={classNames('checkbox-wrapper', {
        'checkbox-wrapper--disabled': disabled,
      })}
    >
      <input
        type="checkbox"
        className="checkbox-input"
        checked={selected}
        disabled={disabled}
        onChange={handleChange}
        id={id} // Добавляем id к input для связи с label
      />
      <span className="checkbox-custom">
        {selected && <Icon icon={'CHECK'} size="16px" colorIcon="primary" />}
      </span>
      {label && (
        <label className="checkbox-label" htmlFor={id}>
          {label}
        </label>
      )}
    </label>
  )
}
