import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../components/UI/Icon/Icon'
import { PlaceOffline } from '../../../models/event'
import './EventOfflinePlace.scss'
export interface EventOfflinePlaceProps {
  place: PlaceOffline
}

export const EventOfflinePlace = ({ place }: EventOfflinePlaceProps) => {
  return (
    <ContainerBox className="event-offline">
      <Icon icon="DEPARTMENT" colorIcon="subdued" size="large" />
      <div className="event-offline-place">
        <h6 className="heading_6">Этаж {place.floor}</h6>
        {place.office_number && (
          <p className="heading_5 office_number">{place.office_number}</p>
        )}
      </div>
    </ContainerBox>
  )
}
