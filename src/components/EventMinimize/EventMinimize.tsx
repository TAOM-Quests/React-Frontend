import { useNavigate } from 'react-router'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import { Icon } from '../UI/Icon/Icon'
import moment from 'moment'
import './EventMinimize.scss'
import { Badge, TypeBadge } from '../UI/Badge/Badge'
import { OptionProps } from '../UI/Option/Option'
import { ContextMenu } from '../ContextMenu/ContextMenu'

export interface EventMinimizeProps {
  id: number
  date: Date | null
  name: string
  type: string
  status: string
  address: string
  platform: string
  imageUrl: string
  isEmployeeView?: boolean
}

export default function EventMinimize({
  id,
  date,
  name,
  type,
  status,
  address,
  platform,
  imageUrl,
  isEmployeeView,
}: EventMinimizeProps) {
  const navigate = useNavigate()

  const eventOptionsContextMenu: OptionProps[] = [
    {
      id: 1,
      text: 'Редактировать',
      onSelect: () => {
        navigate(`/event/${id}/edit`)
      },
    },
    {
      id: 2,
      text: 'Удалить',
      onSelect: () => {
        alert(`Удалить событие с id ${id}`)
      },
    },
  ]

  const statusColor: { [key: string]: TypeBadge } = {
    Черновик: 'neutral',
    Утверждено: 'success',
    Отклонено: 'critical',
    'На утверждении': 'caution',
    'В работе': 'info',
    Архив: 'neutral',
  }

  const getStatusColor = (status: string): TypeBadge => {
    return statusColor[status] ?? 'neutral'
  }

  return (
    <ContainerBox
      onClick={() => navigate(`/event/${id}`)}
      className="eventMinimize"
    >
      <div className="eventMinimize__image-wrapper">
        <img className="eventMinimize__image" src={imageUrl} alt={name} />
        <div className="eventMinimize__overlay"></div>
      </div>

      <div className="eventMinimize__header">
        <div className="eventMinimize__header--right">
          {isEmployeeView && (
            <>
              <Badge type={getStatusColor(status)} text={status} />
              <ContextMenu options={eventOptionsContextMenu}>
                <Icon colorIcon="primary" icon="MENU_DOTS" />
              </ContextMenu>
            </>
          )}
        </div>
      </div>
      <p className="body_xl_sb eventMinimize__name">{name}</p>
      <div className="eventMinimize__info">
        <div className="eventMinimize__date">
          <Icon colorIcon="soft-blue" icon="CALENDAR" />
          <p className="body_l_m text_ellipsis">
            {date ? moment.utc(date).format('D MMMM HH:mm') : ''}
          </p>
        </div>
        {address && (
          <div className="eventMinimize__address">
            <Icon colorIcon="soft-blue" icon="MARKER_MAP" />
            <p className="body_l_m text_ellipsis eventMinimize__address">
              {address}
            </p>
          </div>
        )}
        {platform && (
          <div className="eventMinimize__onlineMeeting">
            <Icon colorIcon="soft-blue" icon="PLATFORM" />
            <p className="body_l_m text_ellipsis">{platform}</p>
          </div>
        )}
        {type && (
          <div className="eventMinimize__type">
            <Icon colorIcon="soft-blue" icon="GRADUATION_CAP" />
            <p className="body_l_m text_ellipsis">{type}</p>
          </div>
        )}
      </div>
    </ContainerBox>
  )
}
