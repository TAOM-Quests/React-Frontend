import { useEffect, useState } from 'react'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { FeedbackForm } from '../../models/feedbackForm'
import { UserProfile } from '../../models/userProfile'
import { EventStatistic } from './EventStatistic/EventStatistic'
import { useParams } from 'react-router'
import { events } from '../../services/api/eventModule/events/events'
import { EventAnalyticElementProps } from './eventAnalyticElementProps'
import { Loading } from '../../components/Loading/Loading'
import { Event } from '../../models/event'
import { feedback } from '../../services/api/commonModule/commonEntities/feedback/feedback'
import './EventAnalytic.scss'
import { EventParticipants } from './EventParticipants/EventParticipants'
import { EventFeedbackAnswers } from './EventFeedbackAnswers/EventFeedbackAnswers'

const TABS = ['Мероприятие', 'Участники', 'Обратная связь']

export const EventAnalytic = () => {
  const [activeTab, setActiveTab] = useState('Мероприятие')
  const [isLoading, setIsLoading] = useState(false)

  const [event, setEvent] = useState<Event | null>(null)
  const [participants, setParticipants] = useState<UserProfile[]>([])
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null)
  const [feedbackAnswers, setFeedbackAnswers] = useState<FeedbackAnswer[]>([])

  const { id: eventId } = useParams<{ id: string }>()

  const getAnalyticElementParams = (): EventAnalyticElementProps => ({
    participants,
    feedbackAnswers,
  })

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchEventData()
    } catch (e) {
      console.log(`[EventAnalytic] ${e}`)
    }
    setIsLoading(false)
  }, [])

  const fetchEventData = async () => {
    if (!eventId) throw new Error('Event id not found')

    setEvent(await events.getOne({ id: +eventId }))
    setFeedbackForm(
      await feedback.getForm({ entityName: 'events', entityId: +eventId }),
    )
    setFeedbackAnswers(
      await feedback.getAnswers({ entityName: 'events', entityId: +eventId }),
    )
    setParticipants(await events.getParticipants({ id: +eventId }))
  }

  return (
    <>
      {!isLoading ? (
        <div className="eventAnalytic">
          <div className="eventAnalytic__header">
            <h6 className="heading_6">{event?.name}</h6>
            <Switcher
              options={TABS}
              activeOption={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {activeTab === 'Мероприятие' && (
            <EventStatistic {...getAnalyticElementParams()} />
          )}
          {activeTab === 'Участники' && (
            <EventParticipants {...getAnalyticElementParams()} />
          )}
          {activeTab === 'Обратная связь' && (
            <EventFeedbackAnswers
              feedbackForm={feedbackForm ?? undefined}
              analyticData={getAnalyticElementParams()}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
