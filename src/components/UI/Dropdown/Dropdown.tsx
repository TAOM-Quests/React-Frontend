import { useContext, useState } from 'react'
import { Icon } from '../Icon/Icon'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import { Option } from '../Option/Option'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import './Dropdown.scss'
import { DropdownContext } from './DropdownContext'
import { Tag } from '../Tag/Tag'
import React from 'react'
import Input from '../Input/Input'
import { Checkbox } from '../Checkbox/Checkbox'

export type DropdownItemType = {
  id: string
  text: string
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
  avatar?: {
    src: string
    description?: string
  }
}

export type DropdownProps = {
  id: string
  items: DropdownItemType[]
  multiple?: boolean
  selected?: string | string[] | null
  onChange: (selected: string | string[] | null) => void
  onValueChange?: (value: string) => void // Функция обновления значения
}

export const Dropdown = ({
  items,
  multiple = false,
  selected = null,
  onChange,
  id,
  onValueChange,
}: DropdownProps) => {
  const { currentDropdownId, setCurrentDropdownId } =
    useContext(DropdownContext)
  const [currentSelected, setCurrentSelected] = useState<
    string | string[] | null
  >(selected) //для хранения выбранных элементов
  const [searchValue, setSearchValue] = useState('') // Состояние для поиска
  const [selectedItem, setSelectedItem] = useState<DropdownItemType | null>(
    null,
  ) // для хранения выбранного элемента при одиночном выборе

  const handleSelect = (id: string, selected: boolean) => {
    if (multiple) {
      let newSelected = Array.isArray(currentSelected)
        ? [...currentSelected]
        : []

      if (selected && !newSelected.includes(id)) {
        newSelected.push(id)
      } else if (!selected) {
        newSelected = newSelected.filter(key => key !== id)
      }

      setCurrentSelected(newSelected)
      onChange(newSelected)
      if (onValueChange) {
        const selectedText = items.find(item => item.id === id)?.text
        onValueChange(selectedText || '')
      }
    } else {
      setCurrentSelected(selected ? id : null)
      onChange(selected ? id : null)
      const selectedItem = items.find(item => item.id === id)
      setSelectedItem(selectedItem ?? null)
      setSearchValue(selectedItem?.text || '')
      onValueChange?.(selectedItem?.text || '')
      setCurrentDropdownId(null)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // Фильтрация элементов по поисковому запросу
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  )

  // Выбрать все элементы
  const handleSelectAll = () => {
    if (multiple) {
      const selectAll = items.map(item => item.id)
      setCurrentSelected(selectAll)
      onChange(selectAll)
    }
  }

  // Убрать выделение со всех элементов
  const handleDeselectAll = () => {
    if (multiple) {
      setCurrentSelected([])
      onChange([])
    }
  }

  // Обработка выбора всех элементов через Checkbox
  const handleCheckboxSelectAll = () => {
    if (
      Array.isArray(currentSelected) &&
      currentSelected.length === items.length
    ) {
      handleDeselectAll()
    } else {
      handleSelectAll()
    }
  }
  const handleOpenDropdown = () => {
    if (currentDropdownId === id) {
      setCurrentDropdownId(null)
    } else {
      setCurrentDropdownId(id)
    }
  }
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
    handleClearSelection()
  }

  const handleClearSelection = () => {
    setSelectedItem(null)
    setSearchValue('')
    handleOpenDropdown()
  }

  const renderInputValue = () => {
    if (selectedItem?.avatar) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OptionAvatar
            size="extraSmall"
            avatarSrc={selectedItem.avatar.src}
            description={selectedItem.avatar.description}
            text={selectedItem.text}
          />
        </div>
      )
    } else if (selectedItem?.iconBefore || selectedItem?.iconAfter) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {selectedItem.iconBefore && <Icon icon={selectedItem.iconBefore} />}
          <span style={{ marginLeft: '8px' }}>{selectedItem.text}</span>
          {selectedItem.iconAfter && <Icon icon={selectedItem.iconAfter} />}
        </div>
      )
    } else {
      return searchValue
    }
  }

  return (
    <div id={id} className="dropdown">
      {multiple && Array.isArray(currentSelected) && (
        <div className="selected-items">
          {currentSelected.map(id => {
            const item = items.find(i => i.id === id)
            return (
              <span key={id} className="selected-item">
                <Tag
                  key={id}
                  text={item?.text || ''}
                  avatarSrc={item?.avatar?.src}
                  description={item?.avatar?.description}
                  iconBefore={item?.iconBefore}
                  iconAfter={item?.iconAfter}
                  onRemove={() => handleSelect(id, false)}
                />
              </span>
            )
          })}
        </div>
      )}
      <Input
        placeholder="Поиск..."
        iconAfter="SEARCH"
        inputValue={renderInputValue()}
        onChange={handleSearchChange}
        onClick={handleInputClick}
        // onFocus={handleInputClick}
        onClearSelection={handleClearSelection}
        onOpenDropdown={handleOpenDropdown}
      />
      {currentDropdownId === id && (
        <div className="dropdown-menu">
          {multiple && (
            <Checkbox
              id="selectAll"
              label="Выбрать все"
              selected={
                Array.isArray(currentSelected) &&
                currentSelected.length === items.length
              }
              onSelect={handleCheckboxSelectAll}
            />
          )}
          {filteredItems.map(item => (
            <Option
              key={item.id}
              id={item.id}
              text={item.text}
              iconBefore={item.iconBefore}
              iconAfter={item.iconAfter}
              avatar={item.avatar}
              multiple={multiple}
              selected={
                multiple
                  ? Array.isArray(currentSelected) &&
                    currentSelected.includes(item.id)
                  : currentSelected === item.id
              }
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
