import React, {
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
  ReactElement,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react'
import { Option, OptionProps } from '../UI/Option/Option'
import './ContextMenu.scss'
import { Button } from '../UI/Button/Button'
import { ContainerBox } from '../ContainerBox/ContainerBox'

interface ContextMenuProps extends HTMLAttributes<HTMLUListElement> {
  options: OptionProps[]
  children?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
  selectedId?: number | null
  isVisible?: boolean
  onToggle?: () => void
}

export const ContextMenu = ({
  options,
  selectedId,
  children,
  isVisible = false,
  onToggle,
  className,
  ...props
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onToggle && onToggle()
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggle && onToggle()
      }
    }

    if (isVisible) {
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
  }, [isVisible, onToggle])

  const handleOpenMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggle && onToggle()
  }

  const trigger = isValidElement(children) ? (
    cloneElement(children, { onClick: handleOpenMenu })
  ) : (
    <Button isIconOnly={true} iconBefore="MENU_DOTS" onClick={handleOpenMenu} />
  )

  return (
    <>
      {trigger}

      {isVisible && (
        <ul className={`context-menu ${className}`} ref={menuRef} {...props}>
          <ContainerBox className="context-menu__box">
            {options.map(option => (
              <Option
                key={option.id}
                {...option}
                isMultiple={false}
                isSelected={option.id === selectedId}
                onSelect={(id, selected) => {
                  option.onSelect?.(id, selected)
                }}
              />
            ))}
          </ContainerBox>
        </ul>
      )}
    </>
  )
}
