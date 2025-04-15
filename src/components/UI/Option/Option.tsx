import { Icon } from '../Icon/Icon'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import { Checkbox } from '../Checkbox/Checkbox'
import './Option.scss'

export type OptionType = {
  id: number
  text: string
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
  avatar?: {
    src: string
    description?: string
  }
  multiple?: boolean
  selected?: boolean
  onSelect: (id: number, selected: boolean) => void
  className?: string
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
  className,
}: OptionType) => {
  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
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
        { item_selected: selected },
        className,
      )}
      onClick={handleOptionClick}
    >
      {multiple ? (
        <Checkbox
          label={renderContent()}
          selected={selected}
          onChange={() => onSelect(id, !selected)}
        />
      ) : (
        renderContent()
      )}
    </li>
  )
}
