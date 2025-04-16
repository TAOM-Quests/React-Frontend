import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Icon } from '../Icon/Icon'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import { Option } from '../Option/Option'
import { ICON_MAP } from '../../../assets/icons'
import { Tag } from '../Tag/Tag'
import React from 'react'
import Input from '../Input/Input'
import { Checkbox } from '../Checkbox/Checkbox'
import { generateRandomElementId } from '../../../funcs/generateRandomElementId'
import './Dropdown.scss'

export interface DropdownItemType {
  id: number
  text: string
  avatar?: {
    src: string
    description?: string
  }
  iconAfter?: keyof typeof ICON_MAP
  iconBefore?: keyof typeof ICON_MAP
}

export interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  items: DropdownItemType[]
  onChangeDropdown: (selected: number | number[] | null) => void
  id?: string
  isMultiple?: boolean
}

export const Dropdown = ({
  items,
  onChangeDropdown,
  id = generateRandomElementId('dropdown'),
  isMultiple = false,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const [singleSelectedItem, setSingleSelectedItem] =
    useState<DropdownItemType | null>(null)

  const [singleSelectedId, setSingleSelectedId] = useState<number | null>(null)
  const [multipleSelectedIds, setMultipleSelectedIds] = useState<number[]>([])

  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsOpen(true)
    if (!isMultiple) {
      setSingleSelectedId(null)
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

  const toggleMultipleSelection = (itemId: number) => {
    setMultipleSelectedIds(prevSelected => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter(id => id !== itemId)
      } else {
        return [...prevSelected, itemId]
      }
    })
  }

  const handleSelect = useCallback(
    (itemId: number, isRemoveAction = false) => {
      if (isMultiple) {
        toggleMultipleSelection(itemId)
        if (!isRemoveAction) {
          focusInput()
        }
      } else {
        const selectedItem = items.find(item => item.id === itemId)
        setSingleSelectedId(itemId)
        setSingleSelectedItem(selectedItem ?? null)
        setSearchValue(selectedItem?.text || '')
        setIsOpen(false)
      }
    },
    [items, isMultiple, setIsOpen],
  )

  useEffect(() => {
    if (isMultiple) {
      onChangeDropdown(
        multipleSelectedIds.length > 0 ? multipleSelectedIds : null,
      )
    } else {
      onChangeDropdown(singleSelectedId)
    }
  }, [singleSelectedId, multipleSelectedIds, isMultiple])

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
    if (singleSelectedItem?.avatar) {
      return (
        <OptionAvatar
          size="extraSmall"
          avatarSrc={singleSelectedItem.avatar.src}
          description={singleSelectedItem.avatar.description}
          text={singleSelectedItem.text}
        />
      )
    } else if (
      singleSelectedItem?.iconBefore ||
      singleSelectedItem?.iconAfter
    ) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {singleSelectedItem.iconBefore && (
            <Icon icon={singleSelectedItem.iconBefore} />
          )}
          <span style={{ marginLeft: '8px' }}>{singleSelectedItem.text}</span>
          {singleSelectedItem.iconAfter && (
            <Icon icon={singleSelectedItem.iconAfter} />
          )}
        </div>
      )
    } else {
      return searchValue
    }
  }

  // Обработка выбора всех элементов через Checkbox
  const handleCheckboxSelectAll = useCallback(() => {
    if (multipleSelectedIds.length === items.length) {
      handleDeselectAll()
    } else {
      handleSelectAll()
    }
  }, [items, multipleSelectedIds])
  // Выбрать все элементы
  const handleSelectAll = useCallback(() => {
    const selectAll = items.map(item => item.id)
    setMultipleSelectedIds(selectAll)
    focusInput()
  }, [items, isMultiple])

  // Убрать выделение со всех элементов
  const handleDeselectAll = useCallback(() => {
    setMultipleSelectedIds([])
    focusInput()
  }, [isMultiple])

  const handleClearSelection = () => {
    setSingleSelectedItem(null)
    setSearchValue('')
  }

  return (
    <div ref={dropdownRef} data-dropdown-id={id} className="dropdown-container">
      {isMultiple && (
        <div className="selected-items">
          {multipleSelectedIds.map(itemId => {
            const item = items.find(item => item.id === itemId)
            return (
              <span key={itemId} className="selected-item">
                <Tag
                  text={item?.text || ''}
                  avatarSrc={item?.avatar?.src}
                  description={item?.avatar?.description}
                  iconBefore={item?.iconBefore}
                  iconAfter={item?.iconAfter}
                  onRemove={() => handleSelect(itemId, true)}
                />
              </span>
            )
          })}
        </div>
      )}
      <Input
        ref={inputRef}
        type="text"
        iconAfter={isOpen ? 'ANGLE_UP' : 'ANGLE_DOWN'}
        valueInput={renderInputValue()}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClearSelection={handleClearSelection}
        {...props}
      />

      {isOpen && (
        <div className="dropdown-menu">
          {isMultiple && (
            <Checkbox
              id="selectAll"
              className="dropdown-checkbox"
              label="Выбрать все"
              isSelected={multipleSelectedIds.length === items.length}
              onChange={handleCheckboxSelectAll}
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
              isMultiple={isMultiple}
              isSelected={
                isMultiple
                  ? multipleSelectedIds.includes(item.id)
                  : singleSelectedId === item.id
              }
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
