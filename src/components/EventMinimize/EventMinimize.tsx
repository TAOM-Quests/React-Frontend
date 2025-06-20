import { useNavigate } from 'react-router'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import { Icon } from '../UI/Icon/Icon'
import moment from 'moment'
import './EventMinimize.scss'
import { Badge, TypeBadge } from '../UI/Badge/Badge'
import { OptionProps } from '../UI/Option/Option'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import { useState } from 'react'
import { events } from '../../services/api/eventModule/events/events'
import { Button } from '../UI/Button/Button'
import { selectAuth } from '../../redux/auth/authSlice'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { getTwoShortestTags } from '../../utils/getTwoShortestTags'
import { Tag } from '../UI/Tag/Tag'
import { EventStatus } from '../../models/eventStatus'

const STATUS_ID_ON_INSPECTION = 3
const STATUS_ID_DONE = 5
const STATUS_ID_ARCHIVE = 6

export interface EventMinimizeProps {
  id: number
  name: string
  type: string
  tags: string[]
  address: string
  platform: string
  imageUrl: string
  date: Date | null
  status: EventStatus
  departmentName: string
  onDelete?: () => void
  isEmployeeView?: boolean
  isInspectorView?: boolean
  participantsCount?: number
}

export const EventMinimize = ({
  id,
  date,
  name,
  type,
  tags,
  status,
  address,
  platform,
  imageUrl,
  onDelete,
  departmentName,
  isEmployeeView,
  isInspectorView,
  participantsCount,
}: EventMinimizeProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  const shortestTags = tags ? getTwoShortestTags(tags) : []

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
      text: 'Посмотреть статистику',
      onSelect: () => {
        navigate(`/event/${id}/statistic`)
      },
    },
    {
      id: 3,
      text: 'Перейти',
      onSelect: () => {
        navigate(`/event/${id}`)
      },
    },
    {
      id: 4,
      text: 'Удалить',
      onSelect: async () => {
        await events.delete(id)
        onDelete?.()
      },
    },
  ]

  const statusColor: { [key: string]: TypeBadge } = {
    1: 'neutral',
    2: 'success',
    3: 'critical',
    4: 'caution',
    5: 'info',
    6: 'neutral',
  }

  const getStatusColor = (status: number): TypeBadge => {
    return statusColor[status] ?? 'neutral'
  }

  const toggleMenu = () => {
    if (openMenuId === id) {
      setOpenMenuId(null)
    } else {
      setOpenMenuId(id)
    }
  }

  const inspectorHandler = async () => {
    if (!user) return

    await events.update(id, {
      inspectorId: user.id,
      statusId: STATUS_ID_ON_INSPECTION,
    })
    navigate(`/event/${id}/edit`)
  }

  const clickHandler = () => {
    if (user?.isEmployee) {
      if ([STATUS_ID_DONE, STATUS_ID_ARCHIVE].includes(status.id)) {
        navigate(`/event/${id}/statistic`)
      } else {
        navigate(`/event/${id}/edit`)
      }
    } else {
      navigate(`/event/${id}`)
    }
  }

  return (
    <ContainerBox
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={clickHandler}
      className="eventMinimize"
    >
      <div className="eventMinimize__image-wrapper">
        <div className="eventMinimize__overlay"></div>
      </div>

      <div className="eventMinimize__header">
        <div className="eventMinimize__header--left">
          <div className="eventMinimize__tags">
            <div className="eventMinimize__header--tags">
              {shortestTags.map((tag, index) => (
                <Tag key={index} text={tag} type="secondary" size="small" />
              ))}
            </div>
          </div>
        </div>
        <div className="eventMinimize__header--right">
          {isEmployeeView && (
            <>
              <Badge type={getStatusColor(status.id)} text={status.name} />
              <div className="eventMinimize__menu">
                <ContextMenu
                  isVisible={openMenuId === id}
                  onToggle={toggleMenu}
                  options={eventOptionsContextMenu}
                >
                  <Icon colorIcon="primary" icon="MENU_DOTS" />
                </ContextMenu>
              </div>
            </>
          )}
        </div>
      </div>
      <p className="body_xl_sb eventMinimize__name">{name}</p>
      <div className="eventMinimize__info">
        {date && (
          <div className="eventMinimize__date">
            <Icon colorIcon="soft-blue" icon="CALENDAR" />
            <p className="body_l_m text_ellipsis">
              {date ? moment.utc(date).format('D MMMM HH:mm') : ''}
            </p>
          </div>
        )}
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
        )}{' '}
        {isEmployeeView && (
          <div className="eventMinimize__participantsCount">
            <Icon icon="USER" colorIcon="soft-blue" />
            <p className="body_l_m">{participantsCount || 0}</p>
          </div>
        )}
        <div className="eventMinimize__departmentName">
          <Icon colorIcon="soft-blue" icon="GRADUATION_CAP" />
          <p className="body_l_m text_ellipsis">{departmentName}</p>
        </div>
        {isEmployeeView && (
          <div className="questMinimize__info">
            <Icon icon="USER" colorIcon="soft-blue" />
            <p className="body_m_m">{participantsCount ?? 0}</p>
          </div>
        )}
        {isInspectorView && (
          <div>
            <Button text="Взять в работу" onClick={inspectorHandler} />
          </div>
        )}
      </div>
    </ContainerBox>
  )
}
