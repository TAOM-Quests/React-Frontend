import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { PlaceOnline } from '../../../models/event'

export interface EventOnlinePlaceProps {
  place: PlaceOnline
}

export const EventOnlinePlace = ({ place }: EventOnlinePlaceProps) => {
  return (
    <ContainerBox>
      <h2>Для онлайн подключения</h2>
      <span>Площадка и ссылка для подключения</span>
      {place.connection_link ? (
        <a href={place.connection_link}>{place.platform}</a>
      ) : (
        <span>{place.platform}</span>
      )}
      {place.identifier && <span>Идентификатор: {place.identifier}</span>}
      {place.access_code && <span>Код доступа: {place.access_code}</span>}
    </ContainerBox>
  )
}
