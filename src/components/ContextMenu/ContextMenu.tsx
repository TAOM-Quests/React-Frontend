import React, {
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement,
  ReactElement,
  ButtonHTMLAttributes,
} from 'react'
import { Option, OptionProps } from '../UI/Option/Option'
import './ContextMenu.scss'
import { Button } from '../UI/Button/Button'
import { ContainerBox } from '../ContainerBox/ContainerBox'

interface ContextMenuProps {
  options: OptionProps[]
  selectedId?: number | null
  children?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
}

export const ContextMenu = ({
  options,
  selectedId,
  children,
}: ContextMenuProps) => {
  const [visible, setVisible] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)

  const handleOpenMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible(visible => !visible)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false)
      }
    }

    if (visible) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEsc)
    } else {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [visible])

  const trigger = isValidElement(children) ? (
    cloneElement(children, { onClick: handleOpenMenu })
  ) : (
    <Button isIconOnly={true} iconBefore="MENU_DOTS" onClick={handleOpenMenu} />
  )

  return (
    <>
      {trigger}

      {visible && (
        <ul className="context-menu" ref={menuRef}>
          <ContainerBox className="context-menu__box">
            {options.map(option => (
              <Option
                key={option.id}
                {...option}
                isMultiple={false}
                isSelected={option.id === selectedId}
                onSelect={(id, selected) => {
                  option.onSelect?.(id, selected)
                  setVisible(false)
                }}
              />
            ))}
          </ContainerBox>
        </ul>
      )}
    </>
  )
}
