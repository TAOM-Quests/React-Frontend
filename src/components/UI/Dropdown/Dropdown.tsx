import { useContext, useState } from 'react'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import { Option } from '../Option/Option'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import './Dropdown.scss'
import { DropdownContext } from './DropdownContext'

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
  items: DropdownItemType[]
  multiple?: boolean
  selected?: string | string[]
  onChange: (selected: string | string[]) => void
  id: string
}

export const Dropdown = ({
  items,
  multiple = false,
  selected,
  onChange,
  id,
}: DropdownProps) => {
  const { isOpen, setIsOpen, currentDropdownId, setCurrentDropdownId } =
    useContext(DropdownContext)

  const [currentSelected, setCurrentSelected] = useState(selected)

  const handleSelect = (id: string) => {
    if (multiple) {
      const newSelected = Array.isArray(currentSelected)
        ? [...currentSelected]
        : []

      if (newSelected.includes(id)) {
        newSelected.splice(newSelected.indexOf(id), 1)
      } else {
        newSelected.push(id)
      }

      setCurrentSelected(newSelected)
      onChange(newSelected)
    } else {
      setCurrentSelected(id)
      onChange(id)
    }
  }

  const handleToggle = () => {
    if (currentDropdownId === id) {
      setIsOpen(false, null)
      setCurrentDropdownId(null)
    } else {
      setIsOpen(true, id)
      setCurrentDropdownId(id)
    }
  }

  const handleItemClick = (id: string) => {
    handleSelect(id)
  }

  return (
    <div id={id} className="dropdown">
      {multiple && Array.isArray(currentSelected) && (
        <div className="selected-items">
          {currentSelected.map(id => {
            const item = items.find(i => i.id === id)
            return (
              <span key={id} className="selected-item">
                {item?.avatar ? (
                  <OptionAvatar
                    avatarSrc={item.avatar.src}
                    text={item.text}
                    description={item.avatar.description}
                  />
                ) : (
                  <span>
                    {item?.iconBefore && (
                      <Icon icon={item.iconBefore} size="16px" />
                    )}
                    {item?.text}
                    {item?.iconAfter && (
                      <Icon icon={item.iconAfter} size="16px" />
                    )}
                  </span>
                )}
              </span>
            )
          })}
        </div>
      )}
      <Button
        text={Array.isArray(currentSelected) ? 'Выбрано' : currentSelected}
        iconAfter="CHECK"
        onClick={e => {
          e.stopPropagation()
          handleToggle()
        }}
      />
      {currentDropdownId === id && (
        <ul className="dropdown-menu">
          {items.map(item => (
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
        </ul>
      )}
    </div>
  )
}
