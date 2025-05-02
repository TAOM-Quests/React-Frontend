import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { events } from '../../services/api/eventModule/events/events'
import {
  Event as EventInterface,
  PlaceOffline,
  PlaceOnline,
} from '../../models/event'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import { EventSchedule } from './EventSchedule/EventSchedule'
import { EventMainData } from './EventMainData/EventMainData'
import { EventOfflinePlace } from './EventOfflinePlace/EventOfflinePlace'
import { EventExecutors } from './EventExecutors/EventExecutors'
import { EventFiles } from './EventFiles/EventFiles'
import { EventOnlinePlace } from './EventOnlinePlace/EventOnlinePlace'
import { Loading } from '../../components/Loading/Loading'

export const Event = () => {
  const [event, setEvent] = useState<EventInterface | null>(null)

  const eventId = useParams().id
  const navigate = useNavigate()

  const placeOnline: PlaceOnline = event?.places?.find(
    place => place.is_online,
  ) as PlaceOnline
  const placeOffline: PlaceOffline = event?.places?.find(
    place => !place.is_online,
  ) as PlaceOffline

  useEffect(() => {
    if (!eventId) {
      navigate('/')
    }

    const fetchEventData = async () => {
      try {
        const fetchedEvent = await events.getOne({ id: +eventId! })
        setEvent(fetchedEvent)
      } catch (e) {
        console.log(e)
      }
    }

    fetchEventData()
  }, [])

  return (
    <>
      {event ? (
        <div>
          <EventMainData eventId={+eventId!} {...event} />
          <div>
            {event.description && (
              <ContainerBox>{event.description}</ContainerBox>
            )}
            {event.files && <EventFiles files={event.files} />}
          </div>
          <div>
            {placeOffline && <EventOfflinePlace place={placeOffline} />}
            {event.schedule.length && (
              <EventSchedule schedule={event.schedule} />
            )}
            {event.executors.length && (
              <EventExecutors executors={event.executors} />
            )}
            {placeOnline && <EventOnlinePlace place={placeOnline} />}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
