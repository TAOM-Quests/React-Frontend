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
import './Event.scss'
import { FadeInWrapper } from '../../components/FadeInWrapper/FadeInWrapper'
import { Loading } from '../../components/Loading/Loading'
import moment from 'moment'
import { EventFeedback } from './EventFeedback/EventFeedback'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'

export const Event = () => {
  const [event, setEvent] = useState<EventInterface | null>(null)

  const user = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const { id: eventId } = useParams()

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
        console.log(`[Event] ${e}`)
      }
    }

    fetchEventData()
  }, [])

  return (
    <>
      {eventId && event ? (
        <div>
          <EventMainData eventId={+eventId} {...event} />
          <div className="event-details">
            <div className="event-details__left">
              {event.description ? (
                <FadeInWrapper>
                  <ContainerBox>
                    <div
                      className="event-details--description"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </ContainerBox>
                </FadeInWrapper>
              ) : null}

              {event.files.length ? (
                <FadeInWrapper>
                  <EventFiles files={event.files} />
                </FadeInWrapper>
              ) : null}
            </div>

            <div className="event-details__right">
              {placeOffline && (
                <FadeInWrapper>
                  <EventOfflinePlace place={placeOffline} />
                </FadeInWrapper>
              )}

              {event.schedule.length ? (
                <FadeInWrapper>
                  <EventSchedule schedule={event.schedule} />
                </FadeInWrapper>
              ) : null}

              {event.executors.length ? (
                <FadeInWrapper>
                  <EventExecutors executors={event.executors} />
                </FadeInWrapper>
              ) : null}

              {placeOnline && (
                <FadeInWrapper>
                  <EventOnlinePlace place={placeOnline} />
                </FadeInWrapper>
              )}
            </div>
          </div>
          {user?.id &&
            event.participants
              .map(participant => participant.id)
              .includes(user.id) &&
            moment() > moment(event.date).endOf('day') && (
              <div className="event-feedback">
                <FadeInWrapper>
                  <EventFeedback eventId={+eventId} />
                </FadeInWrapper>
              </div>
            )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
