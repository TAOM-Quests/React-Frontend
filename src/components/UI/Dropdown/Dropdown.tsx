import { useContext, useEffect, useRef, useState } from 'react'
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
  onChange: (selected: string | string[] | null) => void
}

export const Dropdown = ({
  id,
  items,
  multiple = false,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState<string | string[] | null>(null)

  const [selectedItem, setSelectedItem] = useState<DropdownItemType | null>(
    null,
  ) // для хранения выбранного элемента при одиночном выборе

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleFocus = () => {
    setInputFocus(true)
    setIsOpen(true)
    if (!multiple) {
      setSelected(null)
    }
  }

  const handleBlur = () => {
    if (!multiple) {
      setTimeout(() => {
        if (!document.activeElement?.classList.contains('dropdown-item')) {
          setInputFocus(false)
          setIsOpen(false)
        }
      }, 200) // Задержка для обработки клика на элементе списка
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSelect = (itemId: string) => {
    if (multiple) {
      if (Array.isArray(selected)) {
        const isSelected = selected.includes(itemId)
        if (isSelected) {
          setSelected(selected.filter(id => id !== itemId))
        } else {
          setSelected([...selected, itemId])
        }
      } else {
        setSelected([itemId])
      }
    } else {
      setSelected(itemId)
      if (!multiple) {
        const selectedItem = items.find(item => item.id === itemId)
        setSelectedItem(selectedItem ?? null)
        setSearchValue(selectedItem?.text || '')
      }
    }
    onChange(selected)
  }

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setInputFocus(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

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

  // Обработка выбора всех элементов через Checkbox
  const handleCheckboxSelectAll = () => {
    if (Array.isArray(selected) && selected.length === items.length) {
      handleDeselectAll()
    } else {
      handleSelectAll()
    }
  }

  // Выбрать все элементы
  const handleSelectAll = () => {
    if (multiple) {
      const selectAll = items.map(item => item.id)
      setSelected(selectAll)
      onChange(selectAll)
    }
  }

  // Убрать выделение со всех элементов
  const handleDeselectAll = () => {
    if (multiple) {
      setSelected([])
      onChange([])
    }
  }

  const handleClearSelection = () => {
    setSelectedItem(null)
    setSearchValue('')
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
    // handleClearSelection()
    setSelectedItem(null)
  }

  return (
    <div ref={dropdownRef} className="dropdown-container">
      {multiple && Array.isArray(selected) && (
        <div className="selected-items">
          {selected.map(itemId => {
            const item = items.find(item => item.id === itemId)
            return (
              <span key={itemId} className="selected-item">
                <Tag
                  // key={itemId}
                  text={item?.text || ''}
                  avatarSrc={item?.avatar?.src}
                  description={item?.avatar?.description}
                  iconBefore={item?.iconBefore}
                  iconAfter={item?.iconAfter}
                  onRemove={() => handleSelect(itemId)}
                />
              </span>
            )
          })}
        </div>
      )}
      <Input
        type="search"
        placeholder="Поиск..."
        iconAfter="SEARCH"
        inputValue={renderInputValue()}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleInputClick}
        onClearSelection={handleClearSelection}
      />

      {isOpen && (
        <div className="dropdown-menu">
          {multiple && (
            <Checkbox
              id="selectAll"
              className="dropdown-checkbox"
              label="Выбрать все"
              selected={
                Array.isArray(selected) && selected.length === items.length
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
                  ? Array.isArray(selected) && selected.includes(item.id)
                  : selected === item.id
              }
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
