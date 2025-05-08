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
  isUserAdded?: boolean
  iconAfter?: keyof typeof ICON_MAP
  iconBefore?: keyof typeof ICON_MAP
}

export interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  items: DropdownItemType[]
  label?: string
  errorText?: string
  helperText?: string
  isMultiple?: boolean
  selectedItems?: DropdownItemType[]
  isAllowAddNewItem?: boolean
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
  selectedItems: selectedItemsProp,
  isAllowAddNewItem = false,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(
    !isMultiple && selectedItemsProp?.length
      ? (items.find(item => item.id === selectedItemsProp[0].id)?.text ?? '')
      : '',
  )
  const [selectedItems, setSelectedItems] = useState<DropdownItemType[]>(
    selectedItemsProp ?? [],
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
    const newText = searchValue.trim()
    const newItem: DropdownItemType = {
      id: Date.now(),
      text: newText,
      isUserAdded: true,
    }

    if (onChangeDropdown) {
      onChangeDropdown([...selectedItems, newItem])
    }

    setSelectedItems(prev => [...prev, newItem])
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
    (selectedItem: DropdownItemType, isRemoveAction = false) => {
      if (isMultiple) {
        setSelectedItems(prev => {
          const isSelected = prev.map(item => item.id).includes(selectedItem.id)
          let newSelected: DropdownItemType[]
          if (isSelected) {
            newSelected = prev.filter(item => item.id !== selectedItem.id)
          } else {
            newSelected = [...prev, selectedItem]
          }
          onChangeDropdown?.(newSelected.length > 0 ? newSelected : null)
          if (!isRemoveAction) focusInput()
          return newSelected
        })
      } else {
        setSelectedItems([selectedItem])
        onChangeDropdown?.(selectedItem)
        setSearchValue(selectedItem.text ?? '')
        setIsOpen(false)
      }
    },
    [isMultiple, items, onChangeDropdown],
  )

  const handleClearSelection = () => {
    if (isMultiple) {
      setSelectedItems([])
      setSearchValue('')
      onChangeDropdown?.(null)
    } else {
      setSelectedItems([])
      setSearchValue('')
      onChangeDropdown?.(null)
    }
  }

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const renderInputValue = () => {
    if (isMultiple) return searchValue
    const selectedItem = selectedItems[0]
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
    if (setSelectedItems.length === items.length) {
      setSelectedItems(selectedItems.filter(item => !item.isUserAdded))
      onChangeDropdown?.(null)
    } else {
      setSelectedItems(
        items.concat(selectedItems.filter(item => item.isUserAdded)),
      )
      onChangeDropdown?.(items)
      focusInput()
    }
  }

  return (
    <div ref={dropdownRef} data-dropdown-id={id} className="dropdown-container">
      {isMultiple && setSelectedItems.length > 0 && (
        <div className="selected-items">
          {selectedItems.map(item => {
            if (!item) return null
            return (
              <span key={item.id} className="selected-item">
                <Tag
                  text={item.text}
                  avatarSrc={item.avatar?.src}
                  description={item.avatar?.description}
                  iconBefore={item.iconBefore}
                  iconAfter={item.iconAfter}
                  onRemove={() => handleSelect(item, true)}
                />
              </span>
            )
          })}
        </div>
      )}
      <div className={`${showAddButton ? 'input-showAddButton' : ''} `}>
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
                setSelectedItems.length === items.length && items.length > 0
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
                  ? selectedItems.map(item => item.id).includes(item.id)
                  : selectedItems[0].id === item.id
              }
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
