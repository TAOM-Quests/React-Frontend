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
import Input from '../Input/Input'
import { Checkbox } from '../Checkbox/Checkbox'
import { generateRandomElementId } from '../../../funcs/generateRandomElementId'
import './Dropdown.scss'
import { Button } from '../Button/Button'

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
  label?: string
  errorText?: string
  helperText?: string
  isMultiple?: boolean
  selectedIds?: number[]
  isAllowAddNewItem?: boolean
  onAddNewItem?: (text: string) => void
  onChangeDropdown?: (
    selectedItem: DropdownItemType | DropdownItemType[] | null,
  ) => void
}

export const Dropdown = ({
  items,
  label,
  onChangeDropdown,
  id = generateRandomElementId('dropdown'),
  isMultiple = false,
  disabled,
  placeholder,
  helperText,
  errorText,
  selectedIds: selectedIdsProp,
  isAllowAddNewItem = false,
  onAddNewItem,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(
    !isMultiple && selectedIdsProp
      ? (items.find(item => item.id === selectedIdsProp[0])?.text ?? '')
      : '',
  )
  const [selectedIds, setSelectedIds] = useState<number[]>(
    selectedIdsProp ?? [],
  )

  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const showAddButton =
    isAllowAddNewItem &&
    searchValue.trim() !== '' &&
    !items.some(
      item => item.text.toLowerCase() === searchValue.trim().toLowerCase(),
    )
  const handleAddNewItem = () => {
    if (!onAddNewItem) return
    const newText = searchValue.trim()
    onAddNewItem(newText)
    setSearchValue('')
    setIsOpen(false)
  }

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleFocus = () => {
    setIsOpen(true)
    if (!isMultiple) {
      setSearchValue('')
    }
  }

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
  }, [])

  const handleSelect = useCallback(
    (itemId: number, isRemoveAction = false) => {
      if (isMultiple) {
        setSelectedIds(prev => {
          const isSelected = prev.includes(itemId)
          let newSelected: number[]
          if (isSelected) {
            newSelected = prev.filter(id => id !== itemId)
          } else {
            newSelected = [...prev, itemId]
          }
          onChangeDropdown?.(
            newSelected.length > 0
              ? items.filter(item => newSelected.includes(item.id))
              : null,
          )
          if (!isRemoveAction) focusInput()
          return newSelected
        })
      } else {
        setSelectedIds([itemId])
        const selectedItem = items.find(item => item.id === itemId) ?? null
        onChangeDropdown?.(selectedItem)
        setSearchValue(selectedItem?.text ?? '')
        setIsOpen(false)
      }
    },
    [isMultiple, items, onChangeDropdown],
  )

  const handleClearSelection = () => {
    if (isMultiple) {
      setSelectedIds([])
      onChangeDropdown?.(null)
    } else {
      setSelectedIds([])
      setSearchValue('')
      onChangeDropdown?.(null)
    }
  }

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const renderInputValue = () => {
    if (isMultiple) return searchValue
    const selectedId = selectedIds[0]
    const selectedItem = items.find(item => item.id === selectedId)
    if (!selectedItem) return searchValue
    if (selectedItem.avatar) {
      return (
        <OptionAvatar
          size="extraSmall"
          avatarSrc={selectedItem.avatar.src}
          description={selectedItem.avatar.description}
          text={selectedItem.text}
        />
      )
    }
    if (selectedItem.iconBefore || selectedItem.iconAfter) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {selectedItem.iconBefore && <Icon icon={selectedItem.iconBefore} />}
          <span style={{ marginLeft: '8px' }}>{selectedItem.text}</span>
          {selectedItem.iconAfter && <Icon icon={selectedItem.iconAfter} />}
        </div>
      )
    }
    return selectedItem.text
  }

  const handleCheckboxSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([])
      onChangeDropdown?.(null)
    } else {
      setSelectedIds(items.map(item => item.id))
      onChangeDropdown?.(items)
      focusInput()
    }
  }

  return (
    <div ref={dropdownRef} data-dropdown-id={id} className="dropdown-container">
      {isMultiple && selectedIds.length > 0 && (
        <div className="selected-items">
          {selectedIds.map(itemId => {
            const item = items.find(item => item.id === itemId)
            if (!item) return null
            return (
              <span key={itemId} className="selected-item">
                <Tag
                  text={item.text}
                  avatarSrc={item.avatar?.src}
                  description={item.avatar?.description}
                  iconBefore={item.iconBefore}
                  iconAfter={item.iconAfter}
                  onRemove={() => handleSelect(itemId, true)}
                />
              </span>
            )
          })}
        </div>
      )}
      <div className="input-showAddButton">
        <Input
          ref={inputRef}
          label={label}
          type="text"
          iconAfter={isOpen ? 'ANGLE_UP' : 'ANGLE_DOWN'}
          onClickIconAfter={disabled ? undefined : () => setIsOpen(!isOpen)}
          value={renderInputValue()}
          onChange={e => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => {
            setTimeout(() => {
              if (
                dropdownRef.current &&
                !dropdownRef.current.contains(document.activeElement) &&
                !document.activeElement?.closest(`[data-dropdown-id="${id}"]`)
              ) {
                setIsOpen(false)
              }
            }, 200)
          }}
          disabled={disabled}
          placeholder={placeholder}
          helperText={helperText}
          errorText={errorText}
          onClearSelection={handleClearSelection}
          {...props}
        />
        {showAddButton && (
          <Button
            colorType="secondary"
            text="Добавить"
            iconBefore="ADD"
            onClick={handleAddNewItem}
          />
        )}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {isMultiple && (
            <Checkbox
              id="selectAll"
              className="dropdown-checkbox"
              label="Выбрать все"
              isSelected={
                selectedIds.length === items.length && items.length > 0
              }
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
                  ? selectedIds.includes(item.id)
                  : selectedIds[0] === item.id
              }
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
