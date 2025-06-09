import { Icon } from '../Icon/Icon'
import { UserAvatarInfo } from '../../User/UserAvatarInfo/UserAvatarInfo'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import { Checkbox } from '../Checkbox/Checkbox'
import './Option.scss'

export interface OptionProps {
  text: string
  onSelect?: (id: number, selected: boolean) => void
  id?: number
  avatar?: {
    src: string
    description?: string
  }
  className?: string
  iconAfter?: keyof typeof ICON_MAP
  isMultiple?: boolean
  isSelected?: boolean
  iconBefore?: keyof typeof ICON_MAP
}

export const Option = ({
  id,
  text,
  iconBefore,
  iconAfter,
  avatar,
  isMultiple = false,
  isSelected = false,
  onSelect,
  className,
}: OptionProps) => {
  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    if (!isMultiple) {
      onSelect?.(id ?? 0, !isSelected)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onSelect?.(id ?? 0, !isSelected)
  }

  const renderContent = () => {
    if (avatar) {
      return (
        <UserAvatarInfo
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
          <p className="text_ellipsis body_m_r option_item__text">{text}</p>
          {iconAfter && <Icon icon={iconAfter} />}
        </>
      )
    }
  }

  return (
    <li
      key={id}
      className={classNames(
        'option_item',
        { item_selected: isSelected },
        className,
      )}
      onClick={handleOptionClick}
    >
      {isMultiple ? (
        <Checkbox
          label={renderContent()}
          isSelected={isSelected}
          onChange={handleCheckboxChange}
        />
      ) : (
        renderContent()
      )}
    </li>
  )
}
