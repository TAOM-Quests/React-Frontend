import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../components/UI/Icon/Icon'
import { PlaceOffline } from '../../../models/event'

export interface EventOfflinePlaceProps {
  place: PlaceOffline
}

export const EventOfflinePlace = ({ place }: EventOfflinePlaceProps) => {
  return (
    <ContainerBox>
      <Icon icon="DEPARTMENT" />
      <h2>Этаж {place.floor}</h2>
      <p>{place.office_number}</p>
    </ContainerBox>
  )
}
