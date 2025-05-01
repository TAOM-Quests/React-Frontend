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
      <Icon icon="DEPARTMENT" colorIcon="subdued" size="Large" />
      <div className="event-offline-place">
        <h6 className="heading_6">Этаж {place.floor}</h6>
        <p className="heading_5 office_number">
          {place.office_number} Felbnjhbz
        </p>
      </div>
    </ContainerBox>
  )
}
