import { useEffect, useState } from 'react'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { FeedbackForm } from '../../models/feedbackForm'
import { UserProfile } from '../../models/userProfile'
import { current } from '@reduxjs/toolkit'
import { EventStatistic } from './EventStatistic/EventStatistic'
import { useParams } from 'react-router'
import { events } from '../../services/api/eventModule/events/events'
import { EventAnalyticElementProps } from './eventAnalyticElementProps'
import { Loading } from '../../components/Loading/Loading'

const TABS = ['Мероприятие', 'Участники', 'Обратная связь']

export const EventAnalytic = () => {
  const [activeTab, setActiveTab] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [participants, setParticipants] = useState<UserProfile[]>([])
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null)
  const [feedbackAnswers, setFeedbackAnswers] = useState<FeedbackAnswer[]>([])

  const { id: eventId } = useParams<{ id: string }>()

  const analyticElementParams: EventAnalyticElementProps = {
    participants,
    feedbackAnswers: [],
  }

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
    setParticipants(await events.getParticipants({ id: +eventId }))
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <Switcher
            options={TABS}
            activeOption={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === 'Мероприятие' && (
            <EventStatistic {...analyticElementParams} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
