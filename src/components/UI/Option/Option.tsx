import { Icon } from '../Icon/Icon'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import { Checkbox } from '../Checkbox/Checkbox'
import './Option.scss'

export type OptionType = {
  id: number
  text: string
  onSelect: (id: number, selected: boolean) => void
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
}: OptionType) => {
  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    onSelect(id, !isSelected)
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
          onChange={() => onSelect(id, !isSelected)}
        />
      ) : (
        renderContent()
      )}
    </li>
  )
}
