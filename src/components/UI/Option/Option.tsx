import { Icon } from '../Icon/Icon'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import { Checkbox } from '../Checkbox/Checkbox'
import './Option.scss'

export type OptionType = {
  id: string
  text: string
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
  avatar?: {
    src: string
    description?: string
  }
  multiple?: boolean
  selected?: boolean
  onSelect: (id: string, selected: boolean) => void
}

export const Option = ({
  id,
  text,
  iconBefore,
  iconAfter,
  avatar,
  multiple = false,
  selected = false,
  onSelect,
}: OptionType) => {
  // Обработчик клика на опцию
  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    onSelect(id, !selected)
  }

  // Обработчик клика на чекбокс
  const handleCheckboxSelect = (id: string) => {
    onSelect(id, !selected)
  }

  const renderContent = () => {
    if (avatar) {
      return (
        <OptionAvatar
          size="extraSmall"
          avatarSrc={avatar.src}
          text={text}
          description={avatar.description}
        />
      )
    } else {
      return (
        <>
          {iconBefore && <Icon icon={iconBefore} />}
          <p className="body-m-r option-item__text">{text}</p>
          {iconAfter && <Icon icon={iconAfter} />}
        </>
      )
    }
  }

  return (
    <li
      key={id}
      className={classNames('option-item', { 'item-selected': selected })}
      onClick={handleOptionClick}
    >
      {multiple ? (
        <Checkbox
          id={id}
          label={renderContent()}
          selected={selected}
          onSelect={handleCheckboxSelect}
        />
      ) : (
        renderContent()
      )}
    </li>
  )
}
