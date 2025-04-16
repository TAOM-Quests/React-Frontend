import { useCallback, useContext, useEffect, useRef, useState } from 'react'
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
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState<string | string[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<DropdownItemType | null>(
    null,
  ) // для хранения выбранного элемента при одиночном выборе
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsOpen(true)
    if (!multiple) {
      setSelected(null)
    }
  }

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleBlur = () => {
    setTimeout(() => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(document.activeElement) &&
        !document.activeElement?.closest(`[data-dropdown-id="${id}"]`)
      ) {
        setIsOpen(false)
      }
    }, 200)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSelect = useCallback(
    (itemId: string) => {
      if (multiple) {
        setSelected(prevSelected => {
          if (Array.isArray(prevSelected)) {
            return prevSelected.includes(itemId)
              ? prevSelected.filter(id => id !== itemId)
              : [...prevSelected, itemId]
          }
          return [itemId]
        })
        focusInput()
      } else {
        const selectedItem = items.find(item => item.id === itemId)
        setSelected(itemId)
        setSelectedItem(selectedItem ?? null)
        setSearchValue(selectedItem?.text || '')
        setIsOpen(false)
      }
    },
    [items, multiple, setIsOpen],
  )

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

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
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, setIsOpen])

  const renderInputValue = () => {
    if (selectedItem?.avatar) {
      return (
        <OptionAvatar
          size="extraSmall"
          avatarSrc={selectedItem.avatar.src}
          description={selectedItem.avatar.description}
          text={selectedItem.text}
        />
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
  const handleCheckboxSelectAll = useCallback(() => {
    if (Array.isArray(selected) && selected.length === items.length) {
      handleDeselectAll()
    } else {
      handleSelectAll()
    }
  }, [items, selected])
  // Выбрать все элементы
  const handleSelectAll = useCallback(() => {
    if (multiple) {
      const selectAll = items.map(item => item.id)
      setSelected(selectAll)
      onChange(selectAll)
      focusInput()
    }
  }, [items, multiple, onChange])

  // Убрать выделение со всех элементов
  const handleDeselectAll = useCallback(() => {
    if (multiple) {
      setSelected([])
      onChange([])
      focusInput()
    }
  }, [multiple, onChange])

  const handleClearSelection = () => {
    setSelectedItem(null)
    setSearchValue('')
  }

  return (
    <div ref={dropdownRef} data-dropdown-id={id} className="dropdown-container">
      {multiple && Array.isArray(selected) && (
        <div className="selected-items">
          {selected.map(itemId => {
            const item = items.find(item => item.id === itemId)
            return (
              <span key={itemId} className="selected-item">
                <Tag
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
        ref={inputRef}
        type="search"
        placeholder="Поиск..."
        iconAfter={isOpen ? 'ANGLE_UP' : 'ANGLE_DOWN'}
        inputValue={renderInputValue()}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
