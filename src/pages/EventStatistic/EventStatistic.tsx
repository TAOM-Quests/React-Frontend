import { useParams } from 'react-router'
import { events } from '../../services/api/eventModule/events/events'
import { useEffect, useState } from 'react'
import { UserProfile } from '../../models/userProfile'
import { Loading } from '../../components/Loading/Loading'
import { EventStatisticSexPie } from './statisticElements/EventStatisticSexPie'
import { EventStatisticElementProps } from './statisticElements/eventStatisticElementProps'
import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { FeedbackForm } from '../../models/feedbackForm'
import { EventStatisticParticipantCount } from './statisticElements/EventStatisticParticipantCount'

export const EventStatistic = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [participants, setParticipants] = useState<UserProfile[]>([])
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null)
  const [feedbackAnswers, setFeedbackAnswers] = useState<FeedbackAnswer[]>([])

  const { id: eventId } = useParams<{ id: string }>()

  const statisticElementParams: EventStatisticElementProps = {
    participants,
    feedbackAnswers: [],
  }

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchEventData()
    } catch (e) {
      console.log(`[EventStatistic] ${e}`)
    }
    setIsLoading(false)
  }, [])

  const fetchEventData = async () => {
    if (!eventId) throw new Error('Event id not found')
    setParticipants(await events.getParticipants({ id: +eventId }))
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <EventStatisticParticipantCount {...statisticElementParams} />
          <EventStatisticSexPie {...statisticElementParams} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
