import { Icon } from '../Icon/Icon'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'

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
  onSelect: (id: string) => void
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
  return (
    <li
      key={id}
      className={classNames({
        'item-selected': selected,
      })}
      onClick={e => {
        e.stopPropagation()
        onSelect(id)
      }}
    >
      {multiple && (
        <input
          type="checkbox"
          checked={selected}
          onChange={e => {
            e.stopPropagation()
            onSelect(id)
          }}
        />
      )}
      {avatar ? (
        <OptionAvatar
          avatarSrc={avatar.src}
          text={text}
          description={avatar.description}
        />
      ) : (
        <span>
          {iconBefore && <Icon icon={iconBefore} />}
          {text}
          {iconAfter && <Icon icon={iconAfter} />}
        </span>
      )}
    </li>
  )
}
