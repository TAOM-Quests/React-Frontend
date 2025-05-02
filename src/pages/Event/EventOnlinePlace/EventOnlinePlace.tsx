import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { PlaceOnline } from '../../../models/event'
import './EventOnlinePlace.scss'
export interface EventOnlinePlaceProps {
  place: PlaceOnline
}

export const EventOnlinePlace = ({ place }: EventOnlinePlaceProps) => {
  return (
    <ContainerBox>
      <h5 className="heading_5 event-online-place__title">
        Для онлайн подключения
      </h5>
      <div className="event-online-place">
        <div className="event-online-place__platform">
          <span className="body_m_r">Площадка и ссылка для подключения</span>

          {place.connection_link ? (
            <a className="heading_5 platform_link" href={place.connection_link}>
              {place.platform}
            </a>
          ) : (
            <h5 className="heading_5 platform">{place.platform}</h5>
          )}
        </div>

        {place.identifier && (
          <div className="event-online-place__identifier">
            <span className="body_m_r">Идентификатор</span>
            <span className="body_m_b">{place.identifier}</span>
          </div>
        )}

        {place.access_code && (
          <div className="event-online-place__code">
            <span className="body_m_r">Код доступа</span>
            <span className="body_m_b">{place.access_code}</span>
          </div>
        )}
      </div>
    </ContainerBox>
  )
}
