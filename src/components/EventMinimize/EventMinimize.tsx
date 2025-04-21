import { useNavigate } from 'react-router'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import { Icon } from '../UI/Icon/Icon'
import moment from 'moment'
import './EventMinimize.scss'
import { Badge } from '../UI/Badge/Badge'

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Черновик':
        return 'neutral'
      case 'Утверждено':
        return 'success'
      case 'Отклонено':
        return 'critical'
      case 'На утверждении':
        return 'caution'
      case 'В работе':
        return 'info'
      case 'Архив':
        return 'neutral'
    }
  }

  return (
    <ContainerBox
      onClick={() => navigate(`/events/${id}`)}
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
              <Icon colorIcon="primary" icon="MENU_DOTS" />
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
